<!-- .slide: class="with-code inconsolata" -->

# Implementing ControlValueAccessor

## Frist Provide the ControlValueAccessor

- Register your component with the `NG_VALUE_ACCESSOR` injection token. <br/><br/>
- This tells Angular that this component can function as a form control. <br/><br/>

```typescript
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sfeir-dropdown',
  templateUrl: './dropdown.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirDropdownComponent), multi: true }],
})
export class SfeirDropdownComponent implements ControlValueAccessor {
  // ... implementation follows
}
```

<!-- .element: class="medium-code" -->

Notes:

- `forwardRef` is needed because the class `SfeirDropdownComponent` is referenced within its own decorator metadata before it has been fully defined.
- `multi: true` allows multiple components to register with the `NG_VALUE_ACCESSOR` token.

##==##

<!-- .slide -->

# Step 2: Implement the ControlValueAccessor Interface

- This interface acts as a bridge between the Angular forms API and your component. <br/><br/>
- You must implement these methods:
  - **writeValue**: Updates the view when the model changes.
  - **registerOnChange**: Registers a callback to update the model when the view changes.
  - **registerOnTouched**: Registers a callback for when the control is 'touched'.
  - **setDisabledState** (optional): Handles the control's disabled state.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Step 3: Complete Implementation Example

This example shows how the methods work together.

```typescript
@Component({
  selector: 'sfeir-dropdown',
  templateUrl: './dropdown.html',
  styleUrls: './dropdown.css',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirDropdownComponent), multi: true }],
})
export class SfeirDropdownComponent implements ControlValueAccessor {
  value: any;
  disabled = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Called by Angular to update the view
  writeValue(value: any): void {
    this.value = value;
  }

  // Called by Angular to register a callback for model updates
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  // Called by Angular to register a callback for the touched state
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Called by Angular when the control's disabled state changes
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Example of how to update the model from the view
  handleInput(newValue: any) {
    this.value = newValue;
    this.onChange(this.value);
    this.onTouched();
  }
}
```

<!-- .element: class="small-code" -->
