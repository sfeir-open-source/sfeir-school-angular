# 16 — Advanced Routing

So far every route in this app has been a flat, eagerly-loaded top-level entry in `app.route.ts`: `/home`, `/people`, and `/people/:id` all sit side by side, and every component they point to ships in the app's main bundle from the very first paint. In this exercise you restructure the Staff Directory's routes into a **feature-owned, lazily-loaded route tree**: the list view and the detail view become **child routes** nested under a single `/people` entry point, and that entry point is loaded **on demand** instead of upfront.

This isn't just a cosmetic reshuffle. It's the pattern real Angular applications use to keep the initial bundle small and to let each feature own its own routing concerns instead of leaking every detail component into the root route table. You'll see the size difference in the initial chunk, and you'll understand why the router needs an extra empty-path layer to make it work.

## 🎯 Learning objectives

- Lazy-loading a feature's routes with `loadChildren` and a dynamic `import()`, instead of `component` on every top-level route
- Splitting a route table into a dedicated per-feature routes file, colocated with the feature it configures
- Nesting **child routes** under a parent route via the `children` array, including the empty-path (`path: ''`) pattern used to "merge" a feature's own list/detail routes into the segment that lazy-loaded them
- Reorganizing a feature's folder structure so a detail component lives inside the feature it belongs to, instead of as a sibling at the app root
- Reading route parameters through **component input binding** (`withComponentInputBinding()`) — an `input.required<string>()` on the component instead of manually injecting `ActivatedRoute` and subscribing to `paramMap`

## 📁 What you're working with

```
src/app/
├── app.route.ts                                    ← TO REWORK: currently flat, eager routes
├── app.config.ts                                   ← complete, already has withComponentInputBinding()
├── feature/
│   ├── home/                                       ← complete, nothing to do
│   ├── person-details/                             ← TO MOVE: currently a sibling feature at app root
│   │   ├── person-details.ts
│   │   ├── person-details.html
│   │   └── person-details.scss
│   └── staff-directory/
│       ├── staff-directory.ts                      ← complete, nothing to do
│       ├── staff-directory.html                    ← complete, nothing to do
│       ├── dialog-person/                          ← complete, nothing to do
│       └── staff-directory-routes.ts                ← DOES NOT EXIST YET, you create it
```

The three route destinations — `Home`, `StaffDirectory`, `PersonDetails` — are already fully working components; nothing about *what* they render changes in this exercise. What changes is *how the router finds and loads them*.

`app.route.ts` currently looks like this:

```ts
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'people', component: StaffDirectory },
  { path: 'people/:id', component: PersonDetails },
];
```

Two problems with this table, which the exercise fixes:

- `StaffDirectory` and `PersonDetails` are eagerly imported at the top of `app.route.ts`, so they (and everything they pull in — Angular Material dialog, forms, etc.) end up in the app's initial JavaScript bundle even if the user never navigates to `/people`.
- `people` and `people/:id` are two unrelated top-level entries that happen to share a URL prefix, rather than a parent/child relationship that reflects that they're really "the list view and the detail view of the same feature."

## 📝 Your tasks

### 1. Move `PersonDetails` into the Staff Directory feature

Relocate the `person-details` folder so it lives *inside* `feature/staff-directory/` instead of next to it at `feature/`. This isn't just tidiness — it reflects that the detail view is part of the Staff Directory feature and lets you import it locally from a routes file that lives in the same folder. Update the relative import paths inside `person-details.ts` (to `../../core/provider/people` becomes one level deeper) after the move.

### 2. Create `feature/staff-directory/staff-directory-routes.ts`

This is a new file. Export a `Routes` array (name it so `app.route.ts` can import it — see task 3) that describes the Staff Directory feature's own routing, independently of the rest of the app:

- A route matching `StaffDirectory` at the feature's own root (the list view).
- A route matching `PersonDetails` at a `:id` segment (the detail view).

Both need to be reachable once this array is mounted under `/people` by the app-level route (task 3) — think about what relationship between these two routes lets the router resolve `/people` (list) and `/people/:id` (detail) once this file's routes are attached at that segment. The `children` property on a `Route` and an empty-path (`path: ''`) route are the tools involved.

### 3. Rework `app.route.ts` to lazy-load the feature

Replace the two `people`/`people/:id` entries with a single route for the `people` segment that uses `loadChildren` instead of `component`. `loadChildren` takes a function returning a `Promise<Routes>` — use a dynamic `import()` of your new `staff-directory-routes.ts` file, and resolve to the exported routes array from that module.

Once this is wired up, remove the now-unused eager imports of `StaffDirectory` and `PersonDetails` from `app.route.ts` — the router only reaches them through the lazy-loaded chunk now.

### 4. Verify the route param still reaches `PersonDetails`

You shouldn't need to touch `PersonDetails` itself — `app.config.ts` already enables `withComponentInputBinding()`, and the component already declares `id = input.required<string>()`. Once your child route is registered with a `:id` segment, the router should populate that input automatically. Use this to confirm your route tree is actually shaped the way you intended: if the input never receives a value, the `:id` route isn't being reached the way you think it is.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 16-advanced-routing
```

This also starts the `server-rest` mock API the app depends on (`environments/environment.ts` points to `http://localhost:9000/api`) — leave it running, no need to start it separately. `16-advanced-routing` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

Other useful targets for this project:

```bash
nx build 16-advanced-routing   # production build
nx lint 16-advanced-routing    # lint
nx test 16-advanced-routing    # test
```

## ✅ How to know it's working

- Navigating to `/home` and `/people` (via the "List" link in the toolbar) both still work exactly as before.
- Opening the browser's Network tab, reloading on `/home`, and *then* navigating to `/people` for the first time should trigger a new JS chunk request at that moment — the Staff Directory bundle wasn't downloaded on initial load.
- Navigating directly to a URL like `/people/<some-id>` (matching an existing person's id) renders the detail view for that specific person, not a blank page or a 404.
- The detail view correctly identifies *which* person it's showing without you writing any `ActivatedRoute`/`paramMap` code yourself — that's the `withComponentInputBinding()` wiring already in place doing its job once your route is shaped correctly.
- `app.route.ts` no longer imports `StaffDirectory` or `PersonDetails` directly.

## 🛠️ Troubleshooting

- **`/people` shows a blank page / router error "no routes matched"** — check that `loadChildren` resolves to the actual `Routes` array export, not the whole module namespace or a default export that doesn't exist; a dynamic `import()` resolves to a module object, so you need to pick the named export off it.
- **`/people` works but `/people/:id` doesn't** — this is almost always a routes-file shape problem: the list route and the detail route need to both be reachable once your file's routes are mounted at the `people` segment, which usually means they're `children` of a single empty-path (`path: ''`) parent route in `staff-directory-routes.ts`, not two independent top-level entries in that same array.
- **`id` is `undefined` inside `PersonDetails`** — either the `:id` param isn't part of the route path you registered, or `withComponentInputBinding()` got removed from `app.config.ts` (it shouldn't have — that file needs no changes in this exercise).
- **TypeScript can't find `./feature/staff-directory/person-details/person-details`** — likely a leftover import in `app.route.ts` pointing at the old `feature/person-details` location; that whole import should be gone once routing goes through `loadChildren`, not present in either its old or new path.
- **Relative import errors inside the moved `person-details.ts`** — after moving the folder one level deeper (into `staff-directory/`), its relative import of the `People` service needs an extra `../` to still reach `core/provider/people`.
- **Chunk downloads immediately on app start instead of on navigation** — double check you used `loadChildren` (a function returning a route-loading promise) and not `component` with an eagerly-imported class; also make sure nothing else in the app still imports `StaffDirectory`/`PersonDetails` eagerly, which would pull them back into the main bundle regardless of your route config.

## 🙈 Stuck?

Try reshaping the route tree yourself first — reasoning through *why* an empty-path child route is needed to merge a feature's internal routes into the segment that lazy-loaded them is the actual point of this exercise, not just getting the URLs to resolve. If you want to compare notes, `apps/16-advanced-routing-solution` has a working reference implementation, including where `staff-directory-routes.ts` ends up and how it's shaped. Use it to check your structure once your own version works, not as a shortcut to copy from.
