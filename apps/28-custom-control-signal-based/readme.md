# 28-custom-control-signal-based (dossier apps/28-custom-control-signal-based)

In this exercise, you'll learn how to create a custom form control for Angular Signal Forms using the `FormValueControl` interface. You'll extract the repeated `mat-form-field` markup into a reusable `SfeirCustomInput` component that integrates seamlessly with `[formField]` bindings.

## What Are Custom Signal Form Controls?

Signal Forms provide a model-driven API built on Angular signals. Custom controls participate in this system by implementing `FormValueControl` (for single-value fields) or `FormCheckboxControl` (for booleans). Unlike the legacy `ControlValueAccessor` approach, you only need to expose the right **models** and **inputs** — Angular's `[formField]` directive handles the wiring.

A `FormValueControl` can:

- Two-way bind its `value` model to the parent form field
- React to validation state via optional inputs (`invalid`, `errors`, `required`…)
- Track interaction state via a `touched` model
- Support disabled states via a `disabled` input

## What You'll Build

A `SfeirCustomInput` component that:

- Works with Angular Signal Forms via `[formField]`
- Supports different input types (text, email, password, etc.)
- Shows validation messages when the input is invalid and touched
- Integrates with the `sfeirPhoneSecret` structural directive from the previous exercise

## Step 1: Create the Custom Input Component

Create a new file `custom-input.ts` in the `shared/components/custom-input` directory with the following imports:

```typescript
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { disabled, form, FormField, FormValueControl, ValidationError } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
```

## Step 2: Implement the `FormValueControl` Interface

Create the component and implement `FormValueControl<string>`:

```typescript
@Component({
  selector: 'sfeir-custom-input',
  template: `
    <mat-form-field appearance="outline" subscriptSizing="dynamic" [class.mat-form-field-invalid]="invalid() && touched()">
      <mat-label>{{ inputPlaceholder() }}</mat-label>
      <input matInput [type]="inputType()" [placeholder]="inputPlaceholder()" (blur)="touched.set(true)" [formField]="inputField" />
    </mat-form-field>

    @if (invalid() && touched()) {
      @for (error of errors(); track error.kind) {
        <mat-error>{{ error.message }}</mat-error>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, FormField],
})
export class SfeirCustomInput implements FormValueControl<string> {
  value = model<string>('');
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  invalid = input<boolean>(false);
  disabled = input<boolean>(false);
  touched = model<boolean>(false);
  inputPlaceholder = input<string>();
  inputType = input<string>();

  inputField = form<string>(this.value, inputField => {
    disabled(inputField, this.disabled);
  });
}
```

This component:

- Exposes a `value` model — the only **required** part of `FormValueControl`
- Receives form state (`errors`, `invalid`, `disabled`) as optional inputs fed automatically by `[formField]`
- Tracks `touched` locally and sets it on blur
- Uses an internal `form()` for the native `<input>` binding and disabled state

## Step 3: Understanding `FormValueControl`

The `[formField]` directive detects components implementing `FormValueControl` and two-way binds the parent field value to your `value` model — exactly like a native input.

| Property / input                        | Role                                                |
| --------------------------------------- | --------------------------------------------------- |
| `value` (model, required)               | Holds the field value, synced with the parent form  |
| `touched` (model, optional)             | Tracks whether the user interacted with the control |
| `disabled` (input, optional)            | Reflects the form's disabled state                  |
| `invalid` / `errors` (inputs, optional) | Reflect validation state from the schema            |

> Validation rules stay in the **form schema** (`people-form.ts`). The control only **displays** `invalid()` and `errors()`.

## Step 4: Use the Custom Input in the Form Component

Update `form.ts` to import `SfeirCustomInput` and add it to the component's `imports` array.

Then replace the `mat-form-field` blocks in `form.html` with:

```html
<sfeir-custom-input [formField]="peopleForm.firstname" inputPlaceholder="First name" inputType="text" />
<sfeir-custom-input [formField]="peopleForm.lastname" inputPlaceholder="Last name" inputType="text" />
<sfeir-custom-input [formField]="peopleForm.email" inputPlaceholder="Email" inputType="email" />
<sfeir-custom-input [formField]="peopleForm.phone" inputPlaceholder="Phone" *sfeirPhoneSecret="let type" [inputType]="type" />
```

Notice how:

- The custom input is used with `[formField]` just like a native input
- Validation messages are rendered inside the control when `invalid()` and `touched()` are true
- The phone input combines the custom control with the `sfeirPhoneSecret` structural directive

## Step 5: Style the Form

Add component styles so the custom input stretches to the full width of its container:

```scss
:host {
  width: 100%;

  mat-form-field {
    width: 100%;
  }
}
```

## Step 6: Test Your Implementation

Verify your work by running the application:

```bash
npm run client -- 28-custom-control-signal-based
```

Test the functionality by:

1. Navigating to a form with your custom inputs
2. Entering values in the fields
3. Observing validation messages when fields lose focus
4. Testing the phone field with the visibility toggle

Run the unit tests:

```bash
npx nx test 28-custom-control-signal-based-solution
```

## Key Differences from `ControlValueAccessor`

|                    | Signal Forms (`FormValueControl`) | Reactive Forms (`ControlValueAccessor`) |
| ------------------ | --------------------------------- | --------------------------------------- |
| Registration       | Automatic via `[formField]`       | Manual `NG_VALUE_ACCESSOR` provider     |
| Value binding      | `value` model                     | `writeValue` / `registerOnChange`       |
| Touched state      | `touched` model                   | `registerOnTouched` callback            |
| Validation display | `invalid` / `errors` inputs       | Read from parent `FormControl`          |
| Internal input     | `form()` + `[formField]`          | `FormControl` + `[formControl]`         |

By completing this exercise, you've learned how to build reusable custom controls for Angular Signal Forms — a simpler, signal-native alternative to the `ControlValueAccessor` pattern.
