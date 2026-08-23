# 13 — Reactive Forms

In the previous step you built the "Add / Edit person" dialog with a **template-driven** form (`FormsModule` + `ngModel`). In this exercise you migrate that same form to Angular's **Reactive Forms** API: the form's shape, values and validation rules move out of the template and into TypeScript, as a typed, testable model. You'll rebuild the `ReactiveForm` component that lives inside the Staff Directory's "add/edit person" Material dialog, this time backed by a `FormGroup`.

## 🎯 Learning objectives

- Building a typed `FormGroup<T>` by extending `FormGroup` in a dedicated class, instead of an inline object literal.
- Declaring `FormControl`s with `nonNullable: true` and initial values.
- Applying built-in validators (`Validators.required`, `Validators.minLength`, `Validators.pattern`) per control.
- Writing a **custom synchronous validator function** (`ValidatorFn`) that returns a specific error key, and guarding it so it only runs against a `FormControl` (using `isFormControl`).
- Wiring a template to a `FormGroup` with the `formGroup` and `formControlName` directives, and reacting to submission with `ngSubmit`.
- Reading a form's current value in a type-safe way with `getRawValue()`.
- Surfacing field-specific validation feedback with `mat-error` and the `@if` control-flow syntax, based on each control's `errors` object.
- Communicating outcomes to a parent (the dialog host) with the `output()` function, keeping the form component itself dialog-agnostic.

## 📁 What you're working with

The application shell (`apps/13-reactive-form/src/app/...`) is already complete — routes, the Staff Directory list/table, the dialog host, the mock data provider — nothing to change there. The entire exercise lives in the shared library that the dialog imports:

```
libs/ui/reactive-form/
├── reactive-form.ts     ← STUB: component only declares metadata, no logic, no form instance
├── reactive-form.html   ← STUB: plain static markup, no Reactive Forms bindings, no validation feedback
├── reactive-form.scss   ← complete, nothing to do
├── index.ts             ← complete, nothing to do
└── person-form.ts        ← DOES NOT EXIST YET, you create it
```

This component is consumed as `<sfeir-reactive-form>` by `apps/13-reactive-form/src/app/feature/staff-directory/dialog-person/dialog-person.html`, which listens to two of its outputs to close the Material dialog:

```html
<sfeir-reactive-form (submitForm)="closeDialog($event)" (cancelForm)="closeDialog()" />
```

That template already expects a `submitForm` output (carrying an `UpsertPersonBody`, from `@sfeir/types`) and a `cancelForm` output (no payload) — those exact names must exist on your component for the dialog to keep working.

## 📝 Your tasks

### 1. Create `libs/ui/reactive-form/person-form.ts`

Create a class that **extends Angular's `FormGroup`**, strongly typed to describe the person being created/edited. It needs:

- A `Controls` type (or interface) with five keys, each a `FormControl<string>`: `firstname`, `lastname`, `photo`, `email`, `phone`.
- A constructor that calls `super({...})` building one `FormControl` per key. Every control should be created with `{ nonNullable: true }` and a sensible initial value (an empty string for the text fields, an initial default avatar URL for `photo`).
- Attach validators per control:
  - `firstname` / `lastname`: required, plus a minimum length.
  - `photo`: no validators needed — the initial value is enough.
  - `email`: required, plus a **custom validator** enforcing the company's specific email address shape (see task 2).
  - `phone`: required, plus a `Validators.pattern(...)` enforcing a 10-digit number.

Look at `@angular/forms`' `FormControl`, `FormGroup`, and `Validators` exports for the exact APIs.

### 2. Write a custom email validator

Still in `person-form.ts`, write a standalone function matching Angular's `ValidatorFn` signature: `(control: AbstractControl) => ValidationErrors | null`. It must:

- Return `null` immediately if the control has no value yet (empty values are `required`'s job, not this validator's).
- Only actually validate when applied to a `FormControl` — guard against running on a `FormGroup`/`FormArray` using the `isFormControl` type-guard exported by `@angular/forms`.
- Test the control's value against the company's expected email shape (`firstname.lastname@<company-domain>`, case-sensitive as used elsewhere in the app) and return a specific, non-generic error key (e.g. something like `{ sfeirEmail: true }`) when it doesn't match, or `null` when it does.

Pass this function alongside `Validators.required` in the `email` control's `validators` array.

### 3. Complete `libs/ui/reactive-form/reactive-form.ts`

The current stub only has metadata and no class body. You need to:

- Swap `FormsModule` out of `imports` for `ReactiveFormsModule`, and swap the individual Material directives (`MatButton`, `MatFormField`, `MatInput`, `MatLabel`) for their parent modules (`MatButtonModule`, `MatFormFieldModule`, `MatInputModule`).
- Instantiate your `PersonForm` (task 1) as a class field, so the template can bind to it.
- Add two typed outputs with the `output()` function from `@angular/core`:
  - one named `cancelForm`, with no payload (`output<void>()`),
  - one named `submitForm`, typed `output<UpsertPersonBody>()` (import `UpsertPersonBody` from `@sfeir/types`).
- Add a `submit(...)` method that accepts the form's raw value (typed as `UpsertPersonBody`) and emits it through `submitForm`.
- Add a `cancel()` method that just emits `cancelForm`.

Keep the two output names exactly as `submitForm` / `cancelForm` — `dialog-person.html` already binds to those.

### 4. Complete `libs/ui/reactive-form/reactive-form.html`

The current markup is a static, unbound form. You need to:

- Bind the `<form>` element to your `PersonForm` instance via the `formGroup` directive, and wire `ngSubmit` to call `submit(...)`, passing the form's current value obtained via `getRawValue()`.
- Bind the photo `<img>`'s `ngSrc` to the photo control's current value (instead of the hardcoded URL), and connect the hidden photo `<input>` to its control with `formControlName`.
- For each of the 4 visible fields (first name, last name, email, phone), connect the `<input>` to its control with `formControlName`, and add native validation attributes matching what you declared in `person-form.ts` (`required`, `minlength`, a `pattern` for the phone).
- Add a `<mat-error>` inside each `<mat-form-field>` that shows a **specific** message per error key, using `@if` blocks that check the control's `errors` object (e.g. `errors?.['required']`, `errors?.['minlength']`, your custom email error key, `errors?.['pattern']`) — one generic message for all errors is not enough.
- Disable the submit button with a property binding driven by the form's overall validity.
- Wire the cancel button's `(click)` to the component's `cancel()` method.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 13-reactive-form
```

This also starts the `server-rest` mock API the app depends on (`apps/13-reactive-form/src/environments/environment.ts` points to `http://localhost:9000/api`) — let it run, don't stop it separately. The app itself serves on the Angular CLI dev server default port.

Other useful targets for this project:

```bash
nx build 13-reactive-form   # production build
nx lint 13-reactive-form    # lint
nx test 13-reactive-form   # test
```

## ✅ How to know it's working

- Run the app, open the Staff Directory feature, and click the action that opens the "add/edit person" dialog — it hosts your `ReactiveForm`.
- On first open, the photo preview shows the default avatar and every text field is empty.
- Typing a first/last name shorter than the minimum length, leaving a required field empty, typing an invalid-shaped email, or typing a phone number that isn't exactly 10 digits should each surface their own distinct error message under the corresponding field.
- The "Save" button stays disabled as long as the form is invalid, and becomes enabled once every field passes validation.
- Clicking "Cancel" closes the dialog without submitting anything.
- Clicking "Save" while the form is valid closes the dialog and (per the existing `dialog-person`/`staff-directory` wiring) applies the change.

## 🛠️ Troubleshooting

- **`NG01001` "No value accessor" or a form that silently does nothing on submit** — you likely forgot `[formGroup]` on the `<form>` element or `formControlName` on an input; reactive form directives need both the group and the per-control binding to work together.
- **`ngSubmit` never fires / clicking Save does nothing** — check the submit button is `type="submit"` (it already is) and that `(ngSubmit)` is bound on the `<form>`, not on the button.
- **"Can't bind to 'formGroup' since it isn't a known property of 'form'"** — `ReactiveFormsModule` is missing from the component's `imports` array (or `FormsModule` wasn't removed and is conflicting).
- **Unknown element `sfeir-reactive-form` in the dialog** — you renamed the component class or its `selector`; keep the selector as `sfeir-reactive-form` since `dialog-person.html` references it directly.
- **Dialog never closes / nothing happens after Save** — the outputs must be named exactly `submitForm` and `cancelForm`; `dialog-person.html` binds to those specific names.
- **Custom email validator throws or misbehaves on the whole `FormGroup`** — make sure you guard with `isFormControl` before treating `control.value` as the email string; validators can technically be attached to groups too, and this one should only ever evaluate individual controls.
- **Error messages never disappear even after fixing the input** — double check you're reading `errors?.['key']` off the specific control (e.g. `email.errors`), not off the whole form, and that the validator returns `null` (not `undefined` or `false`) when the value is valid.
- **Default avatar image doesn't load** — the placeholder photo comes from an external service (`randomuser.me`); if you're offline the broken image icon is expected and unrelated to your code.
- **Import errors from `@sfeir/ui/reactive-form`** — always import through that path alias (per the workspace's TypeScript path mapping), never with a relative path into `libs/`.

## 🙈 Stuck?

Try to get the form fully working — typed `FormGroup`, validators, custom validator, and template bindings — on your own first. If you're really stuck, `apps/13-reactive-form-solution` (backed by `libs/ui-solution/reactive-form`) has a working reference implementation. Use it to compare your approach once you have something working, not as a shortcut to copy from.
