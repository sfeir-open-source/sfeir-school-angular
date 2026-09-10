<!-- .slide: class=" with-code inconsolata" -->

# Surfacing validation errors

```html
<!-- reactive-form.html -->
<mat-form-field>
  <input matInput formControlName="firstname" />
  <mat-error>
    @if (personForm.controls.firstname.errors?.['required']) {
      <span>First name is required.</span>
    }
    @if (personForm.controls.firstname.errors?.['minlength']) {
      <span>Must be at least 2 characters long.</span>
    }
  </mat-error>
</mat-form-field>
```

<!-- .element: class="small-code" -->

Notes:

- Each `<mat-form-field>` needs its own `@if` chain reading `personForm.controls.<field>.errors` — one generic "invalid" message isn't good enough UX, and isn't what the exercise asks for either.
- `apps/13-reactive-form` needs a **specific** message per error key on every field: `required`, `minlength`, the custom email key, and `pattern` for the phone.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Disabling submit until the form is valid

```html
<button type="submit" mat-raised-button [disabled]="personForm.invalid">Save</button>
```

<!-- .element: class="big-code" -->

<br/>

- `personForm.invalid` reflects **every** control's validity at once — no need to `&&` them together by hand.<br/><br/>
- `personForm.value` / `personForm.getRawValue()` give you the current data whenever you need it, synchronously, no subscription required for a one-off read on submit.
