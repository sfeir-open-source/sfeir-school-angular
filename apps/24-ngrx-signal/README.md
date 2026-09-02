# 24 — @ngrx/signals `signalStore`

Right now `StaffDirectory` is a small monolith: it injects `People` and `MatDialog` itself, wires up three RxJS flows (`_getPersonsFlow`, `_deletePersonFlow`, `_upsertPersonFlow`) merged into one `toSignal(...)`, tracks its own `_isLoading` signal, and exposes `handleDelete`/`handleChangeView`/`handleOpenAddDialog` methods that push into `Subject`s. It works, but every bit of that state and behavior lives and dies with this one component — nothing about "the list of people" or "is it loading" can be reused, tested in isolation, or shared with a sibling route without dragging the whole component along.

In this exercise you extract all of that into a **`signalStore`** from `@ngrx/signals` — a reactive, signal-based state container built the same way you already build components: composed from small pieces (`withState`, `withComputed`, `withMethods`, `withHooks`) rather than one big class. Once it's built, `StaffDirectory` becomes a thin shell that just injects the store and reads/calls it from the template — no local signals, no `Subject`s, no RxJS flows of its own.

## 🎯 Learning objectives

- Declaring a store's shape with `signalStore(...)` and `withState(...)` — a typed initial state object, exposed as individual read-only signals (`store.people()`, `store.isLoading()`, …) automatically, without writing any signal declarations by hand
- Deriving state with `withComputed(...)` — reading the store's own signals (destructured from the factory argument) to build a `computed()` that lives on the store itself, the store-level equivalent of a component's `computed()`
- Injecting dependencies inside the store with `withProps(() => ({ ... }))` and `inject(...)` — the store is itself an injectable, so it gets its own `People`/`MatDialog` instances instead of borrowing the component's
- Writing store methods with `withMethods(...)`, and reading/updating state exclusively through `patchState(store, { ... })` — the store's state is never mutated directly, only ever patched
- Modeling asynchronous, cancellable command flows as `rxMethod<T>(pipe(...))` from `@ngrx/signals/rxjs-interop` — the store-level replacement for a component's `Subject` + `tap`/`switchMap`/`exhaustMap` combo, with the same RxJS operators you already know
- Running store initialization automatically with `withHooks({ onInit: store => { ... } })` — the store-level equivalent of doing setup work in a component's constructor, except it runs exactly once when the store is created, regardless of who injects it
- Scoping a store's lifetime to a route (not the whole app) by adding it to a route config's `providers: [...]` array — the store is created fresh when the route is entered and destroyed when it's left, exactly like a component-scoped provider
- Turning a "smart" component into a thin, template-only consumer of a store with a single `protected readonly _store = inject(...)` — the same "container vs. presentational" instinct you've used before, now applied to a store instead of a parent component

## 📁 What you're working with

```
src/app/feature/staff-directory/
├── staff-directory-store.ts          ← DOES NOT EXIST YET, you create it
├── staff-directory.ts                 ← TO REWORK: currently holds all the state/RxJS logic to move into the store
├── staff-directory.html               ← TO REWORK: currently calls component methods/signals directly
├── staff-directory-routes.ts          ← TO REWORK: needs to provide your new store
├── dialog-person/                     ← complete, nothing to do (the "add person" form dialog)
├── person-details/                    ← complete, nothing to do
└── resolvers/index.ts                 ← complete, nothing to do
```

`src/app/core/provider/people.ts` (the `People` service with `getPeople`/`removePerson`/`addPerson`/`getPerson`/`updatePerson`) and `src/app/core/guards/authenticated.ts` are already complete — you're not touching HTTP calls or guards in this exercise, only where the resulting state lives.

`@ngrx/signals` is already installed at the workspace root (see `package.json`), so no install step is needed — just import from it.

## 📝 Your tasks

### 1. Create `staff-directory-store.ts`

This is a new file. It exports a store built with `signalStore(...)`, composed of:

- **State** (`withState(...)`): an initial state object shaped roughly like `{ people: Person[]; search: string; isLoading: boolean; view: UiView }` — this is the same data `StaffDirectory` currently tracks across `_people`, `_isLoading` and `view`, plus a new `search` string for a future filter. Give it sensible defaults (empty list, not loading, `'card'` view, empty search).
- **Dependencies** (`withProps(() => ({ ... }))`): `inject()` the `People` service and `MatDialog` here, the same two things `StaffDirectory` currently injects itself. The store owns them now, not the component.
- **Derived state** (`withComputed(({ people, search }) => ({ ... }))`): a `filteredPeople` computed signal that filters `people()` by whether a person's first or last name includes the current `search()` value (case-insensitively). Destructure the state signals you need directly from the factory argument.
- **Methods** (`withMethods(({ ... }) => ({ ... }))`), each replacing one of `StaffDirectory`'s current responsibilities:
  - `getPeople` — an `rxMethod<void>` that sets `isLoading: true`, calls `People.getPeople()`, and on response `patchState`s `people` and sets `isLoading: false`. This replaces `_getPersonsFlow`.
  - `deletePerson` — an `rxMethod<string>` (the person's id) that sets `isLoading: true`, calls `People.removePerson(id)`, and patches `people` from the response, same loading toggling. This replaces `_deletePersonFlow`.
  - `addPerson` — an `rxMethod<void>` that opens the `DialogPerson` dialog via `MatDialog`, waits for it to close with a truthy result, calls `People.addPerson(...)` with it, then re-fetches the list and patches `people`. This replaces `_upsertPersonFlow` — note the dialog opening moves into the store too, since `MatDialog` is now injected there.
  - `changeView` — a plain (non-`rxMethod`) function that toggles `view` between `'card'` and `'list'` via `patchState`. This replaces `handleChangeView`.

  All state changes must go through `patchState(store, ...)` (or `patchState(store, state => ({ ... }))` for updates that depend on the current value) — never write to the state signals directly.

- **Startup behavior** (`withHooks({ onInit: store => { ... } })`): call the store's own `getPeople` once when the store is created, so the list loads automatically without any component having to trigger it — this is what currently happens implicitly via `_getPersonsFlow` being part of the merged signal at construction time.

Think about which RxJS operator (`switchMap`, `mergeMap`, `exhaustMap`, `tap`, `filter`, …) matches each method's cancellation semantics — the mapping from `StaffDirectory`'s current flows to store methods is closer to a direct translation than a redesign.

### 2. Reduce `staff-directory.ts` to a thin consumer

Once the store exists, `StaffDirectory` no longer needs `People`, `MatDialog`, any `Subject`, any RxJS operator import, or any of its current signals/methods. All it should do is `inject()` the store and expose it (e.g. `protected readonly _store = inject(StaffDirectoryStore)`) so the template can read from it directly.

### 3. Update `staff-directory.html` to read from the store

Replace every reference to the component's old signals/methods with the equivalent store member: the loading flag, the people list (now `filteredPeople`, not the raw list), the current view, and the delete/add/change-view actions all now live on the store instead of on `this`.

### 4. Provide the store on the route, not the component

In `staff-directory-routes.ts`, add your store to the parent route's `providers: [...]` array (alongside where `canActivateChild` is already set), rather than providing it in the `StaffDirectory` component itself. This scopes the store's lifetime to that route subtree — created when a user navigates into it, destroyed when they navigate away — the same lifecycle behavior a component-level provider would give you, but shared across every component under that route instead of tied to one.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 24-ngrx-signal
```

This also starts the `server-rest` mock API the app depends on (`environments/environment.ts` points to `http://localhost:9000/api`) — leave it running, no need to start it separately. `24-ngrx-signal` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

```bash
nx build 24-ngrx-signal   # production build
```

## ✅ How to know it's working

- The app behaves exactly like before: sign in, the Staff Directory loads its people list automatically (no button needed to trigger the first load), switching between card/list view works, deleting a person removes them and shows the loader briefly, and adding a person through the dialog refreshes the list.
- `staff-directory.ts` has shrunk to essentially one line of logic (the store injection) — if it still imports `People`, `MatDialog`, or any RxJS operator, something hasn't fully moved into the store yet.
- Navigating away from `/people` and back triggers a fresh `getPeople()` call (visible as a new network request), confirming the store is scoped to the route and re-created on each entry rather than living for the whole app session.
- No compiler errors about reading/writing state directly — every state change goes through `patchState`.

## 🛠️ Troubleshooting

- **`NG0203: inject() must be called from an injection context`** inside the store — `withProps`/`withMethods`/`withComputed` factory functions run in an injection context automatically, but only at the top level of the factory; don't call `inject()` inside a nested callback or after an `await`.
- **The list never loads on first render** — check that `withHooks({ onInit: ... })` actually calls your `getPeople` method; without it nothing triggers the initial fetch anymore now that it's not baked into a `toSignal(...)` construction.
- **State never updates even though the HTTP call succeeds** — every mutation must go through `patchState(store, ...)`; assigning directly to a state property (`store.people = ...`) doesn't compile and wouldn't work even if it did, since the state signals are read-only from outside the store's own methods.
- **`filteredPeople` throws or shows nothing** — make sure you're calling the destructured signals as functions (`people()`, `search()`) inside the `computed()`, not referencing them as values.
- **Deleting/adding a person works but the loader never turns off** — check that `isLoading: false` is patched in a `finalize`/`tap` on the *inner* observable (the HTTP call), not only on success, so it also resets on error.
- **Store state resets unexpectedly when navigating between the list and a person's details** — this means the store ended up provided somewhere with a shorter lifetime than intended (e.g. on the `StaffDirectory` component itself instead of the parent route), so it gets destroyed and recreated when the child route changes.
- **"NullInjectorError: No provider for StaffDirectoryStore"** — the store must be added to `providers: [...]` on the route (or a parent of it) that renders `StaffDirectory`; a store isn't `providedIn: 'root'` by default just because it's built with `signalStore(...)`.

## 🙈 Stuck?

Try mapping each of `StaffDirectory`'s three existing RxJS flows onto a store method on your own first — the exercise is really about recognizing that a `signalStore` method built with `rxMethod` is doing the same job as the `Subject` + operator pipeline you already wrote, just relocated. If you want a reference, `apps/24-ngrx-signal-solution` has a working implementation. Use it to check your approach once your own version works, not as a shortcut to copy from.
