# 05 — Input / Output

In `04-events` the `Home` component owned everything: the profile card's markup, its styling, and the click handler that refreshes the displayed person. In this exercise you'll extract that card into its own reusable component, `sfeir-card`, living in the shared `@sfeir/ui` library instead of inside the app. `Home` will stop rendering the card's HTML directly and instead pass a `Person` down to `sfeir-card` and listen for a "delete" event coming back up — your first hands-on encounter with Angular's signal-based `input()`/`output()` component communication APIs.

## 🎯 Learning objectives

- Extracting a chunk of template + logic living in a parent component into its own standalone, reusable child component
- Declaring a required signal input with `input.required<T>()` so the compiler enforces that callers always provide a value
- Declaring a custom component event with `output<T>()` and emitting a typed payload through `.emit(...)`
- Passing data down to a child with property binding (`[person]="person()"`)
- Listening to a child's custom event with event binding, exactly like a native DOM event (`(delete)="handleRefresh()"`)
- Recognizing the one-way data flow pattern: the child never mutates the parent's state directly — it emits an event and lets the parent decide what to do
- Organizing shared UI in an Nx library (`@sfeir/ui`) and importing it from an app via a workspace path (`@sfeir/ui/card`)

## 📁 What you're working with

This exercise spans **two projects**: the app (`apps/05-input-output`) and a shared UI library (`libs/ui`).

```
apps/05-input-output/
└── src/app/
    ├── app.ts / app.html / app.scss / app.config.ts   ✅ complete — nothing to do here
    └── feature/home/
        ├── home.ts       🚧 to do — still owns all the card's Material imports; needs to use sfeir-card instead
        ├── home.html     🚧 to do — still has the full card markup inline; needs to become a <sfeir-card> usage
        └── home.scss     🚧 to do — still has all the card's styling rules, which are moving to the library

libs/ui/
└── card/
    ├── card.ts    🚧 to do — a bare component with no inputs/outputs yet
    ├── card.html  🚧 to do — currently just `Hello SFEIR` placeholder markup
    └── card.scss  🚧 to do — currently a 4-line stub
```

`apps/05-input-output/src/app/feature/home/home.ts` and `home.html` currently look exactly like they did at the end of `04-events`: a `person` signal, a `handleRefresh()` method that picks a random `Person` from `PEOPLE_MOCK` and `.set()`s it, and a template with the entire Material card markup (photo, name, contact info, action buttons) reading `person()` directly, plus the refresh FAB button. **Don't touch `handleRefresh()` or the `person` signal in `home.ts` — they're already correct and stay in `Home`.** Your job is to move the *card's markup and styling* out into `libs/ui/card`, and turn `Home`'s usage of it into a component with bindings.

## 📝 Your tasks

### 1. `libs/ui/card/card.ts` — give `Card` an input and an output

- Import `Person` (type-only) from `@sfeir/types`.
- Add a **required signal input** named `person` typed `Person`, using `input.required<Person>()` from `@angular/core`. Expose it `public readonly`, the same way `Home`'s `person` signal was exposed.
- Add a signal **output** named `delete`, using `output<string>()` from `@angular/core`. This will carry the id of the person the "Delete" button was clicked for.
- Add a method (e.g. something that reads naturally as "handle a delete click") that takes an `id: string` parameter and calls `.emit(id)` on the output. The template will call this method, not the output directly.
- Register whichever Angular Material modules the card's markup needs (`MatCardModule`, `MatIconModule`, `MatButtonModule`) and `NgOptimizedImage` in the component's `imports` array — the current `Card` only imports `MatCardModule`, which won't be enough once you build the real markup.

### 2. `libs/ui/card/card.html` — move the card markup here, driven by the input

Replace the `Hello SFEIR` placeholder with the profile card markup that currently lives in `apps/05-input-output/src/app/feature/home/home.html`. As you move it:

- Every read of the person that used to be `person()` (referring to `Home`'s signal) now reads `person()` again — but this time it's the signal returned by `input.required<Person>()` on `Card`. The property name doesn't need to change, only where it lives.
- The "Delete" action link currently does nothing (`href="#"`, no handler). Wire a `click` event binding on it to call the method you wrote in task 1, passing the current person's `id`.
- The "Locate" and "Edit" links, the photo (`[ngSrc]`), and every other binding move over unchanged in *how* they're written — only their home (`libs/ui/card` instead of `apps/05-input-output`) changes.

### 3. `libs/ui/card/card.scss` — move the card's styling here

The card's visual styling (sizing, hover shadow, contact-info rows, button positioning, text truncation, etc.) currently lives in `apps/05-input-output/src/app/feature/home/home.scss`, mixed in with the page-layout rules (`h1`, `section`). Move everything that's specifically about the **card** into `card.scss`; the 4-line stub there today only has generic centering/padding, which you can replace entirely.

### 4. `apps/05-input-output/src/app/feature/home/home.ts` — use `Card` instead of building the markup

- Import `Card` from `@sfeir/ui/card` (a workspace path, not a relative one) and add it to `Home`'s `imports` array.
- Once the card's markup lives in the library, `Home` no longer needs to build the card's DOM itself — drop the Material/`NgOptimizedImage` imports that only existed to support that markup (`MatCardModule`, `MatIconModule`, `NgOptimizedImage`), keeping only what the FAB refresh button still needs (`MatButtonModule`).
- `person` and `handleRefresh()` stay exactly as they are — `Home` still owns the *state*, it just no longer owns the *markup*.

### 5. `apps/05-input-output/src/app/feature/home/home.html` — replace the inline card with `<sfeir-card>`

- Replace the entire `<mat-card>...</mat-card>` block with a single `<sfeir-card>` element inside the existing `<section>`.
- Bind the `person` input with property binding, passing `Home`'s current person: `[person]="person()"`.
- Bind the `delete` output with event binding so that when the card emits it, `Home`'s `handleRefresh()` runs — the same method already wired to the refresh FAB button.
- Leave the refresh FAB button (`<button mat-fab ... (click)="handleRefresh()">`) exactly as it is, outside the `<section>`.

### 6. `apps/05-input-output/src/app/feature/home/home.scss` — clean up what's left

After moving the card's rules to `libs/ui/card/card.scss` (task 3), only the page-layout rules should remain here (the ones governing the section that centers the card and the page's `h1`, if any is used) — remove everything else so nothing is duplicated between the app and the library.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly. The shared library has its own project name, `ui`, if you want to run its checks in isolation:

```bash
npx nx serve 05-input-output   # dev server → http://localhost:4200
npx nx test 05-input-output    # run the app's unit tests with vitest
npx nx lint 05-input-output    # lint the app with eslint
npx nx build 05-input-output   # production build (also builds the "ui" library it depends on)

npx nx test ui                 # run the ui library's unit tests with vitest
npx nx lint ui                 # lint the ui library with eslint
```

Note: this exercise ships with no `*.spec.ts` files in either the app or the library, and the test runner is configured with `passWithNoTests: true`, so both `test` commands will report success without checking anything yet. Don't take a green `test` run as proof your implementation is correct — verify visually in the browser.

## ✅ How to know it's working

Serve the app and open it in the browser. Visually, nothing should look different from `04-events`:

- The same profile card renders (photo, name, entity, email, phone, manager, location, and the map/edit/delete action icons).
- Clicking the round "refresh" (autorenew) FAB button in the bottom-right still swaps the card for a random person, exactly as before.
- Clicking the card's "Delete" icon (the trash icon among the three action links) should now **also** trigger a refresh, swapping in a new random person — that's the new behavior, proving the child's `delete` output is reaching `Home`'s `handleRefresh()`.
- Open the Elements/Inspector panel in devtools: you should see a `<sfeir-card>` custom element wrapping the card's DOM, where before it was a bare `<mat-card>` sitting directly under `<section>`.
- No console errors about an unknown `person` property or a missing `sfeir-card` element.

## 🛠️ Troubleshooting

- **`NG0304: 'sfeir-card' is not a known element`**: `Home` is missing `Card` in its component `imports` array, or the import path is wrong — double-check you're importing from `@sfeir/ui/card`, not a relative path into `libs/`.
- **`NG8002`/compiler error about `person` not being a known property of `sfeir-card`**: `Card` doesn't declare `person` as an `input()` yet, or you bound it with the wrong name in `home.html` (`[person]="..."` must match the input's exact name).
- **Card renders with a blank photo/name and a runtime error about a required input**: `input.required<Person>()` throws at runtime if no value is bound — check that `home.html` actually binds `[person]="person()"` on `<sfeir-card>`, not just `person()` without brackets.
- **Clicking "Delete" does nothing**: check two links in the chain — inside `card.html`, the delete link needs a `(click)` binding calling your handler method with the person's `id`; inside that handler, you need to call `.emit(id)` on the `delete` output.
- **Clicking "Delete" throws or does nothing, but the refresh FAB still works**: confirm `home.html` binds the output with `(delete)="handleRefresh()"` on `<sfeir-card>` — parentheses mean event binding, same syntax as any native DOM event, just with the output's declared name instead of `click`.
- **Card is completely unstyled (no card shadow, cramped layout)**: you moved the markup to `card.html` but not the matching rules to `card.scss` — Angular component styles are scoped to their own component, so CSS left behind in `home.scss` won't reach `libs/ui/card`.
- **`nx build 05-input-output` fails referencing `@sfeir/ui`**: this app depends on the `ui` library at build time — an error inside `libs/ui/card` (a bad import, a typo in the input/output declaration) will surface here even though you ran `nx serve`/`nx test` on the app only.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 05-input-output` explicitly.

## 🙈 Stuck?

Try to extract the card and wire the input/output yourself first — that's the whole point of the exercise. If you're genuinely stuck, `apps/05-input-output-solution` (app side) and `libs/ui-solution/card` (library side) together form a complete, working version — including `home.spec.ts` and `card.spec.ts` test suites that document the exact expected behavior — that you can compare your code against. Use them to check your approach once you've made a real attempt, not as a starting point to copy from.
