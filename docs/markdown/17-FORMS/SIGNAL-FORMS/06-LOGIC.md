<!-- .slide: class="transition-bg-sfeir-1" -->

# Form logic & dynamic behavior

##==##

<!-- .slide: class="with-code inconsolata" -->

# `disabled` · `hidden` · `readonly`

Conditional, reactive field logic with a `when` function:

<br/>

```typescript
form(this.model, (path) => {
  // Disabled while another field is empty
  disabled(path.couponCode, {
    when: ({ valueOf }) => valueOf(path.total) < 50,
  });

  // Hidden until a checkbox is ticked
  hidden(path.companyName, {
    when: ({ valueOf }) => !valueOf(path.isBusiness),
  });

  // Readonly when the record is locked
  readonly(path.invoiceId, { when: ({ valueOf }) => valueOf(path.locked) });
});
```

<!-- .element: class="medium-code" -->

Notes:

- A disabled, hidden, or readonly field is excluded from validation and from the parent's `valid`/`touched`/`dirty` state.
- `disabled` can also take a string reason: `disabled(path.x, { when: () => 'Reason shown to user' })`, surfaced through `state.disabledReasons()`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Hidden fields & the template

A `hidden` rule hides the field from form **state** — you must still remove it from the **DOM**:

<br/>

```angular181html
@if (!form.companyName().hidden()) {
  <label>
    Company name
    <input [formField]="form.companyName" />
  </label>
}
```

<!-- .element: class="medium-code" -->

<br/>

> Guard hidden fields with `@if` — rendering a hidden field logs a dev-mode warning.

<!-- .element: class="important center" -->

<br/>

Notes:

- The `hidden()` signal tells you the *logical* visibility decided by the schema; combining it with `@if` keeps the DOM and the form state consistent.
