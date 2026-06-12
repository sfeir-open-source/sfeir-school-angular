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
  schema,
  required,
  email,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  validate,
  validateTree,
  validateHttp,
  disabled,
  hidden,
  readonly,
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
| --------------- | --------------------------- | ------------------------- | ------------------ |
| Source of truth | A writable **signal** model | `FormControl`/`FormGroup` | Component property |
| Type safety     | **Inferred** from the model | Explicit typed forms      | Minimal            |
| Validation      | **Schema** with path rules  | Validators on controls    | Directives         |
| State           | **Signal**-based            | Observable-based          | Angular-managed    |
| Best for        | Signal-based apps           | Complex/dynamic forms     | Simple forms       |

<br/>

> New code on Angular v22+? Reach for Signal Forms first.

<!-- .element: class="important center" -->

<br/>

Notes:

- Signal Forms keep your data model and form structure identical — the field tree mirrors the model exactly.
- Reactive forms remain a great choice for very dynamic forms and existing codebases. Signal Forms interoperate with them, so migration can be incremental.
