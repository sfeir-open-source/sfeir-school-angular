# 22 — Structural Directive

The "Add / Edit person" form (`sfeir-signal-form`, built with Signal Forms in an earlier exercise) already renders every field the same way: a `<sfeir-input>` bound to its slice of the form (`_form.firstname`, `_form.lastname`, ...). The phone field is no different today — just another `<sfeir-input>` next to the others. But a phone number is sensitive-ish data, and product wants it masked by default, with a little eye icon the user can click to reveal it in plain text, like a password field. You could hard-code that toggle button and the masking logic straight into `signal-form.html`, but that would only ever work for the phone field, in this one form. In this exercise you build it as a **custom structural directive** instead — a directive that can wrap _any_ field, take over how (and whether) it's revealed, and inject its own extra markup (the toggle button) around it, activated with nothing more than a `*` prefix on the element, the exact same mechanic Angular's own `*ngIf` and `*ngFor` are built on.

## 🎯 Learning objectives

- Writing a custom **structural directive** — an `@Directive` applied to a host element via the `*directiveName` syntax, the same desugaring mechanism behind `*ngIf`/`*ngFor`
- Injecting `TemplateRef` to capture the element (and everything inside it) that Angular turns into an `<ng-template>` when a directive is applied with a `*` prefix
- Injecting `ViewContainerRef` to control **if and how** that captured template actually gets rendered, instead of leaving that decision to Angular's default `@if`/`@for` control flow
- Rendering a captured `TemplateRef` from inside a directive by handing it off to a small component that outlets it (`NgTemplateOutlet` / `[ngTemplateOutlet]`), rather than the directive owning a template of its own
- Creating a component imperatively with `ViewContainerRef.createComponent()`, and wiring one of its inputs at creation time with `inputBinding()` — no host template, no `[ ]` binding syntax
- Passing data back **out** of the directive and into the caller's template through the outlet's **context object** (`{ $implicit: ... }`), read on the consuming side with `*sfeirSecret="let type"` — the same `let-x` mechanic used by `*ngFor="let item of items"`
- Composing extra UI (a visibility-toggle button) _around_ whatever markup the directive wraps, without the caller changing anything about that markup itself

## 📁 What you're working with

```
libs/ui/password/                                            ← TO REWORK: scaffolded stub, needs finishing
├── index.ts                                                  ← complete, already re-exports password.ts
├── password.ts                                               ← TO REWORK: empty `Secret` directive + empty `SecretContainer` component
└── ng-package.json                                           ← complete, create the secondary entry point exports
libs/ui/signal-form/
├── signal-form.ts                                            ← TO REWORK: import and register the new directive
├── signal-form.html                                          ← TO REWORK: apply the directive to the phone field
└── (everything else)                                         ← complete, nothing to do (Signal Forms wiring from earlier exercises)
```

Everything under `apps/22-structural-directive/src` is already complete — routing, the Staff Directory list, `DialogPerson` and `PersonDetails` (both of which host `<sfeir-signal-form>`), guards, interceptors, resolvers. Nothing to touch there; this exercise lives entirely inside the shared `libs/ui` library.

In `signal-form.html`, every field currently renders the same way:

```html
<sfeir-input [formField]="_form.<field>" [type]="'text'" [placeholder]="'...'" />
```

The phone field is one of those four lines, with no special treatment yet.

## 📝 Your tasks

### 1. Finish scaffolding `libs/ui/password/`

`libs/ui` is a single Nx library made of several secondary entry points (`card`, `list`, `loader`, ...), each its own folder with an `index.ts` and an `ng-package.json`. The `password` entry point already exists, half set up:

- `libs/ui/password/index.ts` already re-exports everything from `./password` — nothing to change there.
- `libs/ui/password/password.ts` already declares the two shells you'll build out in task 2: an empty `Secret` directive (already decorated `@Directive({ selector: '[sfeirSecret]' })`) and an empty `SecretContainer` component (already decorated `@Component(...)` with an empty template) — both classes exist, both bodies are blank.
- `libs/ui/password/ng-package.json` exists but is an **empty file (0 bytes)** — as it stands, Nx has no way to know this folder is a valid secondary entry point, so it won't build. Give it the same shape used by every other entry point in `libs/ui` (compare `libs/ui/reactive-form/ng-package.json` or `libs/ui/template-form/ng-package.json`): a JSON object with a `lib.entryFile` key pointing at `index.ts`.

Once `ng-package.json` has that content, `@sfeir/ui/password` resolves like every other entry point in the library — no changes needed in `tsconfig.base.json`.

### 2. `libs/ui/password/password.ts` — build the `Secret` structural directive

The `Secret` directive already exists as an empty shell — `@Directive({ selector: '[sfeirSecret]' })` exported as `Secret`, ready to be used as `*sfeirSecret` — and so does the `SecretContainer` component it will delegate to, currently just an empty template. Your job is to fill in both bodies. Structural directives are just directives applied to an implicit `<ng-template>` — Angular desugars `*sfeirSecret="let type"` into an `<ng-template sfeirSecret let-type>` wrapping the element it was on. That means the directive never sees the host element directly; it only ever gets the _template_ for it. To make something render from that:

- Inject `TemplateRef` (typed to the context object you plan to expose — see below) to capture what the caller wrote.
- Inject `ViewContainerRef` — this is your handle for actually inserting something into the DOM at the directive's location. A structural directive that does nothing with its `ViewContainerRef` renders nothing at all, same as `*ngIf` with a false condition.
- Since you also need to render your own extra markup (the toggle button) _around_ the projected template, and a directive has no template of its own, delegate that rendering to the already-stubbed `SecretContainer` component. Have the directive create it with `viewContainer.createComponent(SecretContainer, { bindings: [...] })`, using `inputBinding('someInputName', () => someValue)` to feed that component the captured `TemplateRef` imperatively (`createComponent` has no `[ ]` template syntax to bind through) — this means `SecretContainer` needs an `input()` to receive it.
- `SecretContainer`'s own template (currently empty) is where the projected content actually gets rendered — with an `<ng-template [ngTemplateOutlet]="..." [ngTemplateOutletContext]="...">`, importing `NgTemplateOutlet` from `@angular/common`. Give the component a signal that tracks whether the value is currently revealed or masked, a button (Angular Material's icon button + `mat-icon` fit the rest of the app's style) that toggles it, and pass the current mode out through the outlet's context object as the **implicit** value — that's what `let type` on the caller's side reads.
- Design the exposed value so the caller can bind it straight to a native `type` attribute (i.e. two states, one for "masked", one for "revealed").

### 3. `libs/ui/signal-form/signal-form.ts` — register the directive

Import `Secret` from `@sfeir/ui/password` and add it to the component's `imports` array so `*sfeirSecret` is recognized on `<sfeir-input>` in the template.

### 4. `libs/ui/signal-form/signal-form.html` — apply it to the phone field

On the phone field's `<sfeir-input>`, add `*sfeirSecret="let type"` and bind the field's `[type]` input to that `type` template variable instead of the hard-coded `'text'` it (and every other field) currently uses. Everything else about that line — `[formField]="_form.phone"`, the placeholder — stays as it is.

## ▶️ How to run the application

From the workspace root:

```bash
npm run serve -- 22-structural-directive
```

(equivalent to `npx nx serve 22-structural-directive`). This also starts the `server-rest` mock API the app depends on (`environments/environment.ts` points to `http://localhost:9000/api`) — leave it running, no need to start it separately. `22-structural-directive` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

```bash
npm run build -- 22-structural-directive   # production build
npm run lint -- ui                          # lint the shared library you're editing
```

## ✅ How to know it's working

- Opening "Add person" (or editing an existing one) still renders all four fields exactly as before, but the phone field now shows a toggle icon inside it.
- The phone value renders masked (like a password field) by default; clicking the toggle switches it to plain text and back, without affecting `firstname`/`lastname`/`email`.
- Typing in the phone field, submitting, and cancelling the form all still work exactly as before — the directive only changes how the field is _displayed_, not how it's bound to the form.
- Removing `*sfeirSecret="let type"` from the phone field (temporarily, to check your understanding) makes it fall back to rendering like any other plain field — nothing about `_form.phone` itself changed.
- `libs/ui/password/password.ts` exports a directive, not a component with a `selector` you'd write as an element — it's only ever used with a `*` prefix, never as `<sfeir-secret>`.

## 🛠️ Troubleshooting

- **"'sfeirSecret' is not a known attribute" / nothing renders around the phone field at all** — check that `Secret` is actually added to `signal-form.ts`'s `imports` array; a directive being exported from its own file isn't enough, the consuming component's `imports` needs it too.
- **The phone field disappears entirely** — a structural directive that injects `ViewContainerRef` but never calls anything on it renders nothing, exactly like `*ngIf` with no true branch; make sure your directive actually creates something into the view container.
- **TypeScript complains that `TemplateRef` and the context object don't match** — the type you inject `TemplateRef` as (e.g. `TemplateRef<{ $implicit: SomeType }>`) needs to agree with the shape of the context object you later pass to `[ngTemplateOutletContext]`; `let type` always reads the outlet context's _implicit_ value specifically, not a custom key.
- **`createComponent(...)` throws or the toggle button never appears** — `inputBinding()` binds one named input by matching its string name to an `input()`/`@Input()` declared on the target component; a typo in that name fails silently or throws depending on the case, so double-check it matches exactly.
- **The toggle works but `[type]` on `<sfeir-input>` doesn't change** — confirm the value read from the outlet's context is actually flowing into `let type` (no typo on either side), and that `[type]="type"` on `<sfeir-input>` references that same template variable, not the string literal the other fields still use.
- **Everything else in the form (firstname, lastname, email) breaks after your change** — you likely edited something outside the phone field's line in `signal-form.html`; the directive should be additive, only touching the one line it's applied to.

## 🙈 Stuck?

Try building the directive and wiring it into `signal-form` on your own first — reasoning through how a structural directive only ever sees a `TemplateRef`, and how it has to actively decide to render (and can inject its own markup around) that template via `ViewContainerRef`, is the actual point of this exercise; it's a very different mental model from writing an ordinary component. If you want a reference, `apps/22-structural-directive-solution` (and its `libs/ui-solution/password`) has a working implementation. Use it to check your approach once your own version works, not as a shortcut to copy from.
