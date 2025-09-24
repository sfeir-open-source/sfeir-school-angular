# Exercise 25: Template Teleportation in Angular (folder apps/25-teleportation)

In this workshop, you'll implement template teleportation by moving the header template from the app component into a dedicated header component using Angular's template reference and outlet features. This technique allows for more flexible and reusable component architectures.

## What is Template Teleportation?

Template teleportation is a pattern where a template defined in one component can be rendered in another component. This is particularly useful for:

- Creating reusable layout components
- Implementing content projection with specific templates
- Building flexible component architectures

Angular provides powerful tools for this with `ng-template`, `TemplateRef`, and `ngTemplateOutlet`.

## Step 1: Create the Header Component Structure

1. Create a new `components` directory inside the `core` folder:

   ```bash
   mkdir -p src/app/core/components
   ```

2. Create a new `header` directory inside the components folder:
   ```bash
   mkdir -p src/app/core/components/header
   ```

## Step 2: Create the Header Component

1. Create a new file `header.ts` in the header directory with the following content:

   This component:
   - Uses the modern `input()` API to define a required template input
   - Uses `NgTemplateOutlet` to render the provided template
   - Has an inline template for simplicity

## Step 3: Update the App Component

1. Modify the `app.component.ts` file to import and use the Header component:
2. Update the `app.component.html` file to use the template teleportation pattern:

   The changes include:
   - Wrapping the toolbar in an `ng-template` with a reference name
   - Using the `sfeir-header` component with the template reference as input

## Step 4: Test Your Implementation

1. Run the application:

   ```bash
   npm run client -- 25-teleportation
   ```

2. Verify that:
   - The header appears correctly at the top of the page
   - The navigation links work as expected
   - The layout is identical to the original implementation

## Understanding the Pattern

### Template References

The `#headerTemplate` syntax creates a reference to the template that can be used elsewhere in the component.

### Template Outlets

The `ngTemplateOutlet` directive renders a template dynamically. It takes a `TemplateRef` and an optional context object.

### Benefits of This Approach

1. **Separation of concerns**: The header component is only responsible for rendering the template, not defining it
2. **Flexibility**: The app component can define different header templates for different scenarios
3. **Reusability**: The header component can be reused with different templates

## Advanced Usage

You can extend this pattern by:

1. Adding a context to the template:

   ```typescript
   headerTemplate = input.required<TemplateRef<{ $implicit: string }>>();
   ```

2. Providing context data when using the outlet:

   ```html
   <ng-template [ngTemplateOutlet]="headerTemplate()" [ngTemplateOutletContext]="{ $implicit: 'Hello World' }" />
   ```

3. Using the context in the template:
   ```html
   <ng-template #headerTemplate let-message>
     <mat-toolbar>{{ message }}</mat-toolbar>
   </ng-template>
   ```

By completing this workshop, you've learned how to implement template teleportation in Angular, a powerful pattern for building flexible and reusable component architectures.
