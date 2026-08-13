# Hands-on #2 — Building a Component Tree

In the previous exercise, `App` did everything by itself: it rendered the
toolbar *and* the page content in a single template. That doesn't scale — a
real application is a **tree of components**, each owning one piece of the
UI. In this exercise, you'll extract the "page content" part of `App` into
its own child component, `Home`, and make `App` render it through its
selector instead of inlining the markup.

## 🎯 Learning objectives

By completing this exercise, you will practice:

- **Splitting a component in two** — recognizing when a chunk of a
  template belongs in its own component, and moving it out cleanly (class
  logic + template + styles together).
- **Component composition** — using one component's selector as an
  element inside another component's template, building a parent/child
  relationship in the component tree.
- **The `imports` array, again** — a standalone component must declare
  every child component it uses in its template, exactly like it does for
  Angular Material modules.
- **Feature folder structure** — organizing a new component under a
  `feature/` folder instead of leaving everything flat in `app/`.
- **Reading a `*.spec.ts` as a contract** — using the tests already
  written for a component to know exactly what it must render, without
  being told the implementation.

## 📁 What you're working with

```
apps/02-component-tree/src/
├── index.html          ✅ complete — declares <sfeir-root></sfeir-root>
├── main.ts              ✅ complete — bootstraps App
└── app/
    ├── app.ts            🟡 TO DO — currently owns the page content itself
    ├── app.html          🟡 TO DO — currently inlines a <mat-card> with a name
    ├── app.scss          ✅ complete — nothing to change
    ├── app.config.ts     ✅ complete — nothing to change
    └── feature/          ❌ TO DO — this folder doesn't exist yet, you create it
        └── home/
            ├── home.ts     ❌ TO DO — the new child component's class
            ├── home.html   ❌ TO DO — the new child component's template
            └── home.scss   ❌ TO DO — the new child component's styles
```

Right now, `App` renders a toolbar (Angular Material, not the point of this
exercise) followed directly by a `<mat-card>` displaying a name. Your job is
to move that card into a new `Home` component and have `App` display `Home`
instead.

## 📝 Your tasks

### 1. Create the `Home` component — `app/feature/home/`

Create a new folder `feature/home/` under `app/`, and inside it a
standalone component named `Home` with its own `.ts`, `.html`, and `.scss`
files, following the same anatomy you used for `App` in the previous
exercise (`@Component` decorator, `templateUrl`, `styleUrl`).

- Give it the selector `sfeir-home`.
- It needs to import `MatCardModule` from `@angular/material/card` (same
  as `App` currently does) since its template will use `<mat-card>`.
- It should expose a class property holding a name, and its template
  should display that value inside a `<mat-card>` — essentially, move
  what's currently in `App`'s card into this new component.

> 💡 Look at what `App`'s current template and class already do with the
> `<mat-card>` and its name property — you're relocating that
> responsibility, not inventing new behavior.

### 2. Make `App` render `Home` — `app/app.ts` and `app/app.html`

Once `Home` exists:

- In `app.ts`, remove the class property and the logic that used to belong
  to the card, and add `Home` to the component's `imports` array so its
  selector can be used in the template.
- In `app.html`, replace the `<mat-card>...</mat-card>` block with a
  self-closing `<sfeir-home />` tag.

`App`'s job becomes purely structural now: render the toolbar, then render
`Home`. It shouldn't know or care what's inside `Home` anymore — that's the
whole point of composing a tree instead of one flat component.

## ▶️ How to run the application

From the **repository root**:

```bash
npx nx serve 02-component-tree
```

Once the dev server is ready, open your browser at:

```
http://localhost:4200
```

Other useful commands (run from the repository root):

```bash
npx nx test 02-component-tree    # run unit tests for this app
npx nx lint 02-component-tree    # lint this app
npx nx build 02-component-tree   # production build
```

The dev server watches your files, so saving `app.ts`, `app.html`, or any
file under `feature/home/` will reload the page automatically.

## ✅ How to know it's working

When your tasks are done, the app should:

1. Compile and serve without errors in the terminal.
2. Show the toolbar (SFEIR logo + "Maps" / "List" links) in the browser,
   exactly as before.
3. Show the same `<mat-card>` with a name below the toolbar — but now it
   comes from a separate `Home` component instead of being inlined in
   `App`.
4. If you inspect the rendered DOM, `App`'s template contains a
   `<sfeir-home>` element, and that element itself renders the
   `<mat-card>`.

## 🛠️ Troubleshooting

**`NG0304` / `'sfeir-home' is not a known element`**

- `App`'s `imports` array is missing `Home`. Standalone components must
  explicitly import every child component used in their template, same as
  for Angular Material modules.

**`NG0304` / `'mat-card' is not a known element` (inside `Home`)**

- `Home`'s own `imports` array is missing `MatCardModule`. Moving the
  markup into a new component doesn't move the import with it — you have
  to declare it again on the new component, since it's the one whose
  template now uses `<mat-card>`.

**Compilation error pointing at `templateUrl` or `styleUrl` in `home.ts`**

- These paths are relative to the component file. Since `home.ts` lives in
  `app/feature/home/`, the correct values are `'./home.html'` and
  `'./home.scss'`.

**The name doesn't show up anymore**

- Make sure you actually moved the class property (and the interpolation
  using it) into `Home`, not just the `<mat-card>` tag. Also double-check
  the property name matches exactly between `home.ts` and `home.html`.

**Selector mismatch**

- The tag you use in `app.html` (`<sfeir-home />`) must exactly match the
  `selector` you set on `Home`'s `@Component` decorator — case and
  spelling included.

## 🙈 A note on the solution

A completed reference implementation exists in the neighboring
`apps/02-component-tree-solution/` folder. Try to solve the exercise on
your own first — use it only if you're truly stuck, and try to understand
_why_ your approach didn't work before peeking, not just copy the answer.
