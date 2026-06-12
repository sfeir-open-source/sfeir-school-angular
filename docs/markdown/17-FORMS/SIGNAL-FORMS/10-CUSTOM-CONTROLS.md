<!-- .slide: class="transition-bg-sfeir-1" -->

# Custom controls

##==##

<!-- .slide: class="with-code inconsolata" -->

# `FormValueControl` — a single value

Implement the interface and expose a `value` **model** — no `ControlValueAccessor` needed:

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

```angular181html
<sfeir-rating [formField]="reviewForm.rating" />
```

<!-- .element: class="small-code" -->

Notes:

- A `FormValueControl` must expose a `value` model and must **not** declare a `checked` property.
- The `[formField]` directive detects the interface and two-way binds the field value to your `value` model — exactly like a native input.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `FormCheckboxControl` — a boolean

For toggles / switches, expose a `checked` model instead of `value`:

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

Add only what your control needs — the directive feeds them automatically:

<br/>

```typescript
export class StatefulInput implements FormValueControl<string> {
  readonly value = model<string>('');

  // control updates these:
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
- For display formatting (currency, dates...) use `linkedSignal()` to derive a display value from `value` and write back on blur.

##==##

<!-- .slide -->

# Custom controls — best practice

> Controls **display** state. Validation lives in the **schema**.

<br/><br/>

- ✅ Define rules with `required`, `min`, `validate`... in the form schema<br/><br/>
- ✅ Let the control render `invalid()` / `errors()` / constraint hints<br/><br/>
- ❌ Don't put validation logic inside the control component<br/><br/>
- ♻️ Legacy `ControlValueAccessor` components still work for interop — but prefer `FormValueControl` for new controls

Notes:

- Keeping validation in the schema keeps it testable, reusable, and co-located with the rest of the form's rules — and the same control can be reused across forms with different rules.
