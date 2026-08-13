# 03 — Bindings

In this exercise you'll turn the `Home` feature component from a static placeholder into a real profile card, driven by data instead of hardcoded text. You'll connect a component's state to its template using Angular's binding syntaxes: interpolation, property binding, and attribute interpolation — the same techniques you'll use anywhere a template needs to reflect what's happening in your class.

## 🎯 Learning objectives

- Exposing component state with `signal()` and reading it in a template
- Interpolation (`{{ }}`) of expressions, including calling a signal (`_person()`) rather than just referencing a plain field
- Interpolating expressions **inside HTML attribute values** (e.g. building a `mailto:`/`tel:` link or a `title` attribute from several fields)
- Property binding with `[ngSrc]` (Angular's `NgOptimizedImage` directive) to bind an image source dynamically
- Registering the Angular Material modules a template needs (`MatIconModule`, `MatButtonModule`) in a standalone component's `imports` array
- Importing and consuming shared, strongly-typed mock data from a workspace library (`@sfeir/types`)

## 📁 What you're working with

```
apps/03-bindings/
└── src/app/
    ├── app.ts / app.html / app.scss / app.config.ts   ✅ complete — the app shell/toolbar, nothing to do here
    └── feature/home/
        ├── home.ts       🚧 to do — currently exposes a hardcoded string, needs to expose a typed person via a signal
        ├── home.html     🚧 to do — currently a one-line stub, needs the full profile card markup with bindings
        └── home.scss     🚧 to do — currently a 4-line stub, needs the card's layout/styling rules
```

Two extra files sit outside `src/`, at `apps/03-bindings/static/home.html` and `apps/03-bindings/static/home.scss`. They are **not wired into the app** (no component points its `templateUrl`/`styleUrl` at them), so they will never render when you run the app — don't panic if you don't see their contents on screen. They exist purely as reference:

- `static/home.scss` is the exact stylesheet the final card needs — you're free to copy it straight into `src/app/feature/home/home.scss`.
- `static/home.html` shows you the target DOM structure, but every value in it is **hardcoded** (a literal name, a literal email, an empty `[ngSrc]=""`, etc.). Copying it as-is would give you working HTML with no bindings at all, which defeats the point of the exercise — use it as a structural/visual reference, then replace the hardcoded values with bindings to your component's state.

## 📝 Your tasks

### 1. `home.ts` — expose a person as a signal

Replace the `_name` string field with a signal that holds a `Person`.

- The `@sfeir/types` library exports a `Person` type and a `PEOPLE_MOCK` array of sample people. Import both.
- Create a `signal<Person>(...)` initialized with the first entry of `PEOPLE_MOCK`, and expose it as a `protected readonly` class member (keep the underscore-prefixed naming convention already used in the file).
- The template you're about to build uses `<mat-icon>` and Material buttons (`mat-button`), plus Angular's `NgOptimizedImage` directive for the photo — make sure the component's `imports` array includes the Material modules and directive these require, alongside the `MatCardModule` that's already there.

### 2. `home.html` — build the profile card with bindings

Replace the one-line stub with a card that displays the person's photo, name, entity/team, email, phone, and manager, plus a row of action links (locate / edit / delete). Use `static/home.html` as your structural reference, but drive every dynamic piece from your component's signal instead of hardcoding it:

- The photo: bind it with `[ngSrc]` (not a plain `src`) to the person's photo URL. `NgOptimizedImage` requires explicit `height`/`width` attributes.
- The name, entity, email, phone, and manager: interpolate them from the signal — remember a signal is a function, so you read its value by calling it (e.g. `_person().firstname`), not just referencing it.
- The email and phone links: build the `href` (`mailto:...`, `tel:...`) and any `title` attributes by interpolating values **inside the attribute string**, not just as the element's visible text.
- The "Locate" and "Edit" action links: build their `href` from the person's `id`, the same interpolation-in-attribute technique.

Refer to `home.spec.ts` in the solution folder's test file naming (or think about what a test would check) for the exact structure expected: one `mat-card`, one `mat-card-title` with the full name, three `mat-card-subtitle` elements (entity, then email, then phone, in that order), and two `div.contact-info` elements (manager first).

### 3. `home.scss` — style the card

The 4-line stub only centers text and adds padding. Build out the full layout: card sizing/spacing, the contact info rows, the action buttons row, and text truncation for long values. You can copy `static/home.scss` directly — the styling itself isn't the point of this exercise, the bindings are.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly:

```bash
npx nx serve 03-bindings      # dev server → http://localhost:4200
npx nx test 03-bindings       # run unit tests with vitest
npx nx lint 03-bindings       # lint with eslint
npx nx build 03-bindings      # production build
```

Note: this exercise ships with no `*.spec.ts` files, and the test runner is configured with `passWithNoTests: true`, so `nx test 03-bindings` will report success even though it isn't checking anything yet. Don't take a green `test` run as proof your implementation is correct — verify visually in the browser.

## ✅ How to know it's working

Serve the app and open it in the browser. You should see, inside the toolbar shell:

- A single Material card showing a person's photo, full name, and team/entity
- An email row with a mail icon and a working `mailto:` link showing the person's address
- A phone row with a phone icon and a working `tel:` link showing the person's number
- A "Manager" line naming their manager, and a "Location" line linking to SFEIR's contact page
- Three action icons (map, edit, delete) at the bottom of the card

If you swapped `PEOPLE_MOCK[0]` for a different array index, the card should update accordingly — that's a quick way to confirm your bindings are live off the signal rather than accidentally hardcoded.

## 🛠️ Troubleshooting

- **`NG0304: 'mat-icon' is not a known element` (or similar for `mat-button`)**: you used a Material component/directive in the template without adding its module to the `imports` array in `home.ts`.
- **Image doesn't load / console warning about `NgOptimizedImage`**: check that you used `[ngSrc]` (property binding) and not a plain `src` attribute, and that `NgOptimizedImage` is imported both from `@angular/common` and listed in the component's `imports`.
- **`mailto:`/`tel:` links or the card title show literally `{{ _person().email }}` instead of the value**: you're inside an attribute string — make sure you're using `{{ }}` interpolation there, not a `[ ]` property binding, since these are composed strings (`mailto:` + email), not the raw attribute value.
- **`TS2339: Property '...' does not exist on type '() => Person'`** (or similar): you referenced the signal without calling it, e.g. `_person.email` instead of `_person().email`.
- **Nothing renders / blank page**: check the browser console first — a template error (unknown element, broken binding) will usually stop rendering entirely; this is unrelated to the unused `static/` folder, which the app never loads.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 03-bindings` explicitly.

## 🙈 Stuck?

Try to get the card fully working with your own bindings first — that's the whole point of the exercise. If you're genuinely stuck, `apps/03-bindings-solution` has a complete, working version you can compare your code against. Use it to check your approach once you've made a real attempt, not as a starting point to copy from.
