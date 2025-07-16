# Exercise: Handling Events in Angular (folder: apps/05-events)

## Objective

In this exercise, you'll learn how to handle DOM events in Angular by implementing a feature that allows users to display a random person's information when clicking a button. This will help you understand:

- How to bind to DOM events in Angular templates
- How to implement event handler methods in components
- How to update component state in response to user interactions

## Prerequisites

- Basic understanding of Angular components
- Familiarity with TypeScript
- Completion of the previous binding exercise (04-binding)

## Step 1: Set Up the Button Event

1. Open **home.component.html**
2. Locate the floating action button (FAB) with the refresh icon at the bottom of the template
3. Add a click event binding to call the `getRandomPerson()` method when the button is clicked

```html
<button mat-fab color="accent" (click)="getRandomPerson()">
  <i class="material-icons">autorenew</i>
</button>
```

## Step 2: Implement the Event Handler

1. Open **home.component.ts**
2. Add a `getRandomPerson()` method to the `HomeComponent` class
3. Inside this method, update the `person` signal with a random person from the `PEOPLE` array

## Step 3: Test Your Implementation

1. Save all your changes
2. From the project root, run the following command to start the application:

```bash
npm run client -- 05-events
```

3. Open your browser and navigate to the application
4. Click the circular refresh button in the bottom-right corner
5. Verify that a different person's information is displayed each time you click the button

## Expected Outcome

- When you click the refresh button, the person's information should change to display a random person from the `PEOPLE` array
- The card should update to show the new person's details including their photo, name, email, phone, and manager
- No errors should appear in the browser console

## Tips

- Remember that `person` is a signal, so you need to use `.set()` to update its value
- The `PEOPLE` array is already imported from `'../../mocks/people.mock'`
- The button uses Angular Material's `mat-fab` component for a floating action button
- The refresh icon is from Material Icons (autorenew)

## Troubleshooting

- If the person's information doesn't update when clicking the button, check the browser's developer console for any errors
- Make sure you've added the parentheses `()` when calling `getRandomPerson()` in the template
- Verify that you're using the signal's `set()` method to update the person's data
