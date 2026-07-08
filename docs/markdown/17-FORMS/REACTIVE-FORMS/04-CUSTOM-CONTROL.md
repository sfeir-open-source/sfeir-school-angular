<!-- .slide: class="with-code inconsolata" -->

# Building your own form control

Imagine a custom `sfeir-dropdown` component that you want to plug into a reactive form, with all the validation power that comes with it:
<br/>

```html
<form [formGroup]="sfeirForm">
  <sfeir-dropdown formControlName="agency" />
</form>
```

<!-- .element: class="big-code" -->

<br/>

Will validation on `agency` work out of the box?

<!-- .element: class="important center" -->

Notes:

- The answer is **NO**. For a custom component to integrate with Angular's forms (`formControlName`, `ngModel`), it must implement the `ControlValueAccessor` interface.
- This interface is the bridge between the Angular forms API and the native element inside your component's view.
- Angular ships value accessors for standard HTML form elements, but for custom components you provide your own.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Step 1: register as a value accessor

Register your component with the `NG_VALUE_ACCESSOR` token so Angular knows it can act as a form control:
<br/>

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
- `multi: true` lets several components register against the `NG_VALUE_ACCESSOR` token.

##==##

<!-- .slide -->

# Step 2: implement the interface

`ControlValueAccessor` bridges the forms API and your component. You implement:
<br/>

- **writeValue**: update the view when the model changes.
- **registerOnChange**: register a callback to update the model when the view changes.
- **registerOnTouched**: register a callback for when the control is "touched".
- **setDisabledState** (optional): react to the control's disabled state.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Step 3: full implementation

```typescript
@Component({
  selector: 'sfeir-dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirDropdown), multi: true }],
})
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

  // called from the template when the user picks a value
  select(newValue: string): void {
    this.value = newValue;
    this.onChange(this.value);
    this.onTouched();
  }
}
```

<!-- .element: class="small-code" -->

Notes:

- This is a fair amount of boilerplate — the next chapter (Signal Forms) removes almost all of it.
