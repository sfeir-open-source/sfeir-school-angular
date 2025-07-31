# Exercise 27: Creating a Structural Directive in Angular

In this exercise, you'll learn how to create a custom structural directive in Angular. You'll implement a directive that adds a toggle button to hide/show sensitive information like phone numbers, demonstrating how structural directives can enhance your UI with reusable behaviors.

## What Are Structural Directives?

Structural directives are a powerful feature in Angular that modify the DOM layout by adding, removing, or manipulating elements. Unlike attribute directives that change the appearance or behavior of an existing element, structural directives actually change the structure of the DOM.

Common built-in structural directives include:

- `*ngIf` - conditionally adds or removes elements
- `*ngFor` - repeats elements for each item in an array
- `*ngSwitch` - conditionally displays one element from a set

Keep in mind the structural directives above are deprecated, and now you should use the @-block

All structural directives use the asterisk (\*) prefix syntax, which is syntactic sugar for a more complex template transformation.

## What You'll Build

A `*sfeirPhoneSecret` directive that:

- Allows toggling between showing a phone number as plain text or as a password
- Adds a visibility toggle button next to the input field
- Demonstrates advanced directive techniques with component creation

## Step 1: Create the Directive File

Create a new file `phone-secret.ts` in the `shared/directives` directory with the following imports:

```typescript
import { Component, Directive, inject, input, inputBinding, signal, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
```

## Step 2: Create a Helper Component

First, create a helper component that will be dynamically created by our directive. This component will render both the original input and a toggle button:

```typescript
@Component({
  imports: [MatIconModule, NgTemplateOutlet, MatButtonModule],
  template: `
    <div class="container-field-icon">
      <ng-container *ngTemplateOutlet="templateRef(); context: { $implicit: type() }" />
      <button type="button" matIconButton (click)="changeVisibility($event)" name="change-visibility">
        <mat-icon>{{ type() === 'text' ? 'visibility' : 'disabled_visible' }}</mat-icon>
      </button>
    </div>
  `,
  styles: `
    .container-field-icon {
      display: flex;
      gap: 1rem
    }
  `,
})
class Phone {}
```

This component:

- Takes a `templateRef` input that will receive the original template
- Uses a signal to track the current input type ('text' or 'password')
- Provides a method to toggle between visibility states
- Uses `NgTemplateOutlet` to render the original template with the current type as context

## Step 3: Implement the Structural Directive

Now, create the actual structural directive that will use the helper component:

This directive:

- Uses the selector `[sfeirPhoneSecret]` to match elements with the `*sfeirPhoneSecret` attribute
- Injects the `TemplateRef` which contains the host element and its attributes
- Injects the `ViewContainerRef` which represents the container where views can be attached
- Creates an instance of the `Phone` component and binds the template reference to it

## Step 4: Use the Directive in a Form

Apply your directive to an input field in your form:

```html
<mat-form-field appearance="outline">
  <mat-label>Phone</mat-label>
  <input *sfeirPhoneSecret="let type" [type]="type" matInput placeholder="phone" name="phone" formControlName="phone" required pattern="\d{10}" />
  <!-- Error messages -->
</mat-form-field>
```

The `*sfeirPhoneSecret="let type"` syntax:

- Creates a template from the host element (the input)
- Defines a variable `type` that will receive the `$implicit` value from the context
- Binds this variable to the input's `[type]` property

## Step 5: Understanding the Magic Behind Structural Directives

### The Asterisk (\*) Syntax

When you write `*sfeirPhoneSecret="let type"`, Angular transforms it to:

```html
<ng-template [sfeirPhoneSecret]="">
  <input [type]="type" ... />
</ng-template>
```

This is why structural directives receive a `TemplateRef` - it's the content inside the generated `ng-template`.

### The Context Object

The `{ $implicit: type() }` context object allows the directive to pass data to the template. The `$implicit` property is what gets bound to the variable in `let type`.

### Component Creation vs. Embedded View

This directive uses `createComponent()` instead of the more common `createEmbeddedView()` approach. This allows us to:

1. Create a wrapper component with additional UI elements (the toggle button)
2. Maintain state (the current visibility type)
3. Add behavior (the toggle functionality)

## Step 6: Test Your Implementation

Verify your work by running the application:

```bash
npm run client -- 27-structural-directive
```

Test the functionality by:

1. Navigating to a form with a phone field
2. Entering a phone number
3. Clicking the visibility toggle button to switch between text and password modes

## Advanced Concepts

### Input Binding

The `inputBinding()` function is a modern Angular API that creates a binding between a component input and a value provider. It's used here to connect the directive's template reference to the component's input.

### ViewContainerRef

The `ViewContainerRef` represents a container where one or more views can be attached. It's a key part of dynamic UI manipulation in Angular, allowing for programmatic creation of components and views.

By completing this exercise, you've learned how to create a powerful structural directive that enhances form inputs with additional functionality while maintaining a clean, reusable interface.
