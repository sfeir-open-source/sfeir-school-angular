# Control Flow Workshop

In this workshop, you will learn how to use Angular's control flow directives to create dynamic and interactive templates. Control flow directives allow you to conditionally display content, iterate over data, and switch between different views based on your application's state.

## Objective

Implement control flow logic in an Angular application using the new Angular control flow syntax (`@if`, `@for`, `@switch`) to display and manipulate data dynamically in templates.

## Prerequisites

- Basic knowledge of Angular
- Understanding of Angular components and templates
- Familiarity with TypeScript

## Workshop Steps

### Step 1: Analyze the component structure

1. Examine the existing component files to understand the data structure
2. Identify where control flow directives need to be implemented
3. Look at the component's TypeScript file to understand the available properties and methods

### Step 2: Create a view signal

1. In the `people.component.ts` create a view signal initiate to card
2. create a function changeView that changes the value of the signal each time you click on it

### Step 3: Adapte the view

1. display card view if view value is card
2. display list view if view value is list
3. show the correct icon on the button

### Step 4: Test your implementation

1. Launch the development server:

   ```bash
   npm run client -- 14-control-flow
   ```

2. Verify that:

- Conditional content appears and disappears correctly
- Lists are rendered properly with all items
- Switch statements work for different cases
- Empty states are handled appropriately
- The user interface responds correctly to data changes

## Key Concepts to Understand

- **Control Flow Syntax**: Angular's new control flow blocks (`@if`, `@for`, `@switch`) provide a more intuitive way to handle template logic compared to structural directives
- **Conditional Rendering**: Use `@if` to show or hide content based on component state or data availability
- **List Rendering**: Use `@for` to iterate over arrays and display dynamic lists of content
- **Switch Logic**: Use `@switch` for complex conditional scenarios with multiple possible outcomes
- **Performance**: Proper use of `track` expressions in `@for` loops helps Angular optimize rendering performance
- **Template Readability**: Control flow blocks make templates more readable and maintainable compared to traditional structural directives

## Tips for Success

- Always consider edge cases like empty arrays or null values
- Use meaningful variable names in your control flow blocks
- Test different data scenarios to ensure robust behavior
- Keep your templates clean and well-organized
- Use appropriate tracking strategies for optimal performance
