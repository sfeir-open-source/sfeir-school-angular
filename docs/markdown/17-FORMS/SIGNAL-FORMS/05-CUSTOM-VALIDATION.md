<!-- .slide: class="with-code inconsolata" -->

# Custom rules with `validate()`

Return an error object when invalid, `null`/`undefined` when valid:

<br/>

```typescript
form(this.urlModel, (path) => {
  validate(path.website, ({ value }) => {
    if (!value().startsWith('https://')) {
      return { kind: 'https', message: 'URL must start with https://' };
    }
    return null;
  });
});
```

<!-- .element: class="medium-code" -->

The validator receives a **`FieldContext`**: `value`, `state`, `fieldTree`, `valueOf()`, `stateOf()`, `pathKeys`...

Notes:

- `value()` is the current field value as a signal — reading it makes the validator reactive.
- `valueOf(otherPath)` reads another field's value reactively, which is the key to cross-field validation (next slide).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Cross-field validation

Use `valueOf()` to compare fields — e.g. password confirmation:

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
form(this.userModel, (path) => {
  validateTree(path, (ctx) => {
    if (ctx.valueOf(path.firstName).length < 5) {
      return {
        kind: 'minLength5',
        message: 'First name must be at least 5 characters',
        fieldTree: ctx.fieldTree.lastName, // 👈 error shown on lastName
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

Wrap `validate()` to build your own validator library:

<br/>

```typescript
import { validate, SchemaPath } from '@angular/forms/signals';

export function url(path: SchemaPath<string>, options?: { message?: string }) {
  validate(path, ({ value }) => {
    try {
      new URL(value());
      return null;
    } catch {
      return { kind: 'url', message: options?.message ?? 'Enter a valid URL' };
    }
  });
}

// Use it exactly like a built-in rule:
form(this.model, (path) => url(path.website, { message: 'Invalid website' }));
```

<!-- .element: class="medium-code" -->

Notes:

- Because rules are plain functions taking a `SchemaPath`, sharing validation across an app is trivial and fully type-safe.
- Signal Forms also support **Standard Schema** libraries (Zod, Valibot) through `validateStandardSchema(path, zodSchema)`, including dynamic schemas driven by a signal.
