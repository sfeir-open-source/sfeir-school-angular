<!-- .slide: class="with-code inconsolata" -->

# Field state is made of signals

Call any field to get its `FieldState`, then read reactive signals:

<br/>

```typescript
const email = loginForm.email(); // FieldState<string>

email.value(); // current value (WritableSignal)
email.valid(); // no errors AND no pending async validators
email.invalid(); // has errors (ignores pending)
email.errors(); // ValidationError[]  -> { kind, message }
email.touched(); // focused then blurred
email.dirty(); // value changed by the user
email.disabled(); // disabled by a rule
email.readonly(); // readonly by a rule
email.pending(); // async validation in progress
email.required(); // a required() rule is active
```

<!-- .element: class="medium-code" -->

Notes:

- `valid()` is **not** the same as `!invalid()`: while an async validator is pending, both `valid()` and `invalid()` are `false`.
- The root state aggregates children: `loginForm().valid()`, `loginForm().value()` (the whole model), `loginForm().errorSummary()` (errors of the field and all descendants).

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Reading & writing

```typescript
// Read
const v = loginForm.email().value();

// Write (updates the model too)
loginForm.email().value.set('a@b.com');
loginForm.email().value.update((s) => s.trim());

// Interaction state helpers
loginForm.email().markAsTouched();
loginForm.email().markAsDirty();

// Reset touched/dirty (and optionally value)
loginForm.email().reset();
```

<!-- .element: class="small-code" -->

##++##
##++## class="with-code inconsolata"

# Showing errors the right way

```angular181html
<label>
  Email
  <input type="email" [formField]="loginForm.email" />
</label>

@if (loginForm.email().touched()
     && loginForm.email().invalid()) {
  <ul class="errors">
    @for (e of loginForm.email().errors(); track e) {
      <li>{{ e.message }}</li>
    }
  </ul>
}
```

<!-- .element: class="small-code" -->

##++##

Notes:

- **Best practice:** gate error display with `touched() && invalid()` so messages don't appear before the user has interacted with the field.
- Errors are plain objects with a `kind` (e.g. `'required'`, `'email'`) and an optional `message`. You can branch on `kind` to render i18n messages.
