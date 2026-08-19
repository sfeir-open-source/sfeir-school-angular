# 09 — Router

Up to now `App` has only ever shown one screen: it imported `Home` directly and rendered `<sfeir-home />` in its template, no matter what URL the browser was on. Look at `app.html` — the toolbar already has links to `/home`, `/locator` and `/people`, but they're dead: clicking them just changes the URL, nothing on screen reacts. In this exercise you'll wire up the **Angular Router** so the app actually responds to the URL: a route configuration that maps a path to a component, a router provider registered at bootstrap, and a `<router-outlet />` that renders whatever route currently matches — replacing the hardcoded `<sfeir-home />`.

## 🎯 Learning objectives

- Understanding the Router's job: matching the current URL against a list of **routes** and rendering the component tied to the match, instead of a component hardcoding what it shows
- Declaring a route table as a `Routes` array (from `@angular/router`), each entry mapping a `path` string to a `component`
- Writing a **redirect** route (`redirectTo`) with `pathMatch: 'full'`, and understanding why `full` matters here — without it, an empty-path route would redirect on every URL that merely _starts_ with an empty string, i.e. all of them
- Registering the Router in a standalone application via `provideRouter(routes)` in the `ApplicationConfig`'s `providers` array — the same DI-based bootstrap pattern already used for `provideBrowserGlobalErrorListeners()`
- Using **`RouterOutlet`** as a standalone directive/component: importing it into `App`'s `imports` array and placing `<router-outlet />` in the template as the slot where the router injects whichever component matched the active route
- Recognizing that routing replaces a _static_ parent-to-child relationship (`App` importing and always showing `Home`) with a _dynamic_ one driven entirely by configuration — `App` no longer needs to know `Home` exists

## 📁 What you're working with

```
apps/09-router/
└── src/app/
    ├── app.route.ts   🚧 to create — this file doesn't exist yet, you need to add it
    ├── app.config.ts  🚧 to do — currently only registers provideBrowserGlobalErrorListeners()
    ├── app.ts         🚧 to do — currently imports and uses Home directly, no router involved
    ├── app.html       🚧 to do — currently renders <sfeir-home /> unconditionally
    ├── app.scss       ✅ complete — nothing to do here
    ├── core/provider/people.ts   ✅ complete
    └── feature/home/
        ├── home.ts    ✅ complete — same person signal + handleRefresh(), using <sfeir-card>
        ├── home.html  ✅ complete — renders <sfeir-card [person]="person()" (delete)="handleRefresh()" />
        └── home.scss  ✅ complete — nothing to do here
```

Nothing under `feature/home/` needs to change — `Home` itself stays exactly the component it already is. What changes is _how it gets shown_: instead of `App` hardcoding it, the router will decide.

## 📝 Your tasks

### 1. `app.route.ts` — declare the route table

Create this file (it doesn't exist yet) and export a constant of type `Routes` (from `@angular/router`). It needs two entries:

- A route for the empty path (`''`) that doesn't render a component but **redirects** somewhere else — think about what happens if a user lands on the app's root URL with no path at all, and where you want them to end up. Remember the `pathMatch: 'full'` detail from the learning objectives.
- A route for a `home` path that maps to the `Home` component (import it from `./feature/home/home`, the same way `app.ts` currently does).

Name the exported constant something clear (e.g. reflecting that it's the application's route table) — you'll need to import it in the next step.

### 2. `app.config.ts` — provide the router

- Import `provideRouter` from `@angular/router`.
- Import the routes constant you just created from `./app.route`.
- Add `provideRouter(...)` to the existing `providers` array, alongside `provideBrowserGlobalErrorListeners()` — don't remove the existing provider, just extend the array.

### 3. `app.ts` — swap `Home` for `RouterOutlet`

- Remove the import of `Home` — `App` shouldn't know about a specific feature component anymore.
- Import `RouterOutlet` from `@angular/router` instead, and add it to the component's `imports` array in place of `Home`.

### 4. `app.html` — render the outlet

- Replace `<sfeir-home />` with `<router-outlet />`. Leave the toolbar above it untouched — its links already point at `/home`, `/locator` and `/people`; you're only responsible for making `/home` resolve to something (the other two are out of scope for this exercise).

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly:

```bash
npx nx serve 09-router   # dev server → http://localhost:4200
npx nx test 09-router    # run the app's unit tests with vitest
npx nx lint 09-router    # lint the app with eslint
npx nx build 09-router   # production build
```

## ✅ How to know it's working

Serve the app and open it in the browser:

- Visiting `/` (the app's root URL, no path) redirects automatically to `/home`, and the URL bar reflects that.
- Visiting `/home` directly also works and shows the same thing — the profile card and refresh button you already know from previous exercises.
- The page no longer works by accident because `App` "just happens" to embed `Home` — open devtools' Elements panel and you should see a `<router-outlet>` marker sitting right where `Home`'s rendered content now appears.
- No console errors about `router-outlet` being an unknown element, or about a missing router provider.
- Clicking the "Maps" or "List" links in the toolbar changes the URL but is expected to show nothing useful yet (`/locator` and `/people` have no matching route) — that's outside this exercise's scope.

## 🛠️ Troubleshooting

- **Blank page, console error mentioning `NG04002` or "Cannot match any routes"**: your route table doesn't have an entry for the current URL — check the `path` values in `app.route.ts` don't have stray leading slashes (Angular route `path`s are relative, never start with `/`).
- **Error about `router-outlet` not being a known element (`NG8001`)**: `RouterOutlet` isn't in `App`'s `imports` array, or the import is missing/misspelled in `app.ts`.
- **Visiting `/` doesn't redirect to `/home`, or redirects but the page stays blank**: double-check the empty-path route has both `redirectTo` and `pathMatch: 'full'` — without `pathMatch: 'full'`, the empty path is treated as a _prefix_ match and behaves unexpectedly once other routes exist.
- **Runtime error about `NullInjectorError` / no provider for `Router`**: `provideRouter(...)` isn't wired into `app.config.ts`'s `providers` array, or `main.ts` isn't bootstrapping with `appConfig` (it already does — check you didn't remove the existing provider by mistake instead of adding to the array).
- **`/home` works but nothing renders inside it**: confirm the `home` route's `component` points at the actual `Home` class import, not a string or a typo'd identifier.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 09-router` explicitly.

## 🙈 Stuck?

Try building the route table, provider registration and outlet swap yourself first — that's the whole point of the exercise. If you're genuinely stuck, `apps/09-router-solution` is a complete, working version — including `app.spec.ts`, which uses `RouterTestingHarness` to verify the redirect and the outlet rendering, and documents the expected routing behavior precisely. Use it to check your approach once you've made a real attempt, not as a starting point to copy from.
