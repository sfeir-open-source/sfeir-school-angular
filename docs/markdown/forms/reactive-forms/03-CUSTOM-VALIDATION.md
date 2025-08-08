<!-- .slide: class="transition-bg-sfeir-1 underline"" -->
# Custom Validation with Reactive Forms

##==##

<!-- .slide: class="with-code inconsolata" -->
# Creating a Custom Validator

- A custom validator is a simple **function** that takes a control as an argument.
- If the control's value is valid, the function returns **`null`**.
- If the value is invalid, it returns a validation error object, like **`{ errorName: true }`**.
<br/><br/>

```typescript
// custom-validators.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function sfeirEmailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Don't validate empty values, let `required` handle it
  }
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value);
  return isValid ? null : { invalidEmail: true };
}
```
<!-- .element: class="medium-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Using a Custom Validator

- Add the validator function directly to the `FormControl`.
- You can apply a single validator or an array of multiple validators.
<br/><br/>

```typescript
import { sfeirEmailValidator } from './custom-validators';

const userForm = new FormGroup({
  // Single validator
  email: new FormControl('', sfeirEmailValidator),
  
  // Multiple validators
  emailWithRequired: new FormControl('', [Validators.required, sfeirEmailValidator]),
});
```
<!-- .element: class="medium-code" -->
