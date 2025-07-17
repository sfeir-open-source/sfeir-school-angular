# Angular Component Outputs Exercise

## Objective

In this exercise, you'll learn how to use component outputs in Angular to handle user interactions. You'll implement a delete functionality in the card component and handle the event differently in the home and people components.

## Learning Outcomes

By the end of this exercise, you'll be able to:

- Use the `output` function to define component outputs
- Emit events from child to parent components
- Handle events differently in different parent components
- Implement delete functionality with proper event handling
- Work with RxJS for handling asynchronous operations

## Prerequisites

- Understanding of Angular components and inputs
- Basic knowledge of RxJS
- Completion of the previous exercise on component inputs

## Exercise Steps

### Step 1: Update the Card Component

1. Add an output property to the `CardComponent` to emit delete events
2. Implement a method to handle the delete button click
3. Update the template to trigger the delete method

### Step 2: Update the People Component

1. Implement the `deletePerson` method to handle the delete event
2. Use RxJS to manage the people list state and handle API calls
3. Update the template to handle the `personDelete` event

### Step 3: Update the Home Component

1. Update the template to handle the `personDelete` event by refreshing the random person

## Testing Your Implementation

1. Start the application:

   ```bash
   npm run client -- 10-output
   ```

2. Test the delete functionality:
   - On the home page, deleting a person should load a new random person
   - On the people page, deleting a person should remove them from the list

## Key Concepts

### Component Outputs

Output properties allow child components to emit events to their parent components. In this exercise, we use the `output` function to define a `personDelete` output in the `CardComponent`.

### Event Handling

- The `CardComponent` emits a `personDelete` event when the delete button is clicked
- The parent components (`HomeComponent` and `PeopleComponent`) handle this event differently based on their needs

### RxJS for managing the user flow

- The `PeopleComponent` uses RxJS to manage the people list state and handle API calls
- The `merge` operator combines multiple observables into one
- The `switchMap` operator is used to chain the delete API call

## Troubleshooting

- **Event Not Emitted**: Ensure you're calling the `emit` method on the output property
- **Event Not Received**: Check that the event binding in the parent template matches the output property name
- **API Errors**: Verify that the API endpoint is correct and the server is running

## Next Steps

1. Add a confirmation dialog before deleting a person
2. Implement error handling for failed API calls
3. Add a loading indicator during API operations
4. Add a success message after a successful delete operation
