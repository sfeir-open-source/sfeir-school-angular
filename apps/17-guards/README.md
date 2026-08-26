# 17 — Guards

The app now has a `Login` screen, but it's purely decorative: anyone can type `/home` or `/people` directly in the address bar and land on the Staff Directory whether they signed in or not, and a signed-in user can just as easily navigate back to `/login` and see the form again. In this exercise you close that gap with **router guards** — functions the Angular Router consults *before* it activates a route, lets it match a lazy chunk, or lets it activate a child route, so the URL bar stops being the only thing standing between a visitor and a protected screen.

You won't touch any component. `Login`, `Home`, `StaffDirectory`, `PersonDetails` and the `UserService`/`People` providers are already fully wired — `UserService.login()` already writes an `Authorization` entry to `sessionStorage`, and the router config already lazy-loads `/people` the way you built it in the previous exercise. What's missing is the layer that reads that session state and decides, on every navigation, whether it should be allowed to continue.

## 🎯 Learning objectives

- Writing **functional guards** (`CanActivateFn`, `CanMatchFn`, `CanActivateChildFn`) with `inject()` instead of class-based `CanActivate` services
- Blocking access to a route with `canActivate`, and reading session state through a custom injection token (`WINDOW`) instead of touching the global `window` directly
- Redirecting from inside a guard by **returning a `UrlTree`** (`router.createUrlTree(...)`) rather than injecting `Router` just to call `navigate()` and returning `false`
- Guarding a **lazy-loaded** route segment with `canMatch`, and understanding why that's a different concern from `canActivate`
- Guarding an entire subtree of **child routes** in one place with `canActivateChild`, instead of repeating the same guard on every child route
- Reusing the same guarding logic in both directions (protecting a page from anonymous users, and protecting the login page from already-authenticated users)

## 📁 What you're working with

```
src/app/
├── app.route.ts                                    ← TO REWORK: no guards yet
├── core/
│   ├── guards/                                      ← DOES NOT EXIST YET, you create it
│   ├── provider/
│   │   ├── window.ts                                ← complete, nothing to do
│   │   ├── user-service.ts                          ← complete, nothing to do (already writes 'Authorization' to sessionStorage)
│   │   └── people.ts                                ← complete, nothing to do
├── feature/
│   ├── login/                                       ← complete, nothing to do
│   ├── home/                                        ← complete, nothing to do
│   └── staff-directory/
│       ├── staff-directory.ts                       ← complete, nothing to do
│       ├── person-details/                          ← complete, nothing to do
│       ├── dialog-person/                           ← complete, nothing to do
│       └── staff-directory-routes.ts                ← TO REWORK: no guard on the child routes yet
```

`app.route.ts` currently looks like this:

```ts
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'people', loadChildren: async () => (await import('./feature/staff-directory/staff-directory-routes')).staffDirectoryRoutes },
];
```

Nothing here checks whether the visitor is actually signed in. `core/provider/window.ts` exposes a `WINDOW` injection token (an injectable wrapper around the global `window`, so guards and services can be unit-tested without touching the real browser global), and `UserService.login()` already stores the signed-in username under the `'Authorization'` key in `sessionStorage` when the login form is submitted. Your job is to read that key back inside a guard and use it to gate navigation.

## 📝 Your tasks

### 1. Create `core/guards/authenticated.ts`

This is a new file. It needs to export **two** functional guards:

- One that allows navigation to continue only when the visitor **is** authenticated (an `'Authorization'` entry exists in `sessionStorage`), and otherwise redirects to `/login`.
- One that allows navigation to continue only when the visitor is **not** authenticated, and otherwise redirects to `/people` — this is the one that keeps a signed-in user from seeing the login form again.

Both guards need to:

- Be plain functions matching Angular's functional guard signature (`CanActivateFn`; the same shape is reused for `CanMatchFn` and `CanActivateChildFn` — the router calls them the same way regardless of which `can*` array they're registered in), using `inject()` inside the function body to reach dependencies — functional guards run in an injection context, so `inject()` works here even though there's no constructor.
- Read the `'Authorization'` key off `sessionStorage`, reached through the `WINDOW` token (`inject(WINDOW).sessionStorage`) rather than the global `window`.
- On the "deny" path, **return a `UrlTree`** built with `inject(Router).createUrlTree([...])` instead of injecting `Router`, calling `navigate()`, and returning `false`. Returning a `UrlTree` from a guard tells the router "redirect here instead" in a single step, and it composes correctly with guards on lazy-loaded segments (see task 2) in a way that an imperative `navigate()` call from inside a guard does not.

Since both guards share the same "look up the session key, then branch" shape, consider factoring the lookup into a small reusable piece and parameterizing only the branching decision — you'll end up with less duplicated `inject()`/`sessionStorage` code between the two exports.

### 2. Protect the top-level routes in `app.route.ts`

Import your two guards and wire them onto the existing routes:

- `login` should reject an already-authenticated visitor (the "not authenticated" guard) — this is what stops a signed-in user from navigating back to the login form.
- `home` should reject an anonymous visitor (the "authenticated" guard).
- `people` should reject an anonymous visitor too, but think about *which* guard array to use here: `people` is lazy-loaded via `loadChildren`. `canActivate` runs once the route has already been resolved and is about to activate; `canMatch` runs *before* the router even considers the route a match, which also means it runs before the lazy chunk is fetched. Register the "authenticated" guard on `people` in a way that stops an anonymous visitor from triggering the chunk download in the first place, not just from seeing the rendered page.

### 3. Protect the nested routes in `staff-directory-routes.ts`

The `people` segment expands into two child routes — the list view (`''`) and the detail view (`':id'`) — through the `children` array you built in the previous exercise. Rather than repeating a guard on each child individually, apply the "authenticated" guard **once**, on the parent route that owns the `children` array, using the guard property that runs for every child navigation under that parent (`canActivateChild`, not `canActivate` — the parent route itself has no component to activate).

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 17-guards
```

This also starts the `server-rest` mock API the app depends on (`environments/environment.ts` points to `http://localhost:9000/api`) — leave it running, no need to start it separately. `17-guards` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

```bash
nx build 17-guards   # production build
```

## ✅ How to know it's working

- Navigating directly to `/home` or `/people` in a fresh (signed-out) session redirects you straight to `/login` instead of rendering the page.
- Signing in through the login form (any non-empty username) navigates you to `/people`, and the Staff Directory renders normally — list, detail, and dialog all still behave exactly as before.
- Once signed in, navigating (or typing the URL) to `/login` redirects you to `/people` instead of showing the form again.
- With the Network tab open, a signed-out visit to `/people` never downloads the Staff Directory's lazy chunk at all — the navigation is stopped before the router even loads it.
- Clearing `sessionStorage` (DevTools → Application tab, or `sessionStorage.clear()` in the console) and reloading on `/people` sends you back to `/login`, and navigating to `/people/<some-id>` while signed out never reaches `PersonDetails`.

## 🛠️ Troubleshooting

- **Signed-out visitors can still reach `/home` or `/people`** — check that the guard is actually registered in the route's `canActivate` (or `canMatch`/`canActivateChild`) array in `app.route.ts` / `staff-directory-routes.ts`, and that the array holds the guard *function itself* (`authenticatedGuard`), not a call to it (`authenticatedGuard()`).
- **Redirect loop between `/login` and `/people`** — usually means both guards are reading the same session state but redirecting to routes that are themselves guarded in the opposite direction in a way that contradicts each other; double-check which guard belongs on `login` versus `home`/`people`.
- **`inject()` throws "not in an injection context"** — this happens if `inject()` is called outside the guard's synchronous function body (e.g. inside an `async` callback after an `await`, or memoized outside the returned function). Functional guards only get an injection context for the duration of the function call itself.
- **The Staff Directory's JS chunk downloads even when signed out** — the guard protecting the lazy segment needs to be on `canMatch`, not (only) `canActivate`; `canActivate` alone still lets the router resolve and fetch the lazy module before rejecting the activation.
- **The list view (`/people`) is protected but `/people/:id` isn't, or vice versa** — you likely put the guard on one of the two child routes individually instead of on `canActivateChild` of their shared parent; one guard on the parent should cover both children.
- **TypeScript complains about the guard's return type** — a functional guard must return a `boolean`, a `UrlTree`, or a `Promise`/`Observable` of either; make sure every code path (authenticated and not) returns one of those, not `void`.

## 🙈 Stuck?

Try to get both directions of redirection working with your own guard shape before comparing notes — reasoning through *why* `canMatch` matters for a lazy route, and why one `canActivateChild` beats two repeated `canActivate` guards, is the actual point of this exercise. If you want a reference, `apps/17-guards-solution` has a working implementation, including how the two guards share their session-lookup logic. Use it to check your approach once your own version works, not as a shortcut to copy from.
