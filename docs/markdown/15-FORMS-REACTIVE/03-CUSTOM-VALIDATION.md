<!-- .slide: class="transition-bg-sfeir-1 underline" -->

# Custom Validation

##==##

<!-- .slide: class="with-code inconsolata" -->

# Writing a `ValidatorFn`

- A custom validator is a **function** taking a control and returning either `null` (valid) or a validation error object like `{ errorName: true }`.
- `apps/13-reactive-form` needs one enforcing the company's own email shape: `firstname.lastname@<company-domain>`.

<br/>

```typescript
// libs/ui/reactive-form/person-form.ts
import { AbstractControl, isFormControl, ValidationErrors } from '@angular/forms';

export function sfeirEmailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // empty values are `required`'s job, not this validator's
  }
  if (!isFormControl(control)) {
    return null; // only ever validate a single FormControl, not a group/array
  }
  const isValid = /^[a-z]+\.[a-z]+@sfeir\.com$/.test(control.value);
  return isValid ? null : { sfeirEmail: true };
}
```

<!-- .element: class="medium-code" -->

Notes:

- `isFormControl` is a type-guard exported by `@angular/forms` — it's the defensive check that stops this validator from misbehaving if it's ever (accidentally or intentionally) attached to a `FormGroup`/`FormArray` instead of a single control.
- Returning early on an empty value keeps validators composable: `required` owns "is it empty", this validator only owns "is it shaped right".

##==##

<!-- .slide: class="with-code inconsolata" -->

# Using a custom validator

Add it to the `validators` array exactly like a built-in one:

<br/>

```typescript
email: new FormControl('', {
  nonNullable: true,
  validators: [Validators.required, sfeirEmailValidator], // 👈 mix built-in and custom freely
}),
```

<!-- .element: class="medium-code" -->

<br/>

```html
@if (personForm.controls.email.errors?.['sfeirEmail']) {
  <span>Email must look like firstname.lastname@sfeir.com</span>
}
```

<!-- .element: class="medium-code" -->

Notes:

- A control's `validators` array can freely mix Angular's built-ins (`Validators.required`, `.minLength(...)`, `.pattern(...)`) with any number of your own `ValidatorFn`s — they all run and their errors merge into the same `errors` object.
