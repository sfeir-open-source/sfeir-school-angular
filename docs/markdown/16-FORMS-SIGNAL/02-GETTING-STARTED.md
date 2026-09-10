<!-- .slide: class="transition-bg-sfeir-1" -->

# Your first Signal Form

##==##

<!-- .slide: class="with-code inconsolata" -->

# 3 steps to a form

- **1.** Create a model with `signal()`
- **2.** Wrap it with `form()` to get a **field tree**
- **3.** Bind inputs with the `[formField]` directive<br/><br/>

```typescript
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import type { UpsertPersonBody } from '@sfeir/types';

@Component({
  selector: 'sfeir-signal-form',
  imports: [FormField], // 👈 required to use [formField]
  templateUrl: './signal-form.html',
})
export class SignalForm {
  private readonly personModel = signal<UpsertPersonBody>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    photo: 'https://placeholder/avatar.png',
  });
  protected readonly personForm = form(this.personModel);
}
```

<!-- .element: class="small-code" -->

Notes:

- This is `apps/14-signal-form`'s starting point: the exact `UpsertPersonBody` shape used across all three form exercises, this time wrapped in a plain `signal()` instead of a `FormGroup`.

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# The field tree

```typescript
// The field tree mirrors the model shape.
// Navigate with dot notation:
personForm.firstname;
personForm.email;

// Call a field to get its FieldState:
personForm.email(); // FieldState<string>

// Read the value signal:
personForm.email().value(); // ''

// Update it (also updates the model signal!):
personForm.email().value.set('ada@sfeir.com');
personForm().value(); // { firstname: '', email: 'ada@sfeir.com', ... }
```

<!-- .element: class="small-code" -->

##++##
##++## class="with-code inconsolata"

# Bind it in the template

```html
<form>
  <label>
    First name
    <input type="text" [formField]="personForm.firstname" />
  </label>

  <label>
    Email
    <input type="email" [formField]="personForm.email" />
  </label>

  <p>Hello {{ personForm.firstname().value() }}</p>
</form>
```

<!-- .element: class="medium-code" -->

##++##

Notes:

- `[formField]` creates true two-way synchronization: typing updates the field state **and** the underlying model signal; calling `value.set()` updates the input. No manual subscriptions, no `valueChanges`.
- It also syncs `name`, `required`, `disabled`, `readonly`, min/max/length constraints onto native elements automatically — don't set them by hand.
- A field is **callable**: `personForm.email()` returns the `FieldState`, `personForm()` returns the root state for the whole model.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `[formField]` works with native inputs

```html
<!-- text / email / password -->
<input type="text" [formField]="personForm.firstname" />

<!-- number: auto-converted to a number -->
<input type="number" [formField]="form.age" />

<!-- checkbox: binds a boolean -->
<input type="checkbox" [formField]="form.acceptTerms" />

<!-- select, static or dynamic options -->
<select [formField]="form.country">
  @for (c of countries; track c.code) {
    <option [value]="c.code">{{ c.label }}</option>
  }
</select>

<!-- textarea -->
<textarea [formField]="form.bio"></textarea>
```

<!-- .element: class="small-code" -->

Notes:

- Number inputs convert strings to numbers automatically; `date`/`time` inputs store `YYYY-MM-DD` / `HH:mm` strings.
- `apps/14-signal-form`'s hidden `photo` field is bound this same way — `<input type="hidden" [formField]="personForm.photo" />` — even though nothing is visibly typed into it.
