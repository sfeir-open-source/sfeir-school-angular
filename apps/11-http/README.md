# 11 — HTTP

Since `10-control-flow`, `People` has been a thin wrapper around a hardcoded `PEOPLE_MOCK` array — every method resolved synchronously, instantly, with no network involved. That illusion ends here: a real REST API now exists at `http://localhost:9000/api` (see `environment.api` in `src/environments/`), serving the exact same shape of data over HTTP. In this exercise you'll rewire `People` to talk to that API through Angular's `HttpClient`, and adapt `Home` and `StaffDirectory` to a world where data doesn't just "appear" — it has to be fetched, can be slow, and needs a loading state while it's in flight.

## 🎯 Learning objectives

- Injecting `HttpClient` into a provider and using it to issue real HTTP requests — `get()`, `delete()` — each returning an `Observable`, not the value itself
- Understanding **why** HTTP calls are asynchronous by nature (network round-trip) and how that ripples through everything downstream: a component can no longer just read a service method's return value synchronously into a signal
- Using **`httpResource()`** (from `@angular/common/http`) as the built-in, reactive way to bind a component directly to a `GET` endpoint — it manages the request lifecycle for you (loading, value, error, reload) without any manual subscription
- Reading a resource's `isLoading()` and `hasValue()` signals in a template to render a loading state instead of guessing whether data is ready
- Calling `reload()` on an `HttpResourceRef` to re-trigger its request — the resource-based replacement for "call the service again and re-assign a signal"
- Composing multiple async operations that all affect the _same_ list (an initial fetch, plus a delete that should refresh what's displayed) using RxJS — `Subject`/`BehaviorSubject` as triggers, `switchMap` to turn a trigger into an HTTP call, `merge` to combine several flows into one
- Bridging an RxJS `Observable` back into the signal world with **`toSignal()`** (from `@angular/core/rxjs-interop`) so templates keep reading a plain signal, unaware of the RxJS machinery behind it

## 📁 What you're working with

This exercise assumes `libs/ui/card`, `libs/ui/king` and `libs/ui/loader` are already in the state you left/found them — `Card` and `King` are untouched here, and `Loader` (a small standalone component living at `@sfeir/ui/loader`, selector `sfeir-loader`) is **already built for you**; your job is to use it, not build it.

```
apps/11-http/
└── src/app/
    ├── app.config.ts  ✅ complete - httpClient is now registered by default in the root environment provider. No need to register it manually if we keep the default options
    ├── app.route.ts     ✅ complete — 'home' and 'people' routes already wired, nothing to do here
    ├── app.ts / app.html / app.scss  ✅ complete — nothing to do here
    ├── core/provider/
    │   └── people.ts    🚧 to do — currently reads straight from PEOPLE_MOCK, needs to call the API
    └── feature/
        ├── home/
        │   ├── home.ts    🚧 to do — currently signal + synchronous getFirstPerson()/getRandomPerson()
        │   └── home.html  🚧 to do — currently renders the card unconditionally, no loading state
        └── staff-directory/
            ├── staff-directory.ts    🚧 to do — currently a plain signal seeded with a synchronous array
            └── staff-directory.html  🚧 to do — needs a loading state for both views
```

The environment files (`src/environments/environment.ts` and `environment.development.ts`) already define `environment.api` pointing at the REST API's base URL — you don't need to add or change anything there, just read it from `people.ts`.

## 📝 Your tasks

Since Angular v21, `HttpClient` is provided at the root injector by default — there's nothing to add to `app.config.ts`. You can `inject(HttpClient)` directly in any provider or component without registering `provideHttpClient()` yourself, as long as you're happy with the default configuration (no interceptors, no fetch backend, etc.).

### 1. `core/provider/people.ts` — talk to the API instead of the mock array

- Import `HttpClient` and `httpResource` from `@angular/common/http`, and `inject` from `@angular/core`. Inject `HttpClient` into a `private readonly` field, the same convention already used elsewhere in this workspace.
- Add a `static readonly` field on the class holding the API's base URL, built from `environment.api` (imported from `../../../environments/environment`) — every method below builds its request URL off this one place instead of repeating the string.
- Rework **`getPeople()`** to issue a `GET` request for the full list and return what `HttpClient.get()` gives you directly — no need to `.subscribe()` inside the service, that's the caller's job.
- Rework **`getRandomPerson()`** to use `httpResource()` instead of a plain method call: it takes a function returning the URL to `GET`, and gives back an `HttpResourceRef` that `Home` will consume directly (see task 3). This method no longer needs to be async by hand — the resource manages that.
- Rework **`removePerson(id)`** to issue a `DELETE` request to the person's URL and return whatever the API responds with (the same shape `getPeople()` returns).
- `getFirstPerson()` is no longer needed once `Home` initializes itself straight from `getRandomPerson()` (task 3) — you can remove it.

### 2. `feature/home/home.ts` and `home.html` — consume the resource directly

- Drop the `person` signal and the `getFirstPerson()` call — instead, hold the `HttpResourceRef` returned by `this._peopleService.getRandomPerson()` directly as a field.
- `handleRefresh()` no longer sets a signal — call the resource's own reload method instead.
- Import `Loader` (`@sfeir/ui/loader`) into `Home`'s `imports` array alongside `Card` and `MatButtonModule`.
- In the template, branch on the resource's loading/value signals: while it's loading (or has no value yet), render `<sfeir-loader />`; once a value is available, render `<sfeir-card>` exactly as before, reading the person from the resource's value rather than a plain signal.

### 3. `feature/staff-directory/staff-directory.ts` and `staff-directory.html` — a list that loads and refreshes

The list can no longer be seeded once from a synchronous array — it needs to reflect: an initial fetch on load, and an updated list after every delete, while showing a loading state whenever there's nothing to show yet.

- Think in terms of two "triggers": one for "(re)fetch the whole list" and one for "delete this id", each turned into an HTTP call via a `switchMap`-style flow, then combined into a single stream that always reflects the latest list.
- Bridge that combined stream back into a plain signal with `toSignal()` (from `@angular/core/rxjs-interop`) so the template's `@for` and `@switch` don't need to change how they read `_people()`.
- `handleDelete(id)` should push into the "delete" trigger instead of calling the service and setting a signal directly.
- `view` stays exactly what it already is — a plain signal toggled between `'card'` and `'list'`, untouched by this exercise.
- Import `Loader` into the component's `imports` array.
- In the template, add an `@empty` block to **both** `@for` loops (card grid and Material list) rendering `<sfeir-loader />` — it covers both "still loading" and "genuinely empty" the same way, which is an acceptable simplification here.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly:

```bash
npx nx serve 11-http   # dev server → http://localhost:4200
npx nx test 11-http    # run the app's unit tests with vitest
npx nx lint 11-http    # lint the app with eslint
npx nx build 11-http   # production build
```

## ✅ How to know it's working

Serve the app (with the backend running) and open it in the browser:

- Visiting `/home` briefly shows the loader, then a profile card for a random person — refreshing repeatedly shows the loader flash again on every click before a new person appears.
- Visiting `/people` briefly shows the loader, then the full list of people fetched from the API (same data you'd get from the mock, just served over HTTP now).
- Deleting a person removes them from the list without a full page reload, and the loader reappears briefly while the updated list is being fetched.
- Switching between card and list view still works exactly as before — that part of the UI doesn't depend on how the data arrived.
- Open the Network tab: you should see real `GET`/`DELETE` requests to `localhost:9000/api/...` instead of no network activity at all.
- No console errors about connecting to `localhost:9000` failing.

## 🛠️ Troubleshooting

- **Every request fails in the Network tab with a connection error / `ERR_CONNECTION_REFUSED`**: the backend on port `9000` isn't running — either wire the `dependsOn` in `project.json` as described above, or start the API in a separate terminal before serving the app.
- **The card/list never leaves the loading state**: double check you're actually reading the resource's/signal's _current_ value in the template (calling it as a function) rather than holding a reference to the resource object itself in an `@if`.
- **Deleting a person makes it reappear on the next fetch, or the list never shrinks**: the delete trigger and the "refresh the list" flow need to feed into the _same_ combined stream that `_people` is derived from — if delete only calls the service without also driving what `toSignal()` observes, the template won't see the update.
- **`httpResource` never fires a request / stays `isLoading()` forever**: the function passed to `httpResource()` must actually return a URL string — a syntax mistake there (e.g. forgetting the arrow function) silently breaks the resource.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 11-http` explicitly.

## 🙈 Stuck?

Try rewriting `People` and adapting `Home`/`StaffDirectory` to the async world yourself first — that's the whole point of the exercise. If you're genuinely stuck, `apps/11-http-solution` is a complete, working version — including `people.spec.ts`, `home.spec.ts`, `staff-directory.spec.ts` and `app.spec.ts`, which document the exact expected behavior of every piece. Use it to check your approach once you've made a real attempt, not as a starting point to copy from.
