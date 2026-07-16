# 19 · Signal Forms

> Migrate the reactive form to Angular's signal-based forms: a model signal + a validation schema.

**Folder** `apps/19-signal-form` · **Solution** `apps/19-signal-form-solution` · **Run** `npm run client -- 19-signal-form`

## 🎯 Goal

Rebuild the person form on **Signal Forms**. Your data model becomes a writable `signal`; `form()` wraps it into a field tree; validation lives in a schema function. Everything you read back (`value`, `valid`, `errors`, `touched`…) is a signal.

## 📚 What you'll learn

- The Signal Forms model: `form()`, schemas, and field state
- Schema-based validation (`required`, `email`, `pattern`, `minLength`, `apply`)
- Binding with `[formField]` and keeping the model in sync with `linkedSignal`

## ✅ Before you start

- Completion of the reactive forms exercises (19-reactive-form, 20)
- Start the mock API: `npm run server:start`

## ℹ️ What are Signal Forms?

Your data model is a writable `signal`, wrapped by `form()` into a **field tree** that mirrors its shape. Validation rules live in a **schema function**. Benefits over reactive forms:

- The model signal is the single source of truth — no manual `patchValue` or `valueChanges`
- Type-safe field access inferred from the model shape
- Schema-based validation, declared once and co-located with the form
- Native two-way binding via the `[formField]` directive

## 🛠️ Steps

### Step 1 — Rewrite the form model

In `people-form.ts`, replace the `FormGroup`-based `PersonForm` with a signal schema:

```typescript
import { WritableSignal } from '@angular/core';
import { apply, email, form, minLength, pattern, required, schema } from '@angular/forms/signals';

export type Person = {
  id: string;
  photo: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

export const namesSchema = schema<string>(names => {
  required(names, { message: 'This field is required' });
  minLength(names, 2, { message: 'This field must be at least 2 characters long' });
});

const schemaPerson = schema<Person>(person => {
  required(person.photo);
  apply(person.firstname, namesSchema);
  apply(person.lastname, namesSchema);
  email(person.email, { message: 'This field must be a valid email address' });
  pattern(person.phone, /\d{10}/, { message: 'This field must be a valid phone number' });
});

export const createPeopleForm = (person: WritableSignal<Person>, callBackSubmit: () => void) =>
  form(person, schemaPerson, { submission: { action: async () => callBackSubmit() } });
```

> ⚠️ Signal Forms require concrete initial values — never `null`/`undefined` for string fields. Use `''`.

### Step 2 — Update the form component

In `form.ts`, replace the reactive setup with signal APIs. `linkedSignal` keeps the model synced with the `person` input automatically — so **no** `constructor`/`effect` is needed:

```typescript
import { input, linkedSignal } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { createPeopleForm, Person } from './people-form';

const DEFAULT_PERSON: Person = {
  id: '',
  photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
};

export class Form {
  person = input<Person>(DEFAULT_PERSON);
  defaultPersonForm = linkedSignal(this.person);
  peopleForm = createPeopleForm(this.defaultPersonForm, () => this.submit());

  submit(): void {
    this.save.emit(this.peopleForm().value());
  }
}
```

### Step 3 — Update the template

In `form.html`, swap reactive directives for signal ones:

- `[formGroup]="peopleForm"` → `[formRoot]="peopleForm"` and drop `(ngSubmit)` — `[formRoot]` uses the `submission` action from `createPeopleForm`
- every `formControlName="x"` → `[formField]="peopleForm.x"`
- error checks become loops over `errors()`:

```html
<input type="text" matInput placeholder="First name" [formField]="peopleForm.firstname" />

@for (error of peopleForm.firstname().errors(); track error.kind) {
  <mat-error>{{ error.message }}</mat-error>
}

<button type="submit" [disabled]="peopleForm().invalid()">Save</button>
```

### Step 4 — Field state: call the field

The golden rule: **call** a field as a function to reach its state signals.

```typescript
peopleForm.firstname;          // FormField — structural, no state here
peopleForm.firstname();        // FieldState — has value(), errors(), touched()…
peopleForm.firstname().value(); // the actual string value
```

In the template it's the same: `peopleForm.firstname().errors()`, not `peopleForm.firstname.errors()`.

## ▶️ Run & verify

```bash
npm run client -- 19-signal-form
```

Open the form and check:

- [ ] Validation messages appear for invalid fields
- [ ] Editing a person pre-fills the form
- [ ] Save stays disabled while the form is invalid

Run the unit tests:

```bash
npm run test -- 19-signal-form-solution
```

## 💡 Key concepts

| | Reactive Forms | Signal Forms |
| --- | --- | --- |
| Source of truth | `FormGroup` / `FormControl` | Writable `signal` model |
| Template binding | `[formGroup]` + `formControlName` | `[formRoot]` + `[formField]` |
| Validation | `Validators` on controls | Schema fns (`required`, `email`, `pattern`…) |
| Reading value | `form.getRawValue()` | `form().value()` |
| Checking validity | `form.invalid` (property) | `form().invalid()` (signal) |
| Syncing input data | `effect` + `patchValue` | `linkedSignal` on the model |
| Error messages | `control.errors?.['required']` | `field().errors()` array (`kind`, `message`) |

## 🧯 Troubleshooting

- **`Property 'errors' does not exist on type 'FormField'`** — you forgot to call the field: `peopleForm.firstname().errors()`.
- **Form doesn't react to `person` changes** — use `linkedSignal(this.person)` as the model passed to `createPeopleForm`.
- **Validation never runs** — the schema must use the path (`person.firstname`), not a call (`person.firstname()`).
- **Runtime `undefined` errors** — initialize every `Person` field to `''`, not `null`.
- **Submit doesn't emit `save`** — `[formRoot]` must be on `<form>` and `submission.action` configured in `createPeopleForm`.
