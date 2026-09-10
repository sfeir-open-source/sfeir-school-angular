<!-- .slide -->

# Why a third forms API?

- Template-driven and Reactive forms predate **Signals**<br/><br/>
- They rely on `NgModel` / `FormControl` and `Observables` as the source of truth<br/><br/>
- Modern Angular is **signal-first**: components, inputs, state, resources...<br/><br/>
- **Signal Forms** make the form a thin reactive layer **on top of your own signal model**

Notes:

- Signal Forms shipped as **stable in Angular v22** inside the existing `@angular/forms` package (sub-path `@angular/forms/signals`).
- The goal is to unify the ergonomics of template-driven forms (simple, model-based) with the power and testability of reactive forms (logic in code), using signals as the single reactivity primitive.
- It is fully interoperable: you can adopt it incrementally next to reactive/template forms.
- `apps/14-signal-form` builds the "Add / Edit person" form a **third** time with this API — same fields, same validation rules as `12-template-form`/`13-reactive-form`, radically different mental model.

##==##

<!-- .slide: class="with-code inconsolata" -->

# What is Signal Forms?

> Signal Forms manage form state using Angular signals, with automatic two-way binding, type-safe field access, and schema-based validation.

<br/>

- Your **model** is a writable `signal` — the single source of truth<br/><br/>
- `form()` wraps the model into a **field tree** that mirrors its shape<br/><br/>
- Validation & logic live in a **schema function**, declared once<br/><br/>
- Everything you read back (`value`, `valid`, `errors`, `touched`...) is a **signal**

##==##

<!-- .slide: class="with-code inconsolata" -->

# Everything ships in `@angular/forms`

Import the functions and directives from the `signals` entry point:

<br/>

```typescript
import {
  form,
  FormField,
  FormRoot,
  schema,
  apply,
  required,
  minLength,
  pattern,
  validate,
  submit,
} from '@angular/forms/signals';
```

<!-- .element: class="small-code" -->

Notes:

- No new npm dependency to install — Signal Forms are part of `@angular/forms` since v22.
- `@angular/forms/signals` is a secondary entry point, tree-shakable: you only pull in what you import.

##==##

<!-- .slide: class="with-code" -->

# Signal vs Reactive vs Template

| Feature         | Signal Forms                | Reactive Forms            | Template-driven    |
| --------------- | ---------------------------- | -------------------------- | ------------------- |
| Source of truth | A writable **signal** model | `FormControl`/`FormGroup` | Component property  |
| Type safety     | **Inferred** from the model | Explicit typed forms       | Minimal             |
| Validation      | **Schema** with path rules   | Validators on controls     | Directives          |
| State           | **Signal**-based             | Observable-based           | Angular-managed     |
| Best for        | Signal-based apps            | Complex/dynamic forms      | Simple forms        |

<br/>

> New code on Angular v22+? Reach for Signal Forms first — it's exactly the choice `apps/14-signal-form` makes for the "real" future of this form.

<!-- .element: class="important center" -->

<br/>

Notes:

- Signal Forms keep your data model and form structure identical — the field tree mirrors the model exactly.
- Reactive forms remain a great choice for very dynamic forms and existing codebases. Signal Forms interoperate with them, so migration can be incremental.
