# 18 — Resolver

The Staff Directory's detail screen (`/people/:id`) currently fetches its own data: `PersonDetails` reads the `id` route param, kicks off an `rxResource`, and the template has to branch between a `sfeir-loader` spinner and the real form while that request is in flight. It works, but the route "activates" before the data exists — for a split second the router has already navigated to `/people/:id` with nothing to show yet. In this exercise you move that fetch **out of the component and into the router itself**, using a **resolver**: a function the router calls *before* it finishes activating the route, so `PersonDetails` only ever renders once its person is already in hand.

You won't touch guards, the login flow, or the list view — `authenticatedGuard` on `staff-directory-routes.ts`, `UserService`, `People`, `StaffDirectory` and `DialogPerson` are already fully wired from the previous exercises. `appConfig` already calls `provideRouter(APP_ROUTES, withComponentInputBinding())`, so the router→component input wiring you'll rely on is already turned on; you don't need to add that yourself. What's missing is the resolver that produces the data, the route configuration that requests it, and the small rewrite of `PersonDetails` that consumes it instead of fetching it.

## 🎯 Learning objectives

- Writing a **functional resolver** with `ResolveFn<T>` (Angular's modern replacement for the class-based `Resolve<T>` interface), using `inject()` inside it the same way you did inside a functional guard
- Reading route parameters from an `ActivatedRouteSnapshot` (`route.paramMap.get(...)`) instead of from an injected `ActivatedRoute` observable inside the component
- Registering a resolver on a route's `resolve` property, and understanding that the router **waits** for the resolver's Observable to complete before activating the route (unlike a guard, which only says yes/no)
- Consuming resolved data through **router input binding** (`withComponentInputBinding()`): the key you give the resolver in `resolve: { person: ... }` is auto-bound to a same-named `input()` on the component, no `ActivatedRoute` subscription required
- Recognizing the resolver-vs-guard distinction: a guard decides *whether* navigation continues, a resolver decides *what data* the component starts with — and why moving the fetch out of the component removes the need for a loading branch in the template

## 📁 What you're working with

```
src/app/
├── app.config.ts                                          ← complete, nothing to do (withComponentInputBinding() already enabled)
├── core/
│   ├── guards/authenticated.ts                             ← complete, nothing to do
│   └── provider/
│       ├── people.ts                                       ← complete, nothing to do (getPerson(id) already exists)
│       ├── user-service.ts                                 ← complete, nothing to do
│       └── window.ts                                       ← complete, nothing to do
├── feature/
│   ├── login/                                               ← complete, nothing to do
│   ├── home/                                                ← complete, nothing to do
│   └── staff-directory/
│       ├── staff-directory.ts / .html / .scss               ← complete, nothing to do
│       ├── dialog-person/                                   ← complete, nothing to do
│       ├── staff-directory-routes.ts                        ← TO REWORK: ':id' route has no resolver yet
│       ├── resolvers/                                       ← DOES NOT EXIST YET, you create it
│       └── person-details/
│           ├── person-details.ts                            ← TO REWORK: still fetches its own data with rxResource
│           └── person-details.html                          ← TO REWORK: still branches on a loading state
```

`staff-directory-routes.ts` currently looks like this:

```ts
export const staffDirectoryRoutes: Routes = [
  {
    path: '',
    canActivateChild: [authenticatedGuard],
    children: [
      { path: '', component: StaffDirectory },
      { path: ':id', component: PersonDetails },
    ],
  },
];
```

Nothing tells the router to fetch the person before it renders `PersonDetails` — the component does it itself, after the route has already activated.

## 📝 Your tasks

### 1. Create `feature/staff-directory/resolvers/index.ts`

This is a new file. It needs to export a resolver whose job is: given the current `':id'` route, return an `Observable<Person>` for that person.

- Type it with `ResolveFn<Person>` from `@angular/router` — the same functional shape you used for guards (`CanActivateFn`), except a resolver's job is to *produce a value*, not to allow/deny navigation.
- The function receives an `ActivatedRouteSnapshot` as its first argument (you don't need the second `RouterStateSnapshot` argument here) — read the `id` route param off it the same way you'd read any snapshot param.
- Use `inject()` inside the function body (resolvers run in an injection context just like guards) to reach the `People` provider, and call the method it already exposes for fetching a single person by id.
- Return the Observable directly — you don't need to subscribe to it yourself; the router subscribes and waits for it to emit before continuing.

### 2. Wire the resolver onto the `:id` route in `staff-directory-routes.ts`

Import your resolver and add a `resolve` property to the `':id'` route. The `resolve` property is an object mapping a key to a resolver — pick a key name that will become the input name on `PersonDetails` in the next task (think about what the data actually represents, not the route param name).

### 3. Rework `person-details.ts` to consume resolved data instead of fetching it

- Remove the `id` input, the `rxResource` field, and the `People`/`rxResource` fetching logic — the component no longer needs to know the route's `id` param at all.
- Add a new **required input** whose name matches the key you chose in the `resolve` object in task 2, typed as the domain object the resolver produces (not a resource wrapper — router input binding hands the component the resolved value directly).
- Update `savePerson()` to read whatever it previously read off the fetched resource (e.g. the person's id) from the new input instead.
- You can drop the `Loader` import once nothing in the template needs it anymore (see task 4).

### 4. Simplify `person-details.html`

With the data guaranteed to be present before the component even renders, the `@if (...) { form } @else { loader }` branch is no longer needed — the router only activates the route once the resolver has emitted, so there's no "loading" state left to represent in this template. Render the form directly, passing it the new input.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 18-resolver
```

This also starts the `server-rest` mock API the app depends on (`environments/environment.ts` points to `http://localhost:9000/api`) — leave it running, no need to start it separately. `18-resolver` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

```bash
nx build 18-resolver   # production build
```

## ✅ How to know it's working

- Signing in and clicking a person from the Staff Directory list navigates you straight to a fully populated detail form — you should never see the spinner (`sfeir-loader`) flash on screen, even on a slow connection (try throttling the Network tab to "Slow 3G" and watch: the URL bar updates and the browser stays on the *previous* screen until the form is ready, instead of showing a blank/loading detail page).
- Typing a `/people/<id>` URL directly into the address bar (while signed in) still lands you on a fully populated form, with no manual reload needed.
- Editing a person and saving still works exactly as before, and still navigates back afterwards.
- With the Network tab open, navigating to `/people/:id` shows the `GET /people/:id` request happening *before* the `PersonDetails` component's view appears, not after.
- The `person-details.ts` file no longer imports `rxResource`, `Loader`, or `Router`/`id` machinery it doesn't need anymore.

## 🛠️ Troubleshooting

- **`PersonDetails` renders with `undefined`/blank fields, or a "required input" runtime error** — the input name on the component must exactly match the key you used in `resolve: { <key>: ... }` on the route; a mismatch means `withComponentInputBinding()` has nothing to bind to that input.
- **Navigating to `/people/:id` never finishes, page stays on the list view forever** — check what your resolver actually returns. It must return (or resolve to) the Observable from `People`, not `void`/`undefined`, and it must not swallow the request without emitting.
- **`inject()` throws "not in an injection context"** — same rule as with guards: call `inject()` synchronously in the resolver function body, not inside a nested `async` callback or after an `await`.
- **TypeScript complains about the resolver's generic/return type** — `ResolveFn<T>` expects the resolver to return (or resolve to) a value of type `T`; make sure the `Observable` you return is typed to the same domain object you're using as the component input's type.
- **The loading spinner still flashes briefly** — this usually means the template in `person-details.html` still has the old `@if (...) { } @else { }` branch left over, or the component still has a leftover `rxResource`/loading field being checked; the resolved input should be used unconditionally.
- **The detail route no longer requires sign-in** — you shouldn't have touched `canActivateChild` on the parent route; if it's gone, you accidentally removed it while editing `staff-directory-routes.ts`.

## 🙈 Stuck?

Try wiring the resolver and getting the loading branch to disappear from the template on your own first — reasoning through *why* the router can wait on an Observable before activating a route, and how that's different from a guard just saying yes/no, is the actual point of this exercise. If you want a reference, `apps/18-resolver-solution` has a working implementation. Use it to check your approach once your own version works, not as a shortcut to copy from.
