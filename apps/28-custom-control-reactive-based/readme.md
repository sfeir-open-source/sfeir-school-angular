# 28 · Custom Form Control (Reactive)

> Build a reusable `sfeir-custom-input` that plugs into reactive forms via `ControlValueAccessor`.

**Folder** `apps/28-custom-control-reactive-based` · **Solution** `apps/28-custom-control-reactive-based-solution` · **Run** `npm run client -- 28-custom-control-reactive-based`

## 🎯 Goal

Wrap the repeated `mat-form-field` markup into one component that behaves like a native input — usable with `formControlName`, participating in validation, and showing projected error messages on blur.

## 📚 What you'll learn

- The `ControlValueAccessor` contract that bridges your component and Angular forms
- How to register a component as a value accessor with `NG_VALUE_ACCESSOR` + `forwardRef`
- How to project validation messages conditionally with `<ng-content>`

## ✅ Before you start

- Completion of the reactive forms (19) and structural directive (27) exercises
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — A helper to register the accessor

`NG_VALUE_ACCESSOR` needs the component itself, which isn't defined yet at decoration time — hence `forwardRef`:

```typescript
const provideControlValueAccessor = <T>(component: Type<T>) => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => component),
  multi: true,
});
```

### Step 2 — Implement the control

The component wraps an internal `FormControl`, forwards its changes through the CVA callbacks, and reveals projected content once it loses focus:

```typescript
@Component({
  selector: 'sfeir-custom-input',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ inputPlaceholder() }}</mat-label>
      <input matInput [type]="inputType()" [placeholder]="inputPlaceholder()"
             [formControl]="inputValue" (blur)="markInputAsBlur()" />
      @if (hasLooseFocus()) {
        <ng-content />
      }
    </mat-form-field>
  `,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  providers: [provideControlValueAccessor(SfeirCustomInput)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfeirCustomInput implements ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);
  private _onChanged: (value: string) => void;
  private _onTouched: () => void;

  inputPlaceholder = input.required<string>();
  inputType = input.required<string>();

  inputValue = new FormControl<string | null>(null);
  hasLooseFocus = signal(false);

  constructor() {
    effect(() => {
      this.inputValue.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(value => { this._onChanged(value); this._onTouched(); });
    });
  }

  writeValue(value: string): void {
    this.inputValue.patchValue(value, { emitEvent: false });
  }
  registerOnChange(fn: (x: string) => void): void { this._onChanged = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.inputValue.disable({ emitEvent: false }) : this.inputValue.enable({ emitEvent: false });
  }

  markInputAsBlur(): void {
    this.hasLooseFocus.set(true);
    this._onTouched();
  }
}
```

### Step 3 — Use it in the form

The custom input drops in with `formControlName`, with error messages projected inside — and it composes with the `sfeirPhoneSecret` directive from exercise 27:

```html
<sfeir-custom-input formControlName="firstname" inputType="text" inputPlaceholder="First name">
  <!-- mat-error messages projected here -->
</sfeir-custom-input>

<sfeir-custom-input *sfeirPhoneSecret="let type" formControlName="phone" [inputType]="type" inputPlaceholder="phone">
  <!-- phone errors -->
</sfeir-custom-input>
```

## ▶️ Run & verify

```bash
npm run client -- 28-custom-control-reactive-based
```

Open the form and check:

- [ ] Custom inputs read/write their form values like native inputs
- [ ] Validation messages appear once a field loses focus
- [ ] The phone field keeps its visibility toggle

## 💡 Key concepts

- **`ControlValueAccessor`** — four methods bridge model ⇄ view: `writeValue` (model → view), `registerOnChange` (view → model), `registerOnTouched` (blur), `setDisabledState`.
- **`NG_VALUE_ACCESSOR` + `forwardRef`** — registers the component as *the* accessor for `formControlName`; `forwardRef` resolves the class reference that doesn't exist yet at decoration time.
- **Content projection** — `<ng-content>` lets each parent supply its own error messages, shown only after blur.

## 🧯 Troubleshooting

- **Value never syncs** — check `writeValue` and the `valueChanges` subscription both run.
- **`No value accessor for form control`** — the `providers` array is missing `provideControlValueAccessor(SfeirCustomInput)`.
- **Errors show immediately** — they should be gated by `@if (hasLooseFocus())`, set in `markInputAsBlur()`.

> 👉 Compare with the **signal-based** approach in `28-custom-control-signal-based` — far less boilerplate.
