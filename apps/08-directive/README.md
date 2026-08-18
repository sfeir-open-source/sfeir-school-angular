# 08 — Directive

Up to now, `sfeir-card` has only ever displayed data. In this exercise you'll teach it to *react to the DOM directly*: some people in `PEOPLE_MOCK` are managers (`isManager: true`), and a manager's name should be marked with a small crown icon next to it. Rather than baking that icon into the card's own template with an `@if`, you'll build a reusable **attribute directive**, `King`, living in its own shared library entry point (`@sfeir/ui/king`), and attach it to a plain `<span>` in the card. This is your first hands-on encounter with directives — the third and least visible of Angular's three building blocks (component, directive, pipe), the one that adds behavior to an existing element instead of creating new DOM.

## 🎯 Learning objectives

- Understanding what a directive is: a class that attaches **behavior** to an existing DOM element, as opposed to a component (which owns its own template) or a pipe (which transforms a value in an expression)
- Writing a standalone **attribute directive** with the `@Directive({ selector: '[attributeName]' })` decorator — the square-bracket selector matching an HTML attribute rather than an element or class
- Declaring a signal input **aliased** to the directive's own selector, so the same name doubles as both the attribute a template binds to and the directive's input property (`input.required({ alias: '...' })`)
- Using an input **transform** (`booleanAttribute`) to normalize whatever gets bound into a real boolean, the same way Angular does for many of its own boolean `@Input`s
- Injecting `ElementRef` to get a handle on the host element the directive is attached to, and `Renderer2` to mutate it — the platform-agnostic, safe way to touch the DOM instead of reaching for `nativeElement` directly
- Using `effect()` inside a directive's constructor to re-run DOM-writing logic automatically whenever a signal input changes, without a lifecycle hook or manual subscription
- Registering a directive on a component exactly like a component or pipe — by adding it to the host component's `imports` array, no `NgModule` involved
- Applying a directive to a plain `<span>` — a directive doesn't need a component behind it; it can enhance any native element

## 📁 What you're working with

This exercise spans the app (`apps/08-directive`) and the shared UI library (`libs/ui`). It assumes `libs/ui/card` and `libs/ui/na` are already in the state you left them at the end of `07-provider` (full profile card markup, `DatePipe` on the birth date, the `na` pipe on the manager field) — this exercise only adds the crown, it doesn't touch anything else on the card.

```
apps/08-directive/
└── src/app/
    ├── app.ts / app.html / app.scss / app.config.ts        ✅ complete — nothing to do here
    ├── core/provider/people.ts + people.spec.ts             ✅ complete — same injectable People service as 07
    └── feature/home/
        ├── home.ts    ✅ complete — same person signal + handleRefresh(), using <sfeir-card>
        ├── home.html  ✅ complete — renders <sfeir-card [person]="person()" (delete)="handleRefresh()" />
        └── home.scss  ✅ complete — nothing to do here

libs/ui/
├── king/
│   ├── king.ts           🚧 to do — currently a plain function returning a string, not a directive yet
│   ├── index.ts           ✅ complete — already re-exports whatever `king.ts` exports
│   └── ng-package.json    ✅ complete — declares this folder as a secondary entry point
└── card/
    └── card.html          🚧 to do — needs one new binding, next to the person's name
```

`libs/ui/king/king.ts` already contains the raw HTML snippet for the crown icon (a Material icon markup string) — your job isn't to invent that markup, it's to turn the surrounding code into a real directive that uses it.

## 📝 Your tasks

### 1. `libs/ui/king/king.ts` — turn this into the `King` directive

- Import `Directive`, `ElementRef`, `Renderer2`, `booleanAttribute`, `effect`, `inject`, and `input` from `@angular/core`.
- Declare a class named `King`, decorated with `@Directive({ selector: '[sfeirKing]' })`. The selector uses the attribute-binding syntax (square brackets) — this directive attaches to any element carrying a `sfeirKing` attribute, it doesn't render its own template.
- Inject `ElementRef<HTMLSpanElement>` and `Renderer2` into `private readonly` fields with `inject()`, following the same convention used for injected dependencies elsewhere in this workspace (e.g. `People` in `07-provider`).
- Declare a `public readonly` **required** signal input whose **alias** is `'sfeirKing'` — this is what makes `[sfeirKing]="someExpression"` in a template bind straight into this input, even though the class property itself can be named something more descriptive (like `isManager`). Give it a `transform` of `booleanAttribute` so whatever value comes in (a real boolean, or the mere presence of the attribute) is normalized to a strict `boolean`.
- In the constructor, call `effect(() => { ... })`. Inside, read the input signal and use the injected `Renderer2` to update the host element (available via the injected `ElementRef`'s `nativeElement`) — when the value is `true`, inject the crown markup already defined at the top of the file into the element; when `false`, clear it out. `Renderer2` has a method for setting a DOM property directly, which is the safe way to write `innerHTML`-like content without bypassing Angular's rendering abstraction.
- Keep the existing `KING_HTML` constant at the top of the file as-is — it's the crown markup your directive will inject, you don't need to change it.

`libs/ui/king/index.ts` already does `export * from './king'`, so once `King` is exported from `king.ts`, it's automatically part of the library's public API (`@sfeir/ui/king`) — nothing to change there.

### 2. `libs/ui/card/card.ts` — register and use `King`

- Import `King` from `@sfeir/ui/king` (a workspace path, exactly like `Na` is imported from `@sfeir/ui/na`).
- Add `King` to `Card`'s `imports` array, alongside the other standalone imports already there.

### 3. `libs/ui/card/card.html` — attach the directive next to the person's name

- Inside the block that displays the person's first and last name, add an empty `<span>` right after the name.
- Bind the `sfeirKing` attribute on that `<span>` to whether the currently displayed person is a manager, reading from the `person` input's `isManager` field (`Person.isManager` is a `boolean` already on the model, nothing to compute).
- You're not writing any content inside the `<span>` yourself — the directive is entirely responsible for what ends up inside it, based on the value you bind.

## ▶️ How to run the application

This app is **not** the Nx default project, so always pass its name explicitly. The shared library has its own project name, `ui`, if you want to run its checks in isolation:

```bash
npx nx serve 08-directive   # dev server → http://localhost:4200
npx nx test 08-directive    # run the app's unit tests with vitest
npx nx lint 08-directive    # lint the app with eslint
npx nx build 08-directive   # production build (also builds the "ui" library it depends on)

npx nx test ui               # run the ui library's unit tests with vitest (covers card/, na/, king/)
npx nx lint ui               # lint the ui library with eslint
```

## ✅ How to know it's working

Serve the app and open it in the browser:

- The profile card renders exactly as it did at the end of `07-provider` — same photo, name, contact info, formatted birth date, and manager fallback message where relevant.
- For a person who **is** a manager, a small crown icon now appears right next to their name.
- For a person who is **not** a manager, no icon appears next to the name — nothing extra in the DOM, nothing empty-looking either.
- Click "refresh" a few times to cycle through different people: the crown should appear and disappear as you land on managers vs. non-managers, without a page reload — this is `effect()` reacting to the input signal changing on every new person.
- Open devtools' Elements panel: the `<span>` next to the name should have a `sfeirKing` attribute, and its inner content should change between empty and the crown's markup depending on the person.
- Open the console: no errors about an unknown attribute or a missing directive.

## 🛠️ Troubleshooting

- **The crown never appears, even for a manager**: check that `Card`'s `imports` array actually includes `King` — a directive that isn't imported on the component using it is silently ignored, no compiler error.
- **`NG8002`-style error about `sfeirKing` not being a known property**: same cause as above, or a typo in the selector — it must be exactly `[sfeirKing]` in the `@Directive` decorator to match `[sfeirKing]="..."` in the template.
- **Crown appears for everyone, managers or not**: your `effect()` is probably not branching on the input's actual value — double check you're reading the signal (calling it as a function) inside the effect, and that the "false" branch actually clears the element instead of leaving the previous content in place.
- **Crown doesn't update when you click refresh**: this usually means the directive read the input's value once outside of `effect()` (e.g. in a field initializer or constructor body, not inside the `effect()` callback) — `effect()` needs to read the signal *inside* its own callback to know it should re-run when the signal changes.
- **Runtime error mentioning `Renderer2` or `ElementRef` being `undefined`**: `inject()` only works synchronously in an injection context (a field initializer or the constructor body) — make sure both are injected as class fields, not lazily inside a method.
- **Compiler error about a required input with no value provided**: `input.required(...)` throws if `[sfeirKing]` isn't bound in the template — make sure the `<span>` in `card.html` has the binding, not just a bare attribute.
- **`nx build 08-directive` fails referencing `@sfeir/ui`**: this app depends on the `ui` library at build time — an error inside `libs/ui/king` (a bad import, a typo in the `@Directive` decorator) will surface here even though `nx serve`/`nx test` only targeted the app.
- **`nx serve` starts the wrong app**: the workspace's default project is `01-hands-on`, not this one — always run `nx serve 08-directive` explicitly.

## 🙈 Stuck?

Try writing the directive and wiring it into the card yourself first — that's the whole point of the exercise. If you're genuinely stuck, `apps/08-directive-solution` (app side) and `libs/ui-solution/king` / `libs/ui-solution/card` (library side) together form a complete, working version — including `card.spec.ts` and `home.spec.ts` test suites that document the exact expected behavior — that you can compare your code against. Use them to check your approach once you've made a real attempt, not as a starting point to copy from.
