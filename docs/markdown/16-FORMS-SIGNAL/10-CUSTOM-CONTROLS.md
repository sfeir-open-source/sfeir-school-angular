<!-- .slide: class="transition-bg-sfeir-1" -->

# Custom controls

##==##

<!-- .slide -->

# The problem: four near-identical blocks

Look back at Part 1's `signal-form.html`: first name, last name, email and phone are each wrapped in the same `<mat-form-field>` + `<mat-label>` + `<input matInput [formField]="...">` + `<mat-error>` markup, reading the same `touched()`/`invalid()`/`errors()` trio every time.

<br/><br/>

Signal Forms doesn't require `[formField]` to target a native `<input>` — it can target **any component** implementing a control interface. That's `<sfeir-input>`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# A simpler way than `ControlValueAccessor`

Remember the CVA boilerplate from the Reactive Forms chapter? With **Signal Forms**, custom controls need none of it:
<br/>

- No `NG_VALUE_ACCESSOR` token, no `forwardRef`<br/><br/>
- No `writeValue` / `registerOnChange` / `registerOnTouched`<br/><br/>
- Just implement a **control interface** exposing a `model()` signal

Notes:

- Signal Forms works with any component implementing one of its control interfaces: `FormValueControl` or `FormCheckboxControl`.
- When your component implements one, `[formField]` wires it up to form state, validation and data binding automatically — no adapter class.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `FormValueControl` — only `value` is mandatory

```typescript
// libs/ui/signal-form/custom-input/custom-input.ts
import { Component, model, input, output, computed } from '@angular/core';
import type { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'sfeir-input',
  imports: [FormField, MatFormFieldModule, MatInputModule],
  templateUrl: './custom-input.html',
})
export class CustomInput implements FormValueControl<string> {
  readonly value = model<string>(''); // 👈 the only requirement — a ModelSignal

  // everything below is optional, and auto-wired by [formField] when present:
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touched = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly touch = output<void>(); // emitted on blur

  // this control's own presentation inputs:
  readonly placeholder = input<string>('');
  readonly type = input<'text' | 'email' | 'tel'>('text');
}
```

<!-- .element: class="small-code" -->

```html
<sfeir-input [formField]="personForm.firstname" placeholder="First name" />
```

<!-- .element: class="small-code" -->

Notes:

- A `FormValueControl` must expose a `value` model and must **not** declare a `checked` property (that's `FormCheckboxControl`'s job, for booleans).
- `[formField]` detects the interface and two-way binds the field value to your `value` model — exactly like a native input, with far less markup than `formControlName` + CVA ever needed.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The nested `form<string>(this.value)` trick

`<sfeir-input>` only receives a plain `value` model from its parent — not a `FieldTree`. But its inner `<input>` still needs `[formField]` to bind to _something_. The fix: wrap `value` in its own tiny, local field tree:

<br/>

```html
<!-- custom-input.html -->
<mat-form-field>
  <mat-label>{{ placeholder() }}</mat-label>
  <input matInput [type]="type()" [formField]="_innerField" [errorStateMatcher]="_errorMatcher()" (blur)="touch.emit()" />
  <mat-error>
    @for (e of errors(); track e) {
    <span>{{ e.message }}</span>
    }
  </mat-error>
</mat-form-field>
```

<!-- .element: class="medium-code" -->

```typescript
protected readonly _innerField = form<string>(this.value); // 👈 one level below the parent form()
```

<!-- .element: class="small-code" -->

Notes:

- This isn't redundant: the outer `[formField]="personForm.firstname"` binding (on `<sfeir-input>` itself) drives `value`; the inner `[formField]="_innerField"` (on the native `<input>` inside the component) is a _second_, local form nested one level down, purely so the native input has a `FieldTree` to bind to.
- Emit `touch` on blur so `[formField]` can mark the **parent** field as touched — mirroring what a real `matInput` does automatically.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Bridging validity into Material's styling

A stock `matInput` shows red/invalid state through Material's own `NgControl` machinery — irrelevant here, since the value comes from Signal Forms. Tell it explicitly with `[errorStateMatcher]`:

<br/>

```typescript
protected readonly _errorMatcher = computed(() => ({
  isErrorState: () => this.invalid() && this.touched(),
}));
```

<!-- .element: class="medium-code" -->

<br/>

> Same idea as the `touched() && invalid()` condition gating `mat-error` in Part 1 — except here it drives Material's own styling, since the component doesn't have direct control over `matInput`'s internal state.

<!-- .element: class="important center" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# `FormCheckboxControl` — a boolean

For toggles / switches / checkboxes, expose a `checked` model instead of `value` — not used by `apps/14-signal-form`, but the natural next control to build:

<br/>

```typescript
import { Component, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'sfeir-toggle',
  template: `
    <button type="button" [class.on]="checked()" (click)="checked.set(!checked())">
      <span class="slider"></span>
    </button>
  `,
})
export class Toggle implements FormCheckboxControl {
  readonly checked = model<boolean>(false);
}
```

<!-- .element: class="medium-code" -->

Notes:

- A `FormCheckboxControl` must expose `checked` and must **not** declare `value`. Both interfaces extend `FormUiControl`, which exposes the same rich set of **optional** inputs (`disabled`, `readonly`, `required`, `min`, `max`, `pattern`, `name`...) that `[formField]` feeds in automatically when present.

##==##

<!-- .slide -->

# `ControlValueAccessor` vs Signal Forms

|                             | `ControlValueAccessor`                                  | Signal Forms                                     |
| --------------------------- | ------------------------------------------------------- | ------------------------------------------------ |
| Registration                | `NG_VALUE_ACCESSOR` + `forwardRef`                      | Implement an interface, nothing to register      |
| API                         | `writeValue` / `registerOnChange` / `registerOnTouched` | A single `model()` signal (`value` or `checked`) |
| State (disabled, errors...) | Manual wiring via `setDisabledState`, template logic    | Optional `input()` signals, auto-populated       |
| Reactivity model            | Callbacks / imperative                                  | Signals, end-to-end                              |

<br/>

> Controls **display** state. Validation lives in the **schema** — never inside the control.

Notes:

- Signal Forms is fully interoperable: existing `ControlValueAccessor` components keep working, so you can migrate incrementally.
- Prefer `FormValueControl` / `FormCheckboxControl` for any **new** custom control.
- Source: [angular.dev — Custom controls](https://angular.dev/guide/forms/signals/custom-controls)
