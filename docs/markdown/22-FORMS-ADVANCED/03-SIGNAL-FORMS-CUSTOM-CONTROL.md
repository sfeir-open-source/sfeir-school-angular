<!-- .slide: class="with-code inconsolata" -->

# A simpler way: Signal Forms

With **Signal Forms** (`@angular/forms/signals`, stable since Angular v22), custom controls no longer need `ControlValueAccessor`.
<br/><br/>

- No `NG_VALUE_ACCESSOR` token, no `forwardRef`<br/><br/>
- No `writeValue` / `registerOnChange` / `registerOnTouched` boilerplate<br/><br/>
- Just implement a plain **control interface** exposing a `model()` signal

<!-- .element: class="medium-code" -->

Notes:

- Signal Forms works with any component that implements one of its **control interfaces**: `FormValueControl` or `FormCheckboxControl`.
- When your component implements one of these, the `[formField]` directive automatically wires it up to form state, validation, and data binding — no adapter class required.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `FormValueControl` — our dropdown, revisited

Expose a `value` **model** signal instead of implementing `ControlValueAccessor`:
<br/>

```typescript
import { Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'sfeir-dropdown',
  templateUrl: './dropdown.html',
})
export class SfeirDropdownComponent implements FormValueControl<string> {
  readonly value = model<string>(''); // 👈 the only requirement
}
```

<!-- .element: class="medium-code" -->

```angular181html
<sfeir-dropdown [formField]="sfeirForm.agency" />
```

<!-- .element: class="small-code" -->

Notes:

- `FormValueControl` is the interface for most inputs: text, number, date, select, custom dropdowns... anything editing a single value.
- A control implementing `FormValueControl` must **not** declare a `checked` property.
- The `[formField]` directive detects the interface and internally binds `sfeirForm.agency().value()` to your `value` model — exactly like `formControlName` did, but with far less code.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `FormCheckboxControl` — booleans

For toggles / switches / checkboxes, expose `checked` instead of `value`:
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
export class SfeirToggleComponent implements FormCheckboxControl {
  readonly checked = model<boolean>(false);
}
```

<!-- .element: class="medium-code" -->

Notes:

- A `FormCheckboxControl` must expose `checked` and must **not** declare `value`.
- Both interfaces extend a common base, `FormUiControl`, which offers a rich set of **optional** signals to react to form state (next slide).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Reacting to form state

Add only the optional inputs your control actually needs — the `[formField]` directive feeds them automatically:
<br/>

```typescript
export class SfeirDropdownComponent implements FormValueControl<string> {
  readonly value = model<string>('');

  // the control updates these
  readonly touched = model<boolean>(false);

  // the form feeds these in
  readonly disabled = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly errors = input<readonly ValidationError[]>([]);
  readonly required = input<boolean>(false);
}
```

<!-- .element: class="medium-code" -->

Notes:

- Full list of optional inputs: `touched`, `dirty`, `errors`, `valid`, `invalid`, `pending`, `disabled`, `disabledReasons`, `readonly`, `hidden`, `required`, `min`, `max`, `minLength`, `maxLength`, `pattern`, `name`.
- For value transformation (currency, formatted dates...), derive a display value from `value` with `linkedSignal()` and write back to `value` on blur.
- To support `debounce('blur')`, emit an `output()` named `touch` on the native `blur` event.

##==##

<!-- .slide -->

# ControlValueAccessor vs. Signal Forms

|                             | `ControlValueAccessor`                                  | Signal Forms                                     |
| --------------------------- | ------------------------------------------------------- | ------------------------------------------------ |
| Registration                | `NG_VALUE_ACCESSOR` + `forwardRef`                      | Implement an interface, nothing to register      |
| API                         | `writeValue` / `registerOnChange` / `registerOnTouched` | A single `model()` signal (`value` or `checked`) |
| State (disabled, errors...) | Manual wiring via `setDisabledState`, template logic    | Optional `input()` signals, auto-populated       |
| Reactivity model            | Callbacks / imperative                                  | Signals, end-to-end                              |

<br/>

> Validation still lives in the **schema**, never inside the control — the control only **displays** `invalid()` / `errors()`.

Notes:

- Signal Forms is fully interoperable: existing `ControlValueAccessor` components keep working, so you can migrate incrementally.
- Prefer `FormValueControl` / `FormCheckboxControl` for any **new** custom control going forward.
- Source: [angular.dev — Custom controls](https://angular.dev/guide/forms/signals/custom-controls)
