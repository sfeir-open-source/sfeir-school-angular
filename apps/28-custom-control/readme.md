# 28-custom-control (dossier apps/28-custom-control)

In this exercise, you'll learn how to create a custom form control in Angular using the ControlValueAccessor interface. You'll implement a reusable input component that can be used with Angular's reactive forms, demonstrating how to create custom form controls that maintain full compatibility with Angular's form system.

## What Are Custom Form Controls?

Custom form controls allow you to create reusable input components that work seamlessly with Angular's form system. By implementing the ControlValueAccessor interface, your custom components can:

- Receive values from parent form controls
- Notify parent forms when values change
- Respond to form validation
- Support disabled states
- Maintain proper form lifecycle (pristine/dirty, touched/untouched)

This pattern is essential for creating consistent, reusable form elements across your application.

## What You'll Build

A `SfeirCustomInput` component that:

- Works with Angular's reactive forms
- Supports different input types (text, email, password, etc.)
- Shows validation messages when the input loses focus
- Integrates with the structural directive from the previous exercise

## Step 1: Create the Custom Input Component

Create a new file `custom-input.ts` in the `shared/components/custom-input` directory with the following imports:

```typescript
import { Component, DestroyRef, effect, forwardRef, inject, input, signal, Type } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
```

## Step 2: Create a Helper Function for ControlValueAccessor Registration

First, create a helper function that will register your component as a ControlValueAccessor:

This function:

- Takes a component type as input
- Returns a provider configuration that registers the component as a ControlValueAccessor
- Uses `forwardRef` to handle the circular reference that occurs during component registration

## Step 3: Implement the Custom Input Component

Now, create the component that will serve as your custom form control:

This component:

- Uses Angular signals for reactive state management
- Implements all required ControlValueAccessor methods
- Uses a FormControl internally to manage the input state
- Shows content (like validation messages) conditionally when the input loses focus
- Takes input type and placeholder as inputs

## Step 4: Understanding the ControlValueAccessor Interface

The ControlValueAccessor interface is the bridge between Angular forms and DOM elements. It requires implementing four methods:

1. `writeValue(value: any)`: Called by Angular when the form control value changes in the model. This updates the view with the new value.

2. `registerOnChange(fn: any)`: Registers a callback function that should be called when the control's value changes in the view.

3. `registerOnTouched(fn: any)`: Registers a callback function that should be called when the control is touched (loses focus).

4. `setDisabledState(isDisabled: boolean)`: Optional method that is called when the form control's disabled state changes.

## Step 5: Use the Custom Input in a Form Component

Now, update your form component to use the custom input:

Notice how:

- The custom input is used with `formControlName` just like a native input
- Validation messages are projected into the component using content projection
- The phone input combines the custom input with the structural directive from the previous exercise

## Step 6: Style the Form

## Step 7: Understanding Angular Signals in Custom Form Controls

This custom input uses Angular signals, a modern reactive primitive introduced in Angular 16+:

- `inputPlaceholder` and `inputType` are input signals that receive values from parent components
- `hasLooseFocus` is a writable signal that tracks whether the input has lost focus
- The `effect()` function creates a reactive effect that subscribes to form control value changes

Signals provide a more efficient and type-safe way to handle reactivity compared to traditional RxJS observables.

## Step 8: Test Your Implementation

Verify your work by running the application:

```bash
npm run client -- 28-custom-control
```

Test the functionality by:

1. Navigating to a form with your custom inputs
2. Entering values in the fields
3. Observing validation messages when fields lose focus
4. Testing the phone field with the visibility toggle

## Advanced Concepts

### Content Projection with Conditional Rendering

The custom input uses content projection (`<ng-content />`) with a conditional directive to show validation messages only when the input has lost focus:

```html
@if (hasLooseFocus()) {
<ng-content />
}
```

This pattern allows the parent component to define validation messages while the custom component controls when they're displayed.

### Combining Custom Controls with Structural Directives

The phone input demonstrates how to combine custom form controls with structural directives:

```html
<sfeir-custom-input *sfeirPhoneSecret="let type" formControlName="phone" [inputType]="type" inputPlaceholder="phone">
  <!-- Validation messages -->
</sfeir-custom-input>
```

This powerful combination allows you to create highly reusable, composable UI components.

By completing this exercise, you've learned how to create custom form controls that integrate seamlessly with Angular's form system, enhancing your ability to build reusable, maintainable form components.
