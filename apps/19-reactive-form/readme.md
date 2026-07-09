# 19 · Reactive Forms

> Convert the template-driven person form into a typed, class-driven reactive form.

**Folder** `apps/19-reactive-form` · **Solution** `apps/19-reactive-form-solution` · **Run** `npm run client -- 19-reactive-form`

## 🎯 Goal

Move the form's structure and validation out of the template and into a strongly-typed `FormGroup`. Reactive forms give you better typing, easier testing and a single source of truth in the component.

## 📚 What you'll learn

- The difference between template-driven and reactive forms
- How to build a typed `FormGroup` with `FormControl` and `Validators`
- How to bind the model with `formControlName` and sync inputs with an `effect`

## ✅ Before you start

- Completion of the template-driven form exercises (16–18)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Swap the module

In `form.ts`, replace `FormsModule` with `ReactiveFormsModule` in the `imports`.

### Step 2 — Define a typed form model

Create `people-form.ts` in `shared/components/form`:

```typescript
import { FormControl, FormGroup, Validators } from '@angular/forms';

type Controls = {
  id: FormControl<string>;
  photo: FormControl<string>;
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
};

export class PersonForm extends FormGroup<Controls> {
  constructor() {
    super({
      id: new FormControl('', { nonNullable: true }),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg', { nonNullable: true }),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/\d{10}/)]),
    });
  }
}

export type Person = ReturnType<PersonForm['getRawValue']>;
```

### Step 3 — Drive the component from the form

In `form.ts`, instantiate the form, keep it in sync with the `person` input via an `effect`, and emit its value on submit:

```typescript
export class Form {
  person = input<Person>({ photo: 'https://randomuser.me/api/portraits/lego/6.jpg' } as Person);
  cancel = output<void>();
  save = output<Person>();

  peopleForm = new PersonForm();

  constructor() {
    effect(() => {
      const person = this.person();
      if (person) {
        this.peopleForm.patchValue(person, { emitEvent: false });
      }
    });
  }

  submit(): void {
    this.save.emit(this.peopleForm.getRawValue());
  }
}
```

### Step 4 — Bind the template

In `form.html`, wrap the form with `[formGroup]="peopleForm"` and replace every `[(ngModel)]` with `formControlName`. Gate submit on `peopleForm.invalid`:

```html
<form [formGroup]="peopleForm" (ngSubmit)="submit()">
  <input type="text" matInput placeholder="First name" formControlName="firstname" />
  <!-- …other controls… -->
  <button mat-button color="primary" type="submit" [disabled]="peopleForm.invalid">Save</button>
</form>
```

## ▶️ Run & verify

```bash
npm run client -- 19-reactive-form
```

Open the Add/Edit dialog and check:

- [ ] Validation behaves as before (required, min length, phone pattern)
- [ ] The form pre-fills when editing (thanks to the `effect` + `patchValue`)
- [ ] Save emits the typed value and Save is disabled while invalid

## 💡 Key concepts

| | Template-driven | Reactive |
| --- | --- | --- |
| Where the form lives | Template (`ngModel`) | Component class (`FormGroup`) |
| Typing | Implicit | Explicit & strong |
| Best for | Simple forms | Complex/dynamic/tested forms |

- **`nonNullable: true`** — keeps controls from resetting to `null`, so `getRawValue()` stays typed as `string`.
- **`patchValue(…, { emitEvent: false })`** — updates the form without re-triggering `valueChanges`, avoiding feedback loops with the `effect`.

## 🧯 Troubleshooting

- **`formControlName must be used with a parent formGroup`** — add `[formGroup]="peopleForm"` on the `<form>` and import `ReactiveFormsModule`.
- **Form doesn't pre-fill** — verify the `effect` reads `person()` and calls `patchValue`.
- **Validation missing** — the validators are now in `PersonForm`, not the template.
