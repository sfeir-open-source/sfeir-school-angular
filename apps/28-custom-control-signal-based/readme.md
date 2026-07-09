# 28 · Custom Form Control (Signal Forms)

> Build a reusable `sfeir-custom-input` for Signal Forms with the `FormValueControl` interface.

**Folder** `apps/28-custom-control-signal-based` · **Solution** `apps/28-custom-control-signal-based-solution` · **Run** `npm run client -- 28-custom-control-signal-based`

## 🎯 Goal

Extract the repeated `mat-form-field` markup into a reusable control that integrates with `[formField]` bindings — the signal-native counterpart to the `ControlValueAccessor` approach.

## 📚 What you'll learn

- The `FormValueControl` interface and how `[formField]` auto-wires it
- Which models/inputs a custom control exposes (`value`, `touched`, `errors`, `invalid`, `disabled`)
- Why this is dramatically less boilerplate than `ControlValueAccessor`

## ✅ Before you start

- Completion of the signal forms (19-signal) and structural directive (27) exercises
- Start the mock API: `npm run server:start`

## ℹ️ What are custom Signal Form controls?

A control participates by implementing `FormValueControl` (single value) or `FormCheckboxControl` (boolean). Unlike `ControlValueAccessor`, you only expose the right **models** and **inputs** — `[formField]` handles the wiring: it two-way binds the parent field value to your `value` model, and feeds validation state in through optional inputs.

## 🛠️ Steps

### Step 1 — Implement `FormValueControl`

Create `custom-input.ts` in `shared/components/custom-input`:

```typescript
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { disabled, form, FormField, FormValueControl, ValidationError } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'sfeir-custom-input',
  template: `
    <mat-form-field appearance="outline" subscriptSizing="dynamic"
                    [class.mat-form-field-invalid]="invalid() && touched()">
      <mat-label>{{ inputPlaceholder() }}</mat-label>
      <input matInput [type]="inputType()" [placeholder]="inputPlaceholder()"
             (blur)="touched.set(true)" [formField]="inputField" />
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

- `value` is the **only required** part of `FormValueControl`
- `errors`, `invalid`, `disabled` are optional inputs fed automatically by `[formField]`
- `touched` is tracked locally and set on blur
- an internal `form()` drives the native `<input>` and disabled state

### Step 2 — Use it in the form

Add `SfeirCustomInput` to the `Form` component's `imports`, then replace the `mat-form-field` blocks in `form.html`:

```html
<sfeir-custom-input [formField]="peopleForm.firstname" inputPlaceholder="First name" inputType="text" />
<sfeir-custom-input [formField]="peopleForm.lastname" inputPlaceholder="Last name" inputType="text" />
<sfeir-custom-input [formField]="peopleForm.email" inputPlaceholder="Email" inputType="email" />
<sfeir-custom-input [formField]="peopleForm.phone" inputPlaceholder="Phone" *sfeirPhoneSecret="let type" [inputType]="type" />
```

> Validation rules stay in the **form schema** (`people-form.ts`). The control only *displays* `invalid()` and `errors()`.

### Step 3 — Style the control

```scss
:host {
  width: 100%;
  mat-form-field { width: 100%; }
}
```

## ▶️ Run & verify

```bash
npm run client -- 28-custom-control-signal-based
```

Open the form and check:

- [ ] The custom inputs read/write field values through `[formField]`
- [ ] Errors appear only when a field is `invalid()` **and** `touched()`
- [ ] The phone field keeps its visibility toggle

Run the unit tests:

```bash
npm run test -- 28-custom-control-signal-based-solution
```

## 💡 Key concepts

| | Signal Forms (`FormValueControl`) | Reactive (`ControlValueAccessor`) |
| --- | --- | --- |
| Registration | Automatic via `[formField]` | Manual `NG_VALUE_ACCESSOR` provider |
| Value binding | `value` model | `writeValue` / `registerOnChange` |
| Touched state | `touched` model | `registerOnTouched` callback |
| Validation display | `invalid` / `errors` inputs | read from parent `FormControl` |
| Internal input | `form()` + `[formField]` | `FormControl` + `[formControl]` |

## 🧯 Troubleshooting

- **Value doesn't bind** — `value` must be a `model()`, and the parent must use `[formField]="peopleForm.x"`.
- **Errors always/never show** — gate them with `@if (invalid() && touched())`; set `touched` on `(blur)`.
- **Disabled state ignored** — apply `disabled(inputField, this.disabled)` inside the internal `form()`.
