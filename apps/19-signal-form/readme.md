# Exercise 19-signal-form (folder apps/19-signal-form)

In this workshop, you'll learn how to create a Signal Form in Angular. You'll transform the existing reactive form from the previous exercise into a signal-based form, which offers a model-driven API built on Angular signals with schema-based validation.

## What Are Signal Forms?

Signal Forms manage form state using Angular signals. Your data model is a writable `signal`, wrapped by `form()` into a **field tree** that mirrors its shape. Validation rules live in a **schema function**, and everything you read back (`value`, `valid`, `errors`, `touched`…) is a signal.

Key benefits over reactive forms:

- The model signal is the single source of truth — no manual `patchValue` or `valueChanges` subscriptions
- Type-safe field access inferred from the model shape
- Schema-based validation declared once, co-located with the form
- Native two-way binding via the `[formField]` directive

## What You'll Build

You'll migrate the people form from `FormGroup` / `FormControl` to Signal Forms:

- A `createPeopleForm` factory with a validation schema
- A form component using `linkedSignal` to react to `person` input changes
- A template bound with `[formRoot]` and `[formField]` instead of `[formGroup]` and `formControlName`

## Step 1: Rewrite the Form Model

In `people-form.ts`, replace the `PersonForm` class (based on `FormGroup`) with a signal form schema.

1. Remove the `FormControl` / `FormGroup` / `Validators` imports from `@angular/forms`
2. Import from `@angular/forms/signals`:

   ```typescript
   import { WritableSignal } from '@angular/core';
   import { apply, email, form, minLength, pattern, required, schema } from '@angular/forms/signals';
   ```

3. Define the `Person` type as a plain interface:

   ```typescript
   export type Person = {
     id: string;
     photo: string;
     firstname: string;
     lastname: string;
     email: string;
     phone: string;
   };
   ```

4. Extract a reusable schema for name fields:

   ```typescript
   export const namesSchema = schema<string>(names => {
     required(names, { message: 'This field is required' });
     minLength(names, 2, { message: 'This field must be at least 2 characters long' });
   });
   ```

5. Define the person schema and export a factory function:

   ```typescript
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

> **Important:** Signal Forms require concrete initial values — never use `null` or `undefined` for string fields. Use `''` instead.

## Step 2: Update the Form Component

In `form.ts`, replace the reactive form setup with signal form APIs.

1. Replace `ReactiveFormsModule` with `FormField` and `FormRoot` from `@angular/forms/signals`
2. Import `linkedSignal` from `@angular/core`
3. Import `createPeopleForm` and `Person` from `./people-form`
4. Define a default person with all fields initialized to empty strings:

   ```typescript
   const DEFAULT_PERSON: Person = {
     id: '',
     photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
     firstname: '',
     lastname: '',
     email: '',
     phone: '',
   } satisfies Person;
   ```

5. Replace the `PersonForm` instance and `effect` with:

   ```typescript
   person = input<Person>(DEFAULT_PERSON);

   defaultPersonForm = linkedSignal(this.person);

   peopleForm = createPeopleForm(this.defaultPersonForm, () => this.submit());
   ```

6. Update `submit()` to emit the signal form value:

   ```typescript
   submit(): void {
     this.save.emit(this.peopleForm().value());
   }
   ```

7. Remove the `constructor` and its `effect` — `linkedSignal` keeps the form model in sync with the `person` input automatically.

## Step 3: Update the Form Template

In `form.html`, replace reactive form directives with signal form directives.

1. Replace `[formGroup]="peopleForm"` with `[formRoot]="peopleForm"` and remove `(ngSubmit)="submit()"` — `[formRoot]` handles native submit automatically via the `submission` option declared in `createPeopleForm`
2. Replace all `formControlName` attributes with `[formField]` bindings:

   ```html
   <input type="hidden" [formField]="peopleForm.photo" /> <input type="text" matInput placeholder="First name" [formField]="peopleForm.firstname" />
   ```

3. Update validation error display. Replace reactive form error checks:

   ```html
   @if (peopleForm.controls.firstname.errors?.['required']) { ... }
   ```

   With signal form error loops:

   ```html
   @for (error of peopleForm.firstname().errors(); track error.kind) {
   <mat-error>{{ error.message }}</mat-error>
   }
   ```

4. Update the submit button disabled state:

   ```html
   <!-- Before -->
   [disabled]="peopleForm.invalid"

   <!-- After -->
   [disabled]="peopleForm().invalid()"
   ```

## Step 4: Understanding Field State

A key concept in Signal Forms: you must **call** a field as a function to access its state signals.

```typescript
peopleForm.firstname; // FormField — structural, no state signals here
peopleForm.firstname(); // FieldState — has value(), errors(), touched()...
peopleForm.firstname().value(); // the actual string value
```

In the template, the same rule applies: `peopleForm.firstname().errors()` not `peopleForm.firstname.errors()`.

## Testing Your Work

1. Run the application:

   ```bash
   npm run client -- 19-signal-form
   ```

2. Click the "+" button to open the form
3. Fill out the form and submit it
4. Verify that validation messages appear for invalid fields
5. Edit an existing person and confirm the form is pre-filled with their data
6. Check that the Save button stays disabled while the form is invalid

Run the unit tests:

```bash
npx nx test 19-signal-form-solution
```

## Troubleshooting

- If you see `Property 'errors' does not exist on type 'FormField'`, you forgot to call the field: use `peopleForm.firstname().errors()` instead of `peopleForm.firstname.errors()`
- If the form doesn't update when `person` input changes, make sure you're using `linkedSignal(this.person)` as the model passed to `createPeopleForm`
- If validation doesn't run, check that your schema function uses the correct path (`person.firstname`, not `person.firstname()`)
- If you get runtime errors about `undefined` fields, ensure all `Person` properties are initialized to `''` (not `null`)
- If submit doesn't trigger `save`, verify `[formRoot]` is set on the `<form>` element and the `submission.action` callback is configured in `createPeopleForm`

## Key Differences Between Reactive and Signal Forms

|                    | Reactive Forms                    | Signal Forms                                         |
| ------------------ | --------------------------------- | ---------------------------------------------------- |
| Source of truth    | `FormGroup` / `FormControl`       | Writable `signal` model                              |
| Template binding   | `[formGroup]` + `formControlName` | `[formRoot]` + `[formField]`                         |
| Validation         | `Validators` on controls          | Schema function with `required`, `email`, `pattern`… |
| Reading value      | `form.getRawValue()`              | `form().value()`                                     |
| Checking validity  | `form.invalid` (property)         | `form().invalid()` (signal)                          |
| Syncing input data | `effect` + `patchValue`           | `linkedSignal` on the model                          |
| Error messages     | `control.errors?.['required']`    | `field().errors()` array with `kind` and `message`   |

By completing this exercise, you've learned how to build type-safe, signal-native forms — the recommended approach for new Angular applications.
