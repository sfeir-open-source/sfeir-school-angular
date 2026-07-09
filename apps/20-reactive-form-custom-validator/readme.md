# 20 · Custom Form Validator

> Write a reusable validator that enforces the SFEIR email format on the reactive form.

**Folder** `apps/20-reactive-form-custom-validator` · **Solution** `apps/20-reactive-form-custom-validator-solution` · **Run** `npm run client -- 20-reactive-form-custom-validator`

## 🎯 Goal

Built-in validators can't express business rules. Add a custom validator that only accepts emails shaped like `firstname.lastinitial@sfeir.com` (e.g. `john.d@sfeir.com`), then show a matching error.

## 📚 What you'll learn

- How to write a custom synchronous validator
- The validator contract: return `null` when valid, an error object when not
- How to attach and display a custom error alongside built-in ones

## ✅ Before you start

- Completion of the reactive forms exercise (19-reactive-form)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Write the validator

In `people-form.ts`, add a static method. A validator receives the control and returns `null` (valid) or an error map (invalid):

```typescript
static sfeirEmailValidator(control: FormControl<string>) {
  const email = control.value;
  const sfeirPattern = /^\w+\.\w@sfeir.com$/;
  return sfeirPattern.test(email) ? null : { sfeirEmail: true };
}
```

### Step 2 — Attach it to the email control

Add it to the email control's validator array, alongside `required`:

```typescript
email: new FormControl(null, [Validators.required, PersonForm.sfeirEmailValidator]),
```

### Step 3 — Display the error

In `form.html`, show the message when the `sfeirEmail` error is present (but not while the field is simply empty):

```html
@if (peopleForm.controls.email.errors?.['required']) {
  <mat-error>This field is required</mat-error>
}
@if (peopleForm.controls.email.errors?.['sfeirEmail'] && !peopleForm.controls.email.errors?.['required']) {
  <mat-error>Invalid format — expected e.g. doe.j&#64;sfeir.com</mat-error>
}
```

## ▶️ Run & verify

```bash
npm run client -- 20-reactive-form-custom-validator
```

Open the form and check:

- [ ] `doe.j@sfeir.com` is accepted
- [ ] `john@gmail.com` is rejected with your custom message
- [ ] The `required` and `sfeirEmail` messages don't both show at once

## 💡 Key concepts

- **Validator contract** — a `ValidatorFn` takes an `AbstractControl` and returns `ValidationErrors | null`. The error **key** (`sfeirEmail`) is what you check in the template.
- **Composition** — a control can hold several validators; the resulting `errors` object merges them all.
- **Reusability** — because it's a plain function, the same validator can guard any control across the app.

## 🧯 Troubleshooting

- **Error never triggers** — confirm the validator is in the control's array and returns `{ sfeirEmail: true }` on failure.
- **Both messages show together** — guard the custom message with `&& !errors?.['required']`.
- **Everything is rejected** — re-check the regex; `\w+\.\w` means "word chars, a dot, then one char" before `@sfeir.com`.
