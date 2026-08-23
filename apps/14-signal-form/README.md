# 14 — Signal Forms

You've now built the "Add / Edit person" form twice: once with **template-driven forms** (`12-template-form`) and once with **Reactive Forms** (`13-reactive-form`). In this exercise you build it a third time, with Angular's newest forms API — **Signal Forms** (`@angular/forms/signals`). Instead of a `FormGroup`/`FormControl` tree living next to your data, the form _is_ derived directly from a plain `WritableSignal` holding your data model, and validation rules are declared once in a schema function instead of being attached control-by-control. You'll rebuild the `SignalForm` component that lives inside the Staff Directory's "add/edit person" Material dialog, this time backed by `form()`.

Signal Forms are Angular's newest forms API, built from the ground up around signals rather than adapted to them. It's worth understanding **why** it works this way and where it differs from what you already know from Reactive Forms — that's what makes this exercise valuable, not just "another form to fill in".

## 🎯 Learning objectives

- Creating a form with `form()` from `@angular/forms/signals`, driven by a plain `WritableSignal<TModel>` instead of a `FormGroup`
- Declaring validation logic in a **path-based schema function**: the callback Angular calls with a `path` proxy that mirrors your model's shape (`path.firstname`, `path.email`, ...), instead of attaching validators to individual controls
- Reusing the same validation rules across fields with a standalone `schema<T>()` and `apply(path, schema)`, instead of duplicating validator arrays
- Using the built-in field validators — `required()`, `minLength()`, `pattern()` — and writing a **custom validator** with `validate()` and a `FieldContext`
- Reading a field's reactive state through the `FieldTree` it produces: `field().value()`, `field().touched()`, `field().invalid()`, `field().errors()`
- Binding a `<form>` to the whole `FieldTree` with the `[formRoot]` directive (`FormRoot`), and binding individual inputs with `[formField]` (`FormField`) — no more `formControlName`/`ngModel`
- Wiring **form submission** through the form's own `submission.action` option instead of a template `(ngSubmit)` handler, and letting `FormRoot` trigger it automatically on the native `submit` event
- Communicating outcomes to the parent dialog with the `output()` function, same contract (`submitForm` / `cancelForm`) as the previous two exercises — so you can compare how three different forms APIs solve the exact same problem

## 📁 What you're working with

The application shell (`apps/14-signal-form/src/app/...`) is already complete — routes, the Staff Directory list/table, the dialog host, the mock data provider — nothing to change there. The entire exercise lives in the shared library that the dialog imports:

```
libs/ui/signal-form/
├── signal-form.ts     ← STUB: component only declares metadata, no form, no outputs
├── signal-form.html   ← STUB: plain static markup, no Signal Forms bindings, no validation feedback
├── signal-form.scss   ← complete, nothing to do
├── index.ts           ← complete, nothing to do
└── person-form.ts      ← DOES NOT EXIST YET, you create it
```

This component is consumed as `<sfeir-signal-form>` by `apps/14-signal-form/src/app/feature/staff-directory/dialog-person/dialog-person.html`, which listens to two of its outputs to close the Material dialog:

```html
<sfeir-signal-form (submitForm)="closeDialog($event)" (cancelForm)="closeDialog()" />
```

That template already expects a `submitForm` output (carrying an `UpsertPersonBody`, from `@sfeir/types`) and a `cancelForm` output (no payload) — those exact names must exist on your component for the dialog to keep working.

## 📝 Your tasks

### 1. Create `libs/ui/signal-form/person-form.ts`

Write a small factory function that builds the `FieldTree` for a person, given a model signal and a submit callback. It needs:

- A model signal typed `WritableSignal<UpsertPersonBody>` (created in the component, task 3, and passed in) — this function doesn't own the signal, it just wraps `form()` around it.
- A call to `form(model, path => { ... }, options)` from `@angular/forms/signals`. Inside the schema callback, declare validation per field using `path.<fieldName>`:
  - `firstname` / `lastname`: required, plus a minimum length. Since both fields share the exact same two rules, factor them into a reusable `schema<string>(path => { ... })` and attach it to each field with `apply(path.firstname, thatSchema)` / `apply(path.lastname, thatSchema)`, instead of repeating `required(...)`/`minLength(...)` twice.
  - `email`: required, plus a **custom validator** enforcing the company's specific email address shape (see task 2).
  - `phone`: required, plus `pattern(...)` enforcing a 10-digit number.
- A `submission` option (the third argument to `form()`, a `FormOptions<TModel>`) whose `action` is an async function receiving the submitted `FieldTree` and forwarding it to the callback you were given.

Look at `@angular/forms/signals`' `form`, `schema`, `apply`, `required`, `minLength`, `pattern` and `FormOptions` exports for the exact signatures — every validator function takes a `path` (or `SchemaPath`) as its first argument and an optional config object where you can set a `message`.

### 2. Write a custom email validator

Still in `person-form.ts`, write a standalone function matching Signal Forms' validator shape: `(field: FieldContext<string>) => ValidationError | null` (or `null` when valid). It must:

- Return `null` immediately if the field has no value yet (empty values are `required()`'s job, not this validator's) — read the current value off the `FieldContext` via `field.value()`.
- Test the value against the company's expected email shape (`firstname.lastname@<company-domain>`, same shape used in `13-reactive-form`) and return a validation error object with a distinct `kind` (e.g. something like `{ kind: 'sfeirEmail', message: '...' }`) when it doesn't match.

Attach this function to the `email` path with `validate(path.email, yourValidatorFn)`, alongside `required(path.email, ...)`.

### 3. Complete `libs/ui/signal-form/signal-form.ts`

The current stub only has metadata and no class body. You need to:

- Add a private `signal<UpsertPersonBody>(...)` holding the initial model (empty strings for the text fields, a default avatar URL for `photo` — same placeholder used elsewhere in this app).
- Build the form by calling your `person-form.ts` factory with that model signal and a callback that emits the submitted value through the component's `submitForm` output.
- Add two typed outputs with the `output()` function from `@angular/core`:
  - one named `cancelForm`, with no payload (`output<void>()`),
  - one named `submitForm`, typed `output<UpsertPersonBody>()` (import `UpsertPersonBody` from `@sfeir/types`).
- Add a `cancel()` method that emits `cancelForm`.
- Swap the component's `imports` to include `FormField` and `FormRoot` from `@angular/forms/signals` (in place of `FormsModule`), and use the `MatButtonModule` / `MatFormFieldModule` / `MatInputModule` NgModules (in place of the individual standalone directives currently imported).

Keep the two output names exactly as `submitForm` / `cancelForm` — `dialog-person.html` already binds to those.

### 4. Complete `libs/ui/signal-form/signal-form.html`

The current markup is a static, unbound form. You need to:

- Bind the `<form>` element to your `FieldTree` via the `[formRoot]` directive — no `(ngSubmit)` handler needed, `FormRoot` listens for the native `submit` event itself and triggers your form's `submission.action`.
- Bind the photo `<img>`'s `ngSrc` to the photo field's current value (read through the `FieldTree`, e.g. `yourForm.photo().value()`), and connect the hidden photo `<input>` to its field with `[formField]`.
- For each of the 4 visible fields (first name, last name, email, phone), connect the `<input>` to its field with `[formField]`.
- Add a `<mat-error>` inside each `<mat-form-field>` that shows a message when the field is both touched and invalid — read those states off the field (`touched()`, `invalid()`) and surface the first error's `message` from `errors()`.
- Disable the submit button with a property binding driven by the whole form's validity (the root `FieldTree`, called as a function, exposes `invalid()`).
- Wire the cancel button's `(click)` to the component's `cancel()` method.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 14-signal-form
```

This also starts the `server-rest` mock API the app depends on (`apps/14-signal-form/src/environments/environment.ts` points to `http://localhost:9000/api`) — let it run, don't stop it separately. The app itself serves on the Angular CLI dev server default port. Note that `14-signal-form` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

Other useful targets for this project:

```bash
nx build 14-signal-form   # production build
nx lint 14-signal-form    # lint
nx test 14-signal-form    # test
```

The `libs/ui` library (which hosts `signal-form`) has its own inferred `test`/`lint` targets too:

```bash
nx test ui   # run the library's unit tests
nx lint ui   # lint the library
```

## ✅ How to know it's working

- Run the app, open the Staff Directory feature, and click the action that opens the "add/edit person" dialog — it hosts your `SignalForm`.
- On first open, the photo preview shows the default avatar and every text field is empty.
- Touching a required field and leaving it empty, typing a first/last name shorter than the minimum length, typing an invalid-shaped email, or typing a phone number that isn't exactly 10 digits should each surface their own distinct error message under the corresponding field — but only once you've interacted with that field (errors shouldn't appear before you've touched anything).
- The "Save" button stays disabled as long as the form is invalid, and becomes enabled once every field passes validation.
- Clicking "Cancel" closes the dialog without submitting anything.
- Clicking "Save" while the form is valid closes the dialog and (per the existing `dialog-person`/`staff-directory` wiring) applies the change.

## 🛠️ Troubleshooting

- **Nothing happens on submit, or the browser does a full page reload** — you likely forgot `[formRoot]` on the `<form>` element; without it, the native `submit` event isn't intercepted and no `submission.action` runs.
- **"Can't bind to 'formField' since it isn't a known property of 'input'"** — `FormField` is missing from the component's `imports` array (or you're still importing the old `FormsModule`/individual Material directives instead of the `Mat*Module`s).
- **Errors show up before you've touched anything** — check your `@if` condition includes `touched()`, not just `invalid()`; Signal Forms tracks touched state separately, and showing errors immediately is a worse UX than in the two previous exercises where this wasn't emphasized.
- **`path.firstname` / `path.email` etc. don't exist on `path`** — the schema callback's `path` parameter is typed from the model signal you pass to `form()`; double-check your `WritableSignal<UpsertPersonBody>` actually has all five keys (`firstname`, `lastname`, `email`, `phone`, `photo`) before writing the schema.
- **Custom email validator throws or always returns an error** — make sure you read the value with `field.value()` (a function call, since `FieldContext` exposes signals) and return `null` early when it's empty, letting `required()` own the "empty" case.
- **Unknown element `sfeir-signal-form` in the dialog** — you renamed the component class or its `selector`; keep the selector as `sfeir-signal-form` since `dialog-person.html` references it directly.
- **Dialog never closes / nothing happens after Save** — the outputs must be named exactly `submitForm` and `cancelForm`; `dialog-person.html` binds to those specific names.
- **Save button never becomes enabled even with valid data** — you're likely reading `invalid()` off the wrong node; the button should read the root `FieldTree`'s own `invalid()`, not one specific field's.
- **Default avatar image doesn't load** — the placeholder photo comes from an external service (`randomuser.me`); if you're offline the broken image icon is expected and unrelated to your code.
- **Import errors from `@sfeir/ui/signal-form`** — always import through that path alias (per the workspace's TypeScript path mapping), never with a relative path into `libs/`.

## 🙈 Stuck?

Try to get the form fully working — the model signal, the schema-based validation, the custom validator, and the template bindings — on your own first. Signal Forms is genuinely new territory even if you're comfortable with Reactive Forms, so expect to reach for the [Angular docs](https://angular.dev) on `@angular/forms/signals` along the way — that's expected, not a sign you're behind. If you're really stuck, `apps/14-signal-form-solution` (backed by `libs/ui-solution/signal-form`) has a working reference implementation. Use it to compare your approach once you have something working, not as a shortcut to copy from.
