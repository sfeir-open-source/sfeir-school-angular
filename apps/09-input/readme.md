# Angular Component Inputs Exercise

## Objective

In this exercise, you'll learn how to create reusable components in Angular by using input properties. You'll refactor the existing code to extract a reusable card component that can display person information.

## Learning Outcomes

By the end of this exercise, you'll be able to:

- Create reusable components with input properties
- Use the `input` function to define component inputs
- Compose components together
- Pass data from parent to child components
- Structure your application with shared components

## Prerequisites

- Basic understanding of Angular components
- Familiarity with TypeScript
- Completion of previous exercises on components and data binding

## Exercise Steps

### Step 1: Create a Card Component

1. Generate a new component called `CardComponent` in the `shared/components` folder:
2. Move the card template and styles from the `PeopleComponent` to the new `CardComponent`
3. Define an input property to receive person data

### Step 2: Update the People Component

1. Import and use the new `CardComponent` in the `PeopleComponent`
2. Update the template to use the `sfeir-card` component
3. Pass the person data to the card component using property binding

### Step 3: Update the Home Component

1. Import and use the `CardComponent` in the `HomeComponent`
2. Update the template to use the `sfeir-card` component
3. Pass the random person data to the card component

````

## Testing Your Implementation

1. Start the application:
   ```bash
   npm run client -- 09-input
````

2. Verify that:
   - The home page displays a random person's information in the card component
   - The people page displays a list of people using the same card component
   - Clicking the refresh button on the home page loads a new random person
   - The card component is properly styled and responsive

## Key Concepts

### Component Inputs

Input properties allow you to pass data from a parent component to a child component. In this exercise, we use the `input` function to define the `person` input in the `CardComponent`.

### Component Composition

By creating a reusable `CardComponent`, we've improved code organization and reduced duplication. The same card is now used in both the home and people components.

## Troubleshooting

- **Input Not Working**: Ensure you've properly defined the input property in the child component and are using the correct property binding syntax in the parent template.
- **Styling Issues**: Make sure all required Angular Material modules are imported in the component that uses them.
- **Missing Data**: Verify that the API endpoint is correct and the server is running.
