<!-- .slide: class="with-code inconsolata" -->

# Reusable schemas with `schema()`

Extract rules for a shared data shape, reuse across forms:

<br/>

```typescript
import { schema, required, minLength } from '@angular/forms/signals';

const nameSchema = schema<{ first: string; last: string }>((name) => {
  required(name.first);
  required(name.last);
  minLength(name.first, 2);
});

// Apply to a sub-path of any form
profileForm = form(this.profileModel, (path) => apply(path.name, nameSchema));
billingForm = form(this.billingModel, (path) => apply(path.name, nameSchema));
```

<!-- .element: class="medium-code" -->

Notes:

- `schema()` builds a cached, reusable `Schema` object. Inline schema functions are fine when rules live in one place; reach for `schema()` to reuse or apply to multiple paths.
- `apply(path, schema)` runs the schema scoped to that sub-path — it only sees fields under `path`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Conditional schemas — `applyWhen()`

Activate a group of rules based on reactive state:

<br/>

```typescript
addressForm = form(this.addressModel, (path) => {
  applyWhen(
    path.address,
    ({ valueOf }) => valueOf(path.country) === 'US',
    (address) => {
      required(address.zipCode);
      pattern(address.zipCode, /^\d{5}(-\d{4})?$/);
    }
  );
});
```

<!-- .element: class="medium-code" -->

Notes:

- The condition is reactive: when it becomes false the rules deactivate, when true they reactivate. The rules always *exist* — the condition only toggles whether they're *active*.
- Inside a nested schema, use its own scoped path parameter; outer paths aren't valid there (but `valueOf` can still read any field in the form).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Type-narrowing — `applyWhenValue()`

Discriminated unions become type-safe with a type guard:

<br/>

```typescript
type Payment =
  | { type: 'card'; cardNumber: string; cvv: string }
  | { type: 'transfer'; iban: string };

const isCard = (p: Payment): p is Extract<Payment, { type: 'card' }> => p.type === 'card';

form(this.paymentModel, (path) => {
  applyWhenValue(path, isCard, (card) => {
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

orderForm = form(this.orderModel, (path) => {
  required(path.title);

  applyEach(path.items, (item) => {
    required(item.name, { message: 'Item name is required' });
    min(item.quantity, 1, { message: 'Quantity must be at least 1' });
  });
});
```

<!-- .element: class="medium-code" -->

Notes:

- `applyEach` accepts an inline schema function or a reusable `schema()` object, so item-level rules can be shared across forms (orders, invoices...).
- The field tree for an array is iterable, so you can `@for (item of orderForm.items; track ...)` in the template and bind each `item.name` with `[formField]`.
