<!-- .slide: class="with-code inconsolata" -->

# Reusable schemas with `schema()` + `apply()`

Extract rules for a shared shape once, reuse across every field with that shape. `apps/14-signal-form` uses exactly this for `firstname`/`lastname`, which share the identical `required` + `minLength(2)` pair:

<br/>

```typescript
// libs/ui/signal-form/person-form.ts
import { schema, apply, required, minLength } from '@angular/forms/signals';

const nameRules = schema<string>(namePath => {
  required(namePath, { message: 'This field is required' });
  minLength(namePath, 2, { message: 'At least 2 characters' });
});

form(this.personModel, path => {
  apply(path.firstname, nameRules);
  apply(path.lastname, nameRules); // 👈 same two rules, written once
});
```

<!-- .element: class="medium-code" -->

Notes:

- `schema()` builds a cached, reusable `Schema` object. Inline schema functions are fine when rules live in one place; reach for `schema()` the moment two or more fields need the exact same rules — exactly the `firstname`/`lastname` situation here.
- `apply(path, schema)` runs the schema scoped to that sub-path — it only sees fields under `path`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Conditional schemas — `applyWhen()`

Activate a group of rules based on reactive state:

<br/>

```typescript
addressForm = form(this.addressModel, path => {
  applyWhen(
    path.address,
    ({ valueOf }) => valueOf(path.country) === 'US',
    addressPath => {
      required(addressPath.zipCode);
      pattern(addressPath.zipCode, /^\d{5}(-\d{4})?$/);
    },
  );
});
```

<!-- .element: class="medium-code" -->

Notes:

- The condition is reactive: when it becomes false the rules deactivate, when true they reactivate. The rules always _exist_ — the condition only toggles whether they're _active_.
- Inside a nested schema, use its own scoped path parameter; outer paths aren't valid there (but `valueOf` can still read any field in the form).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Type-narrowing — `applyWhenValue()`

Discriminated unions become type-safe with a type guard:

<br/>

```typescript
type Payment = { type: 'card'; cardNumber: string; cvv: string } | { type: 'transfer'; iban: string };

const isCard = (p: Payment): p is Extract<Payment, { type: 'card' }> => p.type === 'card';

form(this.paymentModel, path => {
  applyWhenValue(path, isCard, card => {
    required(card.cardNumber); // ✅ TS knows these fields exist
    required(card.cvv);
  });
});
```

<!-- .element: class="medium-code" -->

Notes:

- `applyWhen` receives a `FieldContext`; `applyWhenValue` receives the raw value and, with a type guard, narrows the schema's type. Ideal for variant/union models.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Arrays — `applyEach()`

Apply the same rules to every item of an array, even items added later:

<br/>

```typescript
type LineItem = { name: string; quantity: number };

orderForm = form(this.orderModel, path => {
  required(path.title);

  applyEach(path.items, item => {
    required(item.name, { message: 'Item name is required' });
    min(item.quantity, 1, { message: 'Quantity must be at least 1' });
  });
});
```

<!-- .element: class="medium-code" -->

Notes:

- `applyEach` accepts an inline schema function or a reusable `schema()` object, so item-level rules can be shared across forms (orders, invoices...).
- The field tree for an array is iterable, so you can `@for (item of orderForm.items; track ...)` in the template and bind each `item.name` with `[formField]`.
