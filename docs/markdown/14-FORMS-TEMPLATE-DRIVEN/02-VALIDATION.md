<!-- .slide: class="with-code inconsolata" -->

# Validation with template-driven forms

Validation is done using standard HTML validation attributes:<br/><br/>

- `required`
- `[minlength]` / `[maxlength]`
- `[pattern]`

<br/>

```html
<input name="phone" ngModel required [pattern]="'\\d{10}'" />
```

<!-- .element: class="big-code" -->

Notes:

- `apps/12-template-form`'s rules: first/last name need `required` + `minlength="2"`; email needs `required`; phone needs `required` + a `pattern` matching exactly 10 digits.
- A static attribute (`pattern="..."`) works too when the rule never changes at runtime — a property binding (`[pattern]`) is only needed when the value comes from a component property.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Displaying validation messages

Use a template reference variable (e.g. `#firstnameField="ngModel"`) to read that control's state, and gate the error block with `@if`:

<br/>

```html
<mat-form-field>
  <input matInput name="firstname" ngModel required minlength="2" #firstnameField="ngModel" />
  <mat-error>
    @if (firstnameField.errors?.['required']) {
      <span>First name is required.</span>
    }
    @if (firstnameField.errors?.['minlength']) {
      <span>Must be at least 2 characters long.</span>
    }
  </mat-error>
</mat-form-field>
```

<!-- .element: class="medium-code" -->

Notes:

- Every field needs its **own** `#xxxField="ngModel"` — the errors of one field are never accessible from another's reference variable.
- `apps/12-template-form` doesn't require gating errors behind `touched`/`dirty` — showing them as soon as a rule fails is an acceptable simplification for this exercise.

##==##

# The different states of a control

- **control.pristine**: the user has not interacted with the control. <br/><br/>
- **control.dirty**: the user has already interacted with the control. <br/><br/>
- **control.valid** / **control.invalid**: passes/fails its validators. <br/><br/>
- **control.touched**: the control has lost focus at least once. <br/><br/>
- **control.untouched**: the control has never lost focus.

##==##

# CSS classes for styling

Angular reflects a control's state onto the DOM element as classes — style them directly, no JS needed:<br/>

- `.ng-valid` / `.ng-invalid` <br/><br/>
- `.ng-pristine` / `.ng-dirty`<br/><br/>
- `.ng-touched` / `.ng-untouched`
