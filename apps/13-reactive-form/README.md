# 13 — Reactive Forms

In the previous step you built the "Add / Edit person" dialog with a **template-driven** form (`FormsModule` + `ngModel`). In this exercise you migrate that same form to Angular's **Reactive Forms** API: the form's shape, values and validation rules move out of the template and into TypeScript, as a typed, testable model. You'll rebuild the `ReactiveForm` component that lives inside the Staff Directory's "add/edit person" Material dialog, this time backed by a `FormGroup`.

This exercise has **two parts**, done in order:

1. **Build the form itself** — the typed `PersonForm` (a `FormGroup` subclass), its validators, and a template wired field-by-field with plain Material `mat-form-field` blocks.
2. **Extract a reusable custom input** — once the form works, you'll notice every field repeats the same `mat-form-field` + `mat-error` markup. Reactive Forms lets any component become a form control by implementing `ControlValueAccessor`, so you'll build a `<sfeir-input>` component and swap the four repeated blocks for four one-line usages of it.

## 🎯 Learning objectives

**Part 1 — the form**

- Building a typed `FormGroup<T>` by extending `FormGroup` in a dedicated class, instead of an inline object literal.
- Declaring `FormControl`s with `nonNullable: true` and initial values.
- Applying built-in validators (`Validators.required`, `Validators.minLength`, `Validators.pattern`) per control.
- Writing a **custom synchronous validator function** (`ValidatorFn`) that returns a specific error key, and guarding it so it only runs against a `FormControl` (using `isFormControl`).
- Wiring a template to a `FormGroup` with the `formGroup` and `formControlName` directives, and reacting to submission with `ngSubmit`.
- Reading a form's current value in a type-safe way with `getRawValue()`.
- Surfacing field-specific validation feedback with `mat-error` and the `@if` control-flow syntax, based on each control's `errors` object.
- Communicating outcomes to a parent (the dialog host) with the `output()` function, keeping the form component itself dialog-agnostic.

**Part 2 — the custom input**

- Turning an ordinary component into a Reactive Forms control by implementing the `ControlValueAccessor` interface from `@angular/forms`.
- Registering that component as a value accessor with the `NG_VALUE_ACCESSOR` injection token (and `forwardRef`, since the provider is declared before the class exists at parse time).
- Understanding the four `ControlValueAccessor` lifecycle methods — `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState` — and what triggers each one.
- Wrapping an internal `FormControl` inside the custom component to drive its own `<input matInput>`, and forwarding that control's `valueChanges` back to the parent form through the callbacks registered by `registerOnChange`/`registerOnTouched`.
- Bridging validation state into Angular Material's `ErrorStateMatcher`, so a custom control gets the same red-outline/error styling as a built-in `matInput`, even though it's no longer directly wired to `NgControl`.
- Replacing four copy-pasted `mat-form-field` blocks with four declarative usages of a single reusable component, still driven by `formControlName` from the parent `FormGroup`.

## 📁 What you're working with

The application shell (`apps/13-reactive-form/src/app/...`) is already complete — routes, the Staff Directory list/table, the dialog host, the mock data provider — nothing to change there. The entire exercise lives in the shared library that the dialog imports:

```
libs/ui/reactive-form/
├── reactive-form.ts     ← STUB: component only declares metadata, no logic, no form instance
├── reactive-form.html   ← STUB: plain static markup, no Reactive Forms bindings, no validation feedback
├── reactive-form.scss   ← complete, nothing to do
├── index.ts             ← complete, nothing to do
├── person-form.ts        ← DOES NOT EXIST YET, you create it (Part 1)
└── custom-input/          ← DOES NOT EXIST YET, you create it (Part 2)
    ├── custom-input.ts
    ├── custom-input.html
    └── custom-input.scss
```

This component is consumed as `<sfeir-reactive-form>` by `apps/13-reactive-form/src/app/feature/staff-directory/dialog-person/dialog-person.html`, which listens to two of its outputs to close the Material dialog:

```html
<sfeir-reactive-form (submitForm)="closeDialog($event)" (cancelForm)="closeDialog()" />
```

That template already expects a `submitForm` output (carrying an `UpsertPersonBody`, from `@sfeir/types`) and a `cancelForm` output (no payload) — those exact names must exist on your component for the dialog to keep working.

---

## Part 1 — Building the form with Reactive Forms

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

The current markup is a static, unbound form. For this first pass, wire it up exactly as it stands (you'll refactor the repeated blocks away in Part 2):

- Bind the `<form>` element to your `PersonForm` instance via the `formGroup` directive, and wire `ngSubmit` to call `submit(...)`, passing the form's current value obtained via `getRawValue()`.
- Bind the photo `<img>`'s `ngSrc` to the photo control's current value (instead of the hardcoded URL), and connect the hidden photo `<input>` to its control with `formControlName`.
- For each of the 4 visible fields (first name, last name, email, phone), connect the `<input>` to its control with `formControlName`, and add native validation attributes matching what you declared in `person-form.ts` (`required`, `minlength`, a `pattern` for the phone).
- Add a `<mat-error>` inside each `<mat-form-field>` that shows a **specific** message per error key, using `@if` blocks that check the control's `errors` object (e.g. `errors?.['required']`, `errors?.['minlength']`, your custom email error key, `errors?.['pattern']`) — one generic message for all errors is not enough.
- Disable the submit button with a property binding driven by the form's overall validity.
- Wire the cancel button's `(click)` to the component's `cancel()` method.

At the end of Part 1 the form should be fully functional — validation, submission, cancel — just with four near-identical `mat-form-field` blocks in the template.

---

## Part 2 — Building the custom input

Look again at the 4 blocks you just wired in `reactive-form.html`: each one is a `<mat-form-field>` + `<mat-label>` + `<input matInput [formControlName]="..." />` + a `<mat-error>` that reads the same control's `errors` object. Reactive Forms doesn't require `formControlName` to target a native `<input>` — it can target **any component** that registers itself as a `ControlValueAccessor`. You'll build one such component, `<sfeir-input>`, and use it instead.

### 5. Create `libs/ui/reactive-form/custom-input/custom-input.ts`

Create a standalone component with selector `sfeir-input` that implements `ControlValueAccessor` from `@angular/forms`. Import it in `reactive-form.ts` — it doesn't need to be re-exported from the library's `index.ts`.

Look at the `ControlValueAccessor` interface to see the exact contract. The important points:

- Register the component as a value accessor by adding a `providers` array to the `@Component` decorator with `{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => YourClass), multi: true }`. `forwardRef` is required because the class doesn't exist yet at the point the decorator is evaluated.
- Implement the four `ControlValueAccessor` methods:
  - `writeValue(value: string): void` — called by Angular whenever the *outer* `FormControl` (the one bound via `formControlName` in the parent) pushes a new value down into your component. Use it to update your component's own internal state.
  - `registerOnChange(fn: (value: string) => void): void` — Angular hands you a callback here; call it (with the new value) whenever the user changes the input, so the change propagates back up into the parent's `FormControl`.
  - `registerOnTouched(fn: () => void): void` — same idea, but for marking the control as touched (typically on blur).
  - `setDisabledState(isDisabled: boolean): void` — called when the parent control's disabled state changes; reflect it however makes sense for your internal state.
- Since your component only receives a plain `string` through `writeValue`, not a `FieldTree`-like object, give it its **own internal `FormControl<string>`** to drive its own `<input matInput>`. Subscribe to that internal control's `valueChanges` (e.g. with `takeUntilDestroyed()`) and forward each value to the `onChange`/`onTouched` callbacks you stored from `registerOnChange`/`registerOnTouched`.
- Add your own plain `input()`s for whatever the component needs to render itself: a `placeholder` and a `type`, at least.
- Unlike the outer `FormGroup`'s controls, `ControlValueAccessor` has no built-in channel for validation errors — the parent doesn't automatically hand your component the bound control's `errors`. Add an `input.required<ValidationErrors | null>()` (or similar) named `errors`, and have the parent pass it explicitly alongside `formControlName` (task 7).
- Wrap it all in a `<mat-form-field>`/`matInput` (Material), so the component keeps the same visual style as before, and wire the native `<input>`'s `(blur)` to call your registered `onTouched` callback.

### 6. Bridge validity into Material's error styling

A stock `matInput` shows its red/invalid state through Angular Material's own `NgControl`-based machinery. Your internal `FormControl` is a *different*, private control from the outer one the parent actually validates — so Material has no way to know the outer control is invalid. You need to tell `matInput` when to look "invalid" using its `[errorStateMatcher]` input, which expects an object implementing Material's `ErrorStateMatcher` interface (an `isErrorState()` method returning a `boolean`).

Derive that object from your `errors` input (and the internal control's own touched/dirty state) with a `computed()`, something along these lines:

```ts
protected readonly _errorMatcher = computed(() => ({
  isErrorState: (control: AbstractControl<string>) => (control.touched || control.dirty) && !!this.errors(),
}));
```

Bind it on the inner `<input>` with `[errorStateMatcher]="_errorMatcher()"` (calling the computed signal to get the plain object Material expects). This is the same idea as the `errors?.['key']` conditions you used around `mat-error` in Part 1 — except here it drives Material's own styling instead of a template `@if`, since the component doesn't have direct control over `matInput`'s internal state via `NgControl` the way a plain `formControlName`'d input does.

Also render the field's errors inside the component's own `<mat-error>`, iterating over the `errors()` input (a `keyvalue` pipe over the error object works well) and mapping each error key to a human-readable message — same logic as the inline `@if` blocks you're about to remove, just living here instead, generalized to any error key rather than one `@if` per specific key.

### 7. Refactor `reactive-form.html` to use `<sfeir-input>`

Replace each of the 4 `<mat-form-field>` blocks with a single `<sfeir-input>` element, keeping `formControlName` bound exactly as before (it still works — `ControlValueAccessor` is what makes `formControlName` able to target a component instead of a native element), and additionally passing `[errors]` bound to the corresponding control's `errors` property on `_personForm.controls` (since, per task 5, that channel isn't automatic). Pass whatever `placeholder`/`type` inputs you designed. Remove the now-unused `MatFormFieldModule`/`MatInputModule` imports from `reactive-form.ts` and import your new custom input component instead.

The photo's hidden `<input>` and the submit/cancel buttons don't change — only the 4 visible text fields move to `<sfeir-input>`.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 13-reactive-form
```

This also starts the `server-rest` mock API the app depends on (`apps/13-reactive-form/src/environments/environment.ts` points to `http://localhost:9000/api`) — let it run, don't stop it separately. The app itself serves on the Angular CLI dev server default port. Note that `13-reactive-form` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

Other useful targets for this project:

```bash
nx build 13-reactive-form   # production build
nx lint 13-reactive-form    # lint
nx test 13-reactive-form    # test
```

The `libs/ui` library (which hosts `reactive-form`) has its own inferred `test`/`lint` targets too:

```bash
nx test ui   # run the library's unit tests
nx lint ui   # lint the library
```

## ✅ How to know it's working

- Run the app, open the Staff Directory feature, and click the action that opens the "add/edit person" dialog — it hosts your `ReactiveForm`.
- On first open, the photo preview shows the default avatar and every text field is empty.
- Typing a first/last name shorter than the minimum length, leaving a required field empty, typing an invalid-shaped email, or typing a phone number that isn't exactly 10 digits should each surface their own distinct error message under the corresponding field.
- The "Save" button stays disabled as long as the form is invalid, and becomes enabled once every field passes validation.
- Clicking "Cancel" closes the dialog without submitting anything.
- Clicking "Save" while the form is valid closes the dialog and (per the existing `dialog-person`/`staff-directory` wiring) applies the change.
- After Part 2, the form should look and behave **identically** to Part 1 — the refactor to `<sfeir-input>` changes nothing visible, it just removes the repeated markup. If validation styling, error messages, or the disabled/enabled Save button stop working after the refactor, the bug is in the custom control, not the form.

## 🛠️ Troubleshooting

**Part 1**

- **`NG01001` "No value accessor" or a form that silently does nothing on submit** — you likely forgot `[formGroup]` on the `<form>` element or `formControlName` on an input; reactive form directives need both the group and the per-control binding to work together.
- **`ngSubmit` never fires / clicking Save does nothing** — check the submit button is `type="submit"` (it already is) and that `(ngSubmit)` is bound on the `<form>`, not on the button.
- **"Can't bind to 'formGroup' since it isn't a known property of 'form'"** — `ReactiveFormsModule` is missing from the component's `imports` array (or `FormsModule` wasn't removed and is conflicting).
- **Unknown element `sfeir-reactive-form` in the dialog** — you renamed the component class or its `selector`; keep the selector as `sfeir-reactive-form` since `dialog-person.html` references it directly.
- **Dialog never closes / nothing happens after Save** — the outputs must be named exactly `submitForm` and `cancelForm`; `dialog-person.html` binds to those specific names.
- **Custom email validator throws or misbehaves on the whole `FormGroup`** — make sure you guard with `isFormControl` before treating `control.value` as the email string; validators can technically be attached to groups too, and this one should only ever evaluate individual controls.
- **Error messages never disappear even after fixing the input** — double check you're reading `errors?.['key']` off the specific control (e.g. `email.errors`), not off the whole form, and that the validator returns `null` (not `undefined` or `false`) when the value is valid.
- **Default avatar image doesn't load** — the placeholder photo comes from an external service (`randomuser.me`); if you're offline the broken image icon is expected and unrelated to your code.
- **Import errors from `@sfeir/ui/reactive-form`** — always import through that path alias (per the workspace's TypeScript path mapping), never with a relative path into `libs/`.

**Part 2**

- **"Can't bind to 'formControlName' since it isn't a known property of 'sfeir-input'"** — `formControlName` works with any component registered as a `ControlValueAccessor` via `NG_VALUE_ACCESSOR`; double-check your component's `providers` array and that `forwardRef(() => YourClass)` points at the right class name.
- **Typing in `<sfeir-input>` doesn't update the parent form's value** — you're not calling the `onChange` callback (from `registerOnChange`) on every value change of your internal control; without it, Angular never learns the value changed.
- **The parent's `errors` shows `null` right after the component appears, even for an initially-invalid required field** — that's expected before the user interacts; errors on a `required`-only field only populate once the control is `dirty`/`touched`, same as in Part 1.
- **Error message never appears, even when the field is invalid** — check that your component's `errors` input is actually wired: `formControlName` alone does not forward validation errors, you must bind `[errors]="_personForm.controls.<field>.errors"` explicitly on `<sfeir-input>` in the template.
- **Red/invalid Material styling never shows even though `mat-error` renders correctly** — that's the `[errorStateMatcher]` binding on the inner `matInput`, not the `mat-error` block; without it, Material's own `NgControl`-based error-state logic runs against your (always-valid, purely internal) `FormControl` instead of the outer one.
- **Blur doesn't mark the field as touched** — wire the native `<input>`'s `(blur)` to call the callback you stored from `registerOnTouched`; without it, the outer control's `touched` state never flips to `true` and touched-dependent error styling never surfaces.
- **`setDisabledState` never gets called / disabling the form doesn't disable `<sfeir-input>`** — this method only fires if you implement it as part of `ControlValueAccessor`; if it's missing, Angular silently skips propagating the disabled state into your component.
- **Import errors from `@sfeir/ui/reactive-form`** — always import through that path alias (per the workspace's TypeScript path mapping), never with a relative path into `libs/`.

## 🙈 Stuck?

Try to get the form fully working — typed `FormGroup`, validators, custom validator, template bindings, and then the reusable custom input — on your own first. If you're really stuck, `apps/13-reactive-form-solution` (backed by `libs/ui-solution/reactive-form`) has a working reference implementation. Use it to compare your approach once you have something working, not as a shortcut to copy from.
