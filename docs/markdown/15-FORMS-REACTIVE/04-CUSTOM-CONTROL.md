<!-- .slide -->

# Bonus: plugging a custom component into a reactive form

Second part of `apps/13-reactive-form`'s lab, but useful depth: imagine a custom `sfeir-dropdown` component you want to use exactly like a native input, with all the validation power that comes with it.

<br/>

```html
<form [formGroup]="personForm">
  <sfeir-dropdown formControlName="agency" />
</form>
```

<!-- .element: class="big-code" -->

<br/>

Will `formControlName` work out of the box on a component you wrote yourself?

<!-- .element: class="important center" -->

Notes:

- No. For a custom component to integrate with `formControlName`/`ngModel`, it must implement the `ControlValueAccessor` interface — the bridge between Angular's forms API and the native element inside your component's own view.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Step 1: register as a value accessor

```typescript
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sfeir-dropdown',
  templateUrl: './dropdown.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirDropdown), multi: true }],
})
export class SfeirDropdown implements ControlValueAccessor {
  // ... implementation follows
}
```

<!-- .element: class="medium-code" -->

Notes:

- `forwardRef` is needed because `SfeirDropdown` is referenced in its own decorator metadata, before the class is fully defined.
- `multi: true` lets several components register against the same `NG_VALUE_ACCESSOR` token.

##==##

<!-- .slide -->

# Step 2: implement the interface

- **writeValue**: update the view when the model changes.
- **registerOnChange**: register a callback to update the model when the view changes.
- **registerOnTouched**: register a callback for when the control is "touched".
- **setDisabledState** (optional): react to the control's disabled state.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Step 3: full implementation

```typescript
export class SfeirDropdown implements ControlValueAccessor {
  value: string | null = null;
  disabled = false;

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value; // model -> view
  }
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn; // view -> model
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  select(newValue: string): void {
    this.value = newValue;
    this.onChange(this.value);
    this.onTouched();
  }
}
```

<!-- .element: class="small-code" -->

Notes:

- This is a fair amount of boilerplate for what is conceptually a single value flowing in and out — the Signal Forms chapter later in this training removes almost all of it with a single `model()` signal.
