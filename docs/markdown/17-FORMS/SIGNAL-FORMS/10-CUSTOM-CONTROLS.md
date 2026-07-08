<!-- .slide: class="transition-bg-sfeir-1" -->

# Custom controls

##==##

<!-- .slide: class="with-code inconsolata" -->

# A simpler way than `ControlValueAccessor`

Remember the `ControlValueAccessor` boilerplate for reactive forms? With **Signal Forms**, custom controls need none of it:
<br/>

- No `NG_VALUE_ACCESSOR` token, no `forwardRef`<br/><br/>
- No `writeValue` / `registerOnChange` / `registerOnTouched`<br/><br/>
- Just implement a **control interface** exposing a `model()` signal

Notes:

- Signal Forms works with any component implementing one of its control interfaces: `FormValueControl` or `FormCheckboxControl`.
- When your component implements one, the `[formField]` directive wires it up to form state, validation and data binding automatically — no adapter class.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `FormValueControl` — a single value

Implement the interface and expose a `value` **model** — that's it:

<br/>

```typescript
import { Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'sfeir-rating',
  template: `
    @for (star of [1, 2, 3, 4, 5]; track star) {
      <button type="button" (click)="value.set(star)">
        {{ star <= value() ? '★' : '☆' }}
      </button>
    }
  `,
})
export class Rating implements FormValueControl<number> {
  readonly value = model<number>(0); // 👈 the only requirement
}
```

<!-- .element: class="medium-code" -->

```html
<sfeir-rating [formField]="reviewForm.rating" />
```

<!-- .element: class="small-code" -->

Notes:

- A `FormValueControl` must expose a `value` model and must **not** declare a `checked` property.
- The `[formField]` directive detects the interface and two-way binds the field value to your `value` model — exactly like a native input, and like `formControlName` did but with far less code.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `FormCheckboxControl` — a boolean

For toggles / switches / checkboxes, expose a `checked` model instead of `value`:

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

- A `FormCheckboxControl` must expose `checked` and must **not** declare `value`.
- Both interfaces extend `FormUiControl`, which exposes a rich set of **optional** inputs (next slide).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Reacting to form state (optional inputs)

Add only what your control needs — the `[formField]` directive feeds them automatically:

<br/>

```typescript
export class StatefulInput implements FormValueControl<string> {
  readonly value = model<string>('');

  // the control updates these:
  readonly touched = model<boolean>(false);

  // the form feeds these in:
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly ValidationError[]>([]);
  readonly required = input<boolean>(false);
}
```

<!-- .element: class="medium-code" -->

Notes:

- Available optional inputs: `touched`, `dirty`, `errors`, `valid`, `invalid`, `pending`, `disabled`, `disabledReasons`, `readonly`, `hidden`, `required`, `min`, `max`, `minLength`, `maxLength`, `pattern`, `name`.
- For display formatting (currency, dates...) use `linkedSignal()` to derive a display value from `value` and write it back on blur.

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
