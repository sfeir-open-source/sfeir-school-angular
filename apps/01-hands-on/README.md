# Hands-on #1 — Your First Standalone Component

Welcome to your first Angular exercise! In this hands-on, you'll bootstrap a
minimal Angular application from (almost) nothing: no `NgModule`, just a
standalone component wired straight into the browser.

## 🎯 Learning objectives

By completing this exercise, you will practice:

- **Standalone components** — declaring a component with `@Component`
  without any `NgModule`.
- **The `imports` array** — bringing in other standalone
  dependencies (here, Angular Material's `MatToolbarModule` and
  `MatCardModule`) directly on the component.
- **Component anatomy** — the relationship between a component's
  TypeScript class, its `selector`, its `templateUrl`, and its `styleUrl`.
- **Template interpolation** — displaying a class property's value in a
  template with `{{ }}`.
- **Bootstrapping an application** — using `bootstrapApplication()` and an
  `ApplicationConfig` to start an Angular app without a root module.

## 📁 What you're working with

```
apps/01-hands-on/src/
├── index.html              ✅ complete — declares <sfeir-root></sfeir-root>
├── main.ts                 ❌ TO DO — empty, you must bootstrap the app
└── app/
    ├── app.ts    ❌ TO DO — empty, you must create the component
    ├── app.html  🟡 TO DO — one placeholder to replace
    ├── app.scss  ✅ complete — nothing to change
    └── app.config.ts       ✅ complete — nothing to change
```

Only three things are missing. Everything else is already provided so you
can focus on the concepts above.

## 📝 Your tasks

### 1. Create the root component — `app/app.ts`

This file is currently **empty**. You need to create and export a
standalone component class that:

- Is decorated with `@Component(...)`.
- Uses the selector `sfeir-root` (this must match what `index.html`
  expects — look at the `<sfeir-root></sfeir-root>` tag).
- Points to the existing `app.html` and `app.scss`
  files (`templateUrl` / `styleUrl`).
- Declares an `imports` array containing `MatToolbarModule` and
  `MatCardModule` (both used by the existing template — check
  `app.html` to see where).
- Exposes a class property holding **your name** as a string, so it can be
  displayed in the template (step 2).

> 💡 A standalone component needs no `NgModule` — its own `imports` array
> declares everything the template needs.

### 2. Display your name — `app/app.html`

Open the template. Angular Material's toolbar is already built for you
(feel free to ignore how it works — it's not the point of this exercise).
Inside the `<mat-card>`, you'll find:

```html
<mat-card>
  <!-- display your name -->
</mat-card>
```

Replace that comment with an **interpolation binding** (`{{ }}`) that
outputs the class property you created in step 1.

### 3. Bootstrap the application — `src/main.ts`

This file is also **empty**. You need to bootstrap your standalone
component as the root of the application, using:

- `bootstrapApplication` from `@angular/platform-browser`.
- Your component class from step 1.
- The `appConfig` already exported from `app/app.config.ts`.
- A `.catch()` to log any bootstrap error to the console.

## ▶️ How to run the application

This app is the Nx workspace's default project, so from the **repository
root** you can simply run:

```bash
npm run client
```

This is equivalent to `npx nx serve 01-hands-on`. Once the dev server is
ready, open your browser at:

```
http://localhost:4200
```

Other useful commands (run from the repository root):

```bash
npx nx serve 01-hands-on   # start the dev server explicitly by name
npx nx test 01-hands-on    # run unit tests for this app
npx nx lint 01-hands-on    # lint this app
npx nx build 01-hands-on   # production build
```

The dev server watches your files, so once it's running you just need to
save `main.ts`, `app.ts`, and `app.html` and the page
will reload automatically.

## ✅ How to know it's working

When your three tasks are done, the app should:

1. Compile and serve without errors in the terminal.
2. Show the toolbar (SFEIR logo + "Maps" / "List" links) in the browser.
3. Show a card below the toolbar containing **your name**.

## 🛠️ Troubleshooting

**Blank white page / nothing renders**

- Open the browser console (F12) — a bootstrap error is almost always
  logged there thanks to the `.catch()` in `main.ts`.
- Check that the selector in your `@Component` decorator is exactly
  `sfeir-root` — it must match the tag used in `index.html`.
- Make sure `main.ts` actually calls `bootstrapApplication(...)` with your
  component and `appConfig` — an empty `main.ts` will produce a blank page
  with no visible error.

**`NG0304` / `'mat-toolbar' is not a known element` (or similar for
`mat-card`)**

- This means the component's `imports` array is missing
  `MatToolbarModule` and/or `MatCardModule`. Standalone components must
  explicitly import every directive/component they use in their template.
- Double-check your import paths: `@angular/material/toolbar` and
  `@angular/material/card`.

**My name doesn't show up in the card**

- Confirm the property name you used in the class matches exactly what
  you typed inside `{{ }}` in the template (TypeScript and HTML are
  case-sensitive here).
- Make sure the interpolation is inside `<mat-card>...</mat-card>`, not
  outside it.

**Compilation error pointing at `templateUrl` or `styleUrl`**

- These paths are relative to the component file. Since
  `app.ts` lives in `app/`, the correct values are
  `'./app.html'` and `'./app.scss'`.

**The toolbar/card look completely unstyled (no colors, no elevation)**

- That's expected for now — the Material theme stylesheet isn't part of
  this exercise's setup. It doesn't affect whether your solution is
  correct; the toolbar/card should still be functional, just unthemed.

**Port 4200 already in use**

- Stop any other running Angular/Nx dev server, or run
  `npx nx serve 01-hands-on --port=4201` and open that port instead.

## 🙈 A note on the solution

A completed reference implementation exists in the neighboring
`apps/01-hands-on-solution/` folder. Try to solve the exercise on your own
first — use it only if you're truly stuck, and try to understand _why_
your approach didn't work before peeking, not just copy the answer.
