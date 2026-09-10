<!-- .slide: class="with-code inconsolata" -->

# Custom rules with `validate()`

Return an error object when invalid, `null`/`undefined` when valid. This is exactly how `apps/14-signal-form` builds the `sfeirEmail` rule — the same shape check as `13-reactive-form`'s `sfeirEmailValidator`, ported to Signal Forms:

<br/>

```typescript
// libs/ui/signal-form/person-form.ts
function sfeirEmailValidator(field: FieldContext<string>): ValidationError | null {
  if (!field.value()) {
    return null; // empty is `required()`'s job, not this validator's
  }
  const isValid = /^[a-z]+\.[a-z]+@sfeir\.com$/.test(field.value());
  return isValid ? null : { kind: 'sfeirEmail', message: 'Must look like firstname.lastname@sfeir.com' };
}

form(this.personModel, (path) => {
  required(path.email, { message: 'Email is required' });
  validate(path.email, sfeirEmailValidator);
});
```

<!-- .element: class="medium-code" -->

The validator receives a **`FieldContext`**: `value`, `state`, `fieldTree`, `valueOf()`, `stateOf()`, `pathKeys`...

Notes:

- `field.value()` is the current field value as a signal — reading it makes the validator reactive.
- `valueOf(otherPath)` reads another field's value reactively, which is the key to cross-field validation (next slide) — not needed for `sfeirEmail`, which only ever looks at its own field.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Cross-field validation

Use `valueOf()` to compare fields — e.g. password confirmation on a signup form:

<br/>

```typescript
form(this.model, (path) => {
  required(path.password);
  minLength(path.password, 8);
  required(path.confirmPassword);

  validate(path.confirmPassword, ({ value, valueOf }) => {
    if (value() !== valueOf(path.password)) {
      return { kind: 'passwordMismatch', message: 'Passwords do not match' };
    }
    return null;
  });
});
```

<!-- .element: class="medium-code" -->

Notes:

- The rule re-runs automatically whenever either password changes — no manual wiring.
- The error appears on `confirmPassword`. To place an error on a **different** field, use `validateTree` (next slide).

##==##

<!-- .slide: class="with-code inconsolata" -->

# `validateTree()` — target other fields

Validate a whole subtree and attach errors to a specific field via `fieldTree`:

<br/>

```typescript
form(this.personModel, (path) => {
  validateTree(path, (ctx) => {
    if (ctx.valueOf(path.firstname).length < 2 && ctx.valueOf(path.lastname).length < 2) {
      return {
        kind: 'bothTooShort',
        message: 'At least one name must be longer',
        fieldTree: ctx.fieldTree.lastname, // 👈 error shown on lastname
      };
    }
    return null;
  });
});
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Reusable validators = just functions

Wrap `validate()` to build your own validator library — exactly how `sfeirEmailValidator` is designed:

<br/>

```typescript
import { validate, SchemaPath, FieldContext, ValidationError } from '@angular/forms/signals';

export function sfeirEmail(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, (field: FieldContext<string>): ValidationError | null => {
    if (!field.value()) return null;
    const isValid = /^[a-z]+\.[a-z]+@sfeir\.com$/.test(field.value());
    return isValid ? null : { kind: 'sfeirEmail', message: options?.message ?? 'Invalid company email' };
  });
}

// Use it exactly like a built-in rule:
form(this.personModel, (path) => sfeirEmail(path.email));
```

<!-- .element: class="medium-code" -->

Notes:

- Because rules are plain functions taking a `SchemaPath`, sharing validation across an app is trivial and fully type-safe.
- Signal Forms also support **Standard Schema** libraries (Zod, Valibot) through `validateStandardSchema(path, zodSchema)`, including dynamic schemas driven by a signal.
