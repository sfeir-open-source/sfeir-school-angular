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

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'sfeir-login',
  imports: [FormField], // 👈 required to use [formField]
  templateUrl: './login.html',
})
export class Login {
  protected readonly loginModel = signal<LoginData>({ email: '', password: '' });
  protected readonly loginForm = form(this.loginModel);
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# The field tree

```typescript
// The field tree mirrors the model shape.
// Navigate with dot notation:
loginForm.email;
loginForm.password;

// Call a field to get its FieldState:
loginForm.email(); // FieldState<string>

// Read the value signal:
loginForm.email().value(); // ''

// Update it (also updates the model signal!):
loginForm.email().value.set('ada@sfeir.com');
loginForm().value(); // { email: 'ada@sfeir.com', password: '' }
```

<!-- .element: class="small-code" -->

##++##
##++## class="with-code inconsolata"

# Bind it in the template

```angular181html
<form>
  <label>
    Email
    <input type="email" [formField]="loginForm.email" />
  </label>

  <label>
    Password
    <input type="password" [formField]="loginForm.password" />
  </label>

  <p>Hello {{ loginForm.email().value() }}</p>
</form>
```

<!-- .element: class="medium-code" -->

##++##

Notes:

- `[formField]` creates true two-way synchronization: typing updates the field state **and** the underlying model signal; calling `value.set()` updates the input. No manual subscriptions, no `valueChanges`.
- It also syncs `name`, `required`, `disabled`, `readonly`, min/max/length constraints onto native elements automatically — don't set them by hand.
- A field is **callable**: `loginForm.email()` returns the `FieldState`, `loginForm()` returns the root state for the whole model.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `[formField]` works with native inputs

```angular181html
<!-- text / email / password -->
<input type="text" [formField]="form.name" />

<!-- number: auto-converted to a number -->
<input type="number" [formField]="form.age" />

<!-- checkbox: binds a boolean -->
<input type="checkbox" [formField]="form.acceptTerms" />

<!-- radio: same field => same name attribute auto-bound -->
<input type="radio" value="free" [formField]="form.plan" />
<input type="radio" value="pro" [formField]="form.plan" />

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
- Multiple `<select multiple>` is not supported by `[formField]` at this time.
