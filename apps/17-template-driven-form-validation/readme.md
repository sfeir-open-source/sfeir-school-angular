# 17 · Template-Driven Form Validation

> Add validation rules to the person form, surface error messages, and block submit while it's invalid.

**Folder** `apps/17-template-driven-form-validation` · **Solution** `apps/17-template-driven-form-validation-solution` · **Run** `npm run client -- 17-template-driven-form-validation`

## 🎯 Goal

Make the form from exercise 16 trustworthy: required fields, minimum lengths and a phone pattern, with clear feedback and a disabled Save button until everything is valid.

## 📚 What you'll learn

- The built-in validation attributes (`required`, `minlength`, `pattern`)
- How to read a control's validity via a template reference (`#ctrl="ngModel"`)
- How to display `mat-error` messages and gate the submit button

## ✅ Before you start

- Completion of the template-driven form exercise (16)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Add validation attributes

In `form.html`, add the rules to each control:

| Field | Rules |
| --- | --- |
| `firstname` | `required`, `minlength="2"` |
| `lastname` | `required`, `minlength="2"` |
| `email` | `required` |
| `phone` | `required`, `pattern="\d{10}"` |

### Step 2 — Show error messages

Expose each control as a template variable (`#firstname="ngModel"`) and render a `mat-error` per failed rule:

```html
<mat-form-field appearance="outline">
  <mat-label>First name</mat-label>
  <input
    type="text" matInput placeholder="First name"
    name="firstname" ngModel required minlength="2" #firstname="ngModel" />

  @if (firstname.errors?.['required']) {
    <mat-error>This field is required</mat-error>
  }
  @if (firstname.errors?.['minlength']) {
    <mat-error>This field needs at least 2 characters</mat-error>
  }
</mat-form-field>
```

Do the same for `email` (`required`) and `phone` (`required`, `pattern`).

### Step 3 — Disable submit while invalid

Bind the Save button to the form's validity:

```html
<button mat-button color="primary" type="submit" [disabled]="personForm.invalid">Save</button>
```

## ▶️ Run & verify

```bash
npm run client -- 17-template-driven-form-validation
```

Open the Add-person dialog and check:

- [ ] Errors appear under each field when the rule fails
- [ ] A non-10-digit phone triggers the pattern error
- [ ] Save stays disabled until every field is valid

## 💡 Key concepts

- **`#ctrl="ngModel"`** — exposes the control instance so the template can read `ctrl.errors`, `ctrl.valid`, `ctrl.touched`…
- **`errors?.['ruleName']`** — Angular keys errors by the failed validator (`required`, `minlength`, `pattern`); each maps to one message.
- **Form-level validity** — `personForm.invalid` aggregates all controls, ideal for gating submission.

## 🧯 Troubleshooting

- **Errors never show** — make sure each input has both `ngModel` and a `#ref="ngModel"` template variable.
- **Save never enables** — check every field's rules can actually be satisfied (e.g. `pattern="\d{10}"` needs exactly digits).
- **Pattern always fails** — the `\d{10}` value must be entered as raw digits with no spaces or separators.
