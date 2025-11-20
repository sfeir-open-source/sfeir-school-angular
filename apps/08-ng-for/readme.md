# Angular @for Loop Exercise

## Objective

In this exercise, you'll learn how to use Angular's new control flow syntax with the `@for` loop to display lists of data. You'll work with the `httpResource` to fetch data and display it in your components.

## Learning Outcomes

By the end of this exercise, you'll be able to:

- Use the `@for` loop to iterate over collections
- Work with the new control flow syntax in Angular
- Fetch and display data using `httpResource`
- Create reusable components with proper typing
- Handle loading states in your templates

## Prerequisites

- Basic understanding of Angular components
- Familiarity with TypeScript
- Completion of previous exercises on components and services

## Exercise Steps

### Step 1: Set Up the People Component

1. Create a new component called `PeopleComponent` in the `feature/people` folder
2. Update the component to use the `httpResource` to fetch a list of people from the API
3. Use the `@for` loop to display each person in a card

## Step 2: Register a new view

1. Register a new path called people in the `main.ts` file

## Testing Your Implementation

1. Start the application:

   ```bash
   npm run client -- 08-ng-for
   ```

2. Verify that:
   - The home page displays a random person's information
   - Clicking the refresh button loads a new random person
   - The "List" link in the navigation works
   - The people page displays a list of all people
   - The UI is responsive and styled correctly

## Key Concepts

### @for Loop

The `@for` loop is a new control flow syntax in Angular that replaces `*ngFor`. It provides better type checking and performance improvements.

```html
@for (item of items(); track item.id) {
<!-- Template for each item -->
} @empty {
<!-- Template when collection is empty -->
}
```

### toSignal

The `toSignal` is a utility that helps convert observables to signals. It takes an observable and an optional configuration object as parameters.

```typescript
const configObject = { initialValue: '[]', sync: true | false };
```

## Troubleshooting

- **Blank Page**: Ensure all components are properly imported and declared in the `main.ts` file
- **Type Errors**: Check that all properties accessed in the template exist in the corresponding TypeScript interfaces
- **Missing Styles**: Verify that all required Angular Material modules are imported
- **API Errors**: Make sure the backend server is running and accessible at the specified endpoint
