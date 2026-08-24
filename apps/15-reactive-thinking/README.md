# 15 — Reactive Thinking

The Staff Directory app can already list people, add one through a dialog, and delete one — all driven by signals and a merged RxJS stream in `StaffDirectory`. What's still missing is a dedicated **detail page**: click on a person, land on `/people/:id`, see their info pre-filled in the same `SignalForm` you built in `14-signal-form`, edit it, and save.

This exercise is less about learning one new API and more about **wiring reactive primitives together**: a route parameter that becomes a signal input, an HTTP call that becomes a `resource`, and a form that must reset itself whenever the resource it's fed by produces a new value. You'll switch `Card`'s navigation links from plain `href`s to real Angular routing, extend the `People` service with the two CRUD operations it's missing, wire up the new route, and build the `PersonDetails` feature from scratch — reusing `SignalForm`, which you'll extend with a `person` input so it can pre-populate for edit as well as create.

## 🎯 Learning objectives

- Turning a route parameter into a component input with `withComponentInputBinding()` (`provideRouter`) and a required signal `input()`, instead of reading `ActivatedRoute` snapshots/params manually
- Fetching data that depends on a signal with `rxResource()` from `@angular/core/rxjs-interop` — a `params` signal plus a `stream` factory, instead of subscribing/unsubscribing by hand
- Reading a resource's lifecycle in a template: `isLoading()`, `hasValue()`, `value()`, and branching UI with `@if`/`@else` while the resource settles
- Deriving **writable, resettable** state from an input with `linkedSignal()` — the difference between a `computed()` (always in sync, read-only) and a `linkedSignal()` (starts in sync with its source, but can then be locally overwritten, and resets whenever the source changes)
- Replacing plain `href` navigation with the `RouterLink` directive so in-app links go through Angular's client-side router instead of triggering a full-page reload — and why that matters for perceived performance and the browser's back/forward cache (bfcache)
- Extending a signal input's contract (`SignalForm`) with `input()` and `output()`, and consuming signals inside a template (calling them as functions)
- Completing a data service's CRUD surface (`getPerson`, `updatePerson`) alongside the `getPeople`/`addPerson`/`removePerson` methods already in place, and choosing `Observable` vs. `httpResource`/`rxResource` depending on where the call is triggered from
- Composing `RouterLink` navigation and imperative `Location.back()` navigation in the same feature (go to a person from a card, come back after cancelling or saving)

## 📁 What you're working with

The `home` and `staff-directory` features are already complete and functional — nothing to change in those two feature folders.

```
apps/15-reactive-thinking/src/app/
├── app.route.ts                          ← missing the /people/:id route
├── app.config.ts                         ← missing withComponentInputBinding()
├── core/provider/people.ts               ← missing getPerson() and updatePerson()
├── feature/home/                         ← complete, nothing to do
├── feature/staff-directory/              ← complete, nothing to do (including dialog-person/)
└── feature/person-details/               ← DOES NOT EXIST YET, you create it

apps/15-reactive-thinking/static/         ← hint files, read-only reference
├── person-details.html                   ← markup skeleton with TODOs, not wired to a component
└── person-details.scss                   ← ready-to-use styling for the feature you create

libs/ui/card/                              ← the component you built in 05-input-output (and refined in 06-pipe/08-directive)
├── card.ts        ← imports routerLink from @angular/router
├── card.html       ← a few `href` attributes need to become RouterLink bindings
├── card.scss       ← complete, nothing to do
└── index.ts        ← complete, nothing to do

libs/ui/signal-form/                       ← the component you built in 14-signal-form
├── signal-form.ts                        ← extend it with a `person` input
├── signal-form.html                      ← extend it to show a pre-filled photo when editing
├── person-form.ts                        ← unchanged, still one call to form()
└── signal-form.scss / index.ts            ← complete, nothing to do
```

`libs/ui/card` and `libs/ui/signal-form` are the exact same library folders you already worked in during earlier exercises (`05-input-output`/`06-pipe`/`08-directive` for `Card`, `14-signal-form` for `SignalForm`) — bring that work forward (or start from the matching `libs/ui-solution/*` folder as a reference) before making the small additions below. This exercise's task list only covers the delta needed for reactive navigation and edit mode; it assumes both components already work as they did at the end of those exercises.

`libs/ui/loader` (`<sfeir-loader>`) and `libs/ui/king` (`sfeirKing`) and `libs/ui/na` (the `na` pipe) are already complete and used as-is — you don't need to touch them, just import and use them.

## 📝 Your tasks

### 1. Switch `Card`'s navigation links to `RouterLink`

`Card` already has its `person` input, its `delete` output, and its full Material markup from `05-input-output` (and the `DatePipe`/`na` pipe/`sfeirKing` additions from `06-pipe`/`08-directive`) — nothing about its data or events changes here. What's still missing is real navigation: back when you built these links, `/people/:id` wasn't a route yet, so the name, the manager, "Locate" and "Edit" were wired up as plain `href="/people/{{ ... }}"` anchors. Now that `/people/:id` is about to become a real route (task 3), those need to become Angular-aware links:

- Replace each of those `href` attributes with an `[routerLink]` binding (the `RouterLink` directive from `@angular/router`) pointing at `['/people', person().id]` (or `person().managerId` for the manager link).
- Leave the `mailto:`, `tel:` and external SFEIR-website links exactly as plain `href`s — those aren't in-app routes, so `RouterLink` doesn't apply to them.
- Add `RouterLink` to `Card`'s `imports` array.

This is the concrete payoff of switching: a plain `<a href="/people/...">` forces the browser to throw away the current document and do a full network round-trip for a page the SPA already knows how to render client-side. `[routerLink]` lets Angular's `Router` intercept the click and swap views in place — no reload, no re-bootstrapping the app, and the current page stays eligible for the browser's back/forward cache (bfcache) instead of that history entry being invalidated by a fresh full navigation.

### 2. Extend `apps/15-reactive-thinking/src/app/core/provider/people.ts`

`People` already exposes `getPeople()`, `getRandomPerson()`, `removePerson()` and `addPerson()`. Add the two remaining CRUD methods the detail page needs:

- `getPerson(id: string)`: an `Observable<Person>` doing a `GET` to `${People.baseUrl}/people/${id}`.
- `updatePerson(id: string, body: UpsertPersonBody)`: an `Observable<void>` doing a `PUT` to the same URL, sending `body`.

Follow the exact same style as the existing methods (`inject(HttpClient)`, `People.baseUrl`).

### 3. Build `apps/15-reactive-thinking/src/app/feature/person-details/person-details.ts`

This component doesn't exist yet — use `static/person-details.html` as a structural hint for the template (it's not wired to anything, treat it as a sketch, not a drop-in file). It needs:

- A required signal input named `id`, typed `string` — this is what `withComponentInputBinding()` will populate from the `:id` route segment, so the property name must match the route parameter name exactly.
- A resource built with `rxResource()` (from `@angular/core/rxjs-interop`): its `params` should be your `id` input signal, and its `stream` a function that takes `{ params }` and calls `People.getPerson(params)`.
- A `goBack()` method using Angular's `Location` service (`inject(Location)` from `@angular/common`) to navigate back to wherever the user came from.
- A `savePerson(update: UpsertPersonBody)` method that calls `People.updatePerson(id, update)` and, once it completes, navigates back the same way.
- Selector `sfeir-person-details`, and `imports: [SignalForm, Loader]` (both from `@sfeir/ui/...`).

### 4. Wire the new route

- In `app.route.ts`, import your (soon to exist) `PersonDetails` component and add a route `people/:id` pointing at it, alongside the existing `home` and `people` routes.
- In `app.config.ts`, pass `withComponentInputBinding()` as a second argument to `provideRouter(...)` (import it from `@angular/router`). Without it, a route parameter is never turned into a component input automatically — you'd be back to reading `ActivatedRoute` by hand.

### 5. Build `person-details.html` and `person-details.scss`

- Copy `static/person-details.scss` as-is (it's already correct, no changes needed) into your feature's own stylesheet.
- Adapt `static/person-details.html`'s structure: while the resource has no value yet or is still loading, show `<sfeir-loader />`; once it has a value and isn't loading, show `<sfeir-signal-form>` instead, binding its `person` input to the resource's current value and its `(cancelForm)` / `(submitForm)` outputs to your `goBack()` / `savePerson($event)` methods.
- Check the resource's state through its own signals (`isLoading()`, `hasValue()`, `value()`) inside an `@if`/`@else` block — don't render the form before there's a value to show.

### 6. Extend `libs/ui/signal-form/signal-form.ts` and `.html` with a `person` input

`SignalForm` currently only knows how to create a brand-new, empty person (from your 14-signal-form work). `PersonDetails` needs the same component to also pre-fill for an existing one:

- Add an optional signal input named `person`, typed `Person | undefined` (`@sfeir/types`).
- Replace whatever `signal(...)` you used in 14 to hold the form's model with a **`linkedSignal()`** whose computation reads `person()` and falls back to the same empty/default values you used before (empty strings, the placeholder photo URL) when `person()` is `undefined`. This is the key reactive-thinking point of the exercise: a `computed()` can't be edited by the user's keystrokes, and a plain `signal()` wouldn't reset itself if a different `person` value ever came in — `linkedSignal()` gives you both: writable by the form, but re-derived whenever its source changes.
- In `signal-form.html`, make sure the photo `<img>` reflects whichever value is currently in the model signal (create or edit) — nothing else in the template should need to change if your model signal already flows into the same `FieldTree`.

`dialog-person.html` (used for the "add" flow) simply won't pass a `person` value, which is exactly why the input needs to be optional.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 15-reactive-thinking
```

This also starts the `server-rest` mock API the app depends on (`apps/15-reactive-thinking/src/environments/environment.ts` points to `http://localhost:9000/api`) — let it run, don't stop it separately. The app itself serves on the Angular CLI dev server default port. `15-reactive-thinking` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

Other useful targets for this project:

```bash
nx build 15-reactive-thinking   # production build
nx lint 15-reactive-thinking    # lint
nx test 15-reactive-thinking    # test
```

The `libs/ui` library (which hosts `card` and `signal-form`) has its own inferred `test`/`lint` targets too:

```bash
nx test ui   # run the library's unit tests
nx lint ui   # lint the library
```

## ✅ How to know it's working

- On `/home` and `/people`, cards render exactly as before (photo, name, contact links, birth date, manager) — the only visible change is what happens when you click the name, manager, "Locate" or "Edit" links.
- Clicking one of those links no longer triggers a full page reload (watch the browser tab's loading indicator, or the Network tab in devtools — you shouldn't see a fresh document request) and takes you to `/people/:id`.
- Landing on `/people/:id` shows a loader first, then a `SignalForm` pre-filled with that exact person's data (not empty fields).
- Editing a field and clicking "Save" persists the change and navigates you back to where you came from.
- Clicking "Cancel" on the detail page navigates back without saving anything.
- Opening the "add person" dialog from `/people` still shows an **empty** form — your `person` input change shouldn't have broken the create flow.
- Refreshing directly on a `/people/:id` URL (not just navigating via a link) still loads that person correctly — this is what proves `withComponentInputBinding()` and the `rxResource` are wired correctly end to end, not just working by coincidence off a previous navigation.

## 🛠️ Troubleshooting

- **`id` on `PersonDetails` is always `undefined`** — check the input's property name matches the route's `:id` segment exactly, and that `withComponentInputBinding()` is actually passed to `provideRouter(...)` in `app.config.ts` (a missing call here silently no-ops instead of erroring).
- **Detail page loader never resolves, or shows the wrong person after navigating between two people's pages** — make sure the resource's `params` is the `id` signal itself (not `id()`, the current value) — `rxResource` needs the signal so it can react every time it changes, including when you navigate from one person's URL straight to another's.
- **Form doesn't reset when navigating from one person's detail page to another's** — this means the model is still a plain `signal()`, not a `linkedSignal()`; a plain signal you initialized once won't recompute when the `person` input signal later changes.
- **"Add person" dialog now shows a pre-filled/broken form** — the `person` input on `SignalForm` must be optional and default to `undefined`; `dialog-person.html` never sets it, so your `linkedSignal()`'s fallback branch must produce the same empty state you had in 14.
- **Save on the detail page does nothing / doesn't navigate back** — check you're calling `Location`'s `back()` (not `Router.navigate`) inside the `updatePerson(...).subscribe(...)` callback, after the HTTP call actually completes, not before.
- **Clicking a card navigates to the wrong URL or a blank page** — double-check the route path is `people/:id` (matching `app.route.ts`) and your `[routerLink]` array uses the person's `id` (or `managerId` for the manager link), not another field.
- **Clicking a card link still triggers a full page reload** — you likely left (or re-added) a plain `href` alongside `[routerLink]`, or forgot to add `RouterLink` to `Card`'s `imports` array (Angular then silently renders it as a dead attribute, not an error).
- **`rxResource` / `httpResource` import errors** — `rxResource` comes from `@angular/core/rxjs-interop`, not `@angular/core` or `@angular/common/http` (that's where `httpResource`, used elsewhere in `People`, lives instead).
- **Default avatar image doesn't load** — the placeholder photo comes from an external service (`randomuser.me`); if you're offline the broken image icon is expected and unrelated to your code.
- **Import errors from `@sfeir/ui/card` or `@sfeir/ui/signal-form`** — always import through the path alias (per the workspace's TypeScript path mapping), never with a relative path into `libs/`.

## 🙈 Stuck?

Try to get the full flow working end to end — card, service, route binding, resource, `linkedSignal` — on your own first. Reactive thinking is a mental model as much as an API, so expect to go back and forth between the [Angular docs](https://angular.dev) on `linkedSignal`/`resource` and your own code. If you're really stuck, `apps/15-reactive-thinking-solution` (backed by `libs/ui-solution/card` and `libs/ui-solution/signal-form`) has a working reference implementation. Use it to compare your approach once you have something working, not as a shortcut to copy from.
