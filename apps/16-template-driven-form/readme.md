# Exercise 16-template-driven-form (folder apps/16-template-driven-form)

In this workshop, you'll learn how to create a template-driven form in Angular. The PeopleComponent already has a button to open a modal dialog, and the modal component is already set up. Your task is to create a form component and implement the form logic.

## Step 1: Create Form Component

1. In the `shared/components` directory, create a new component called `Form`:
2. In the generated `form.html`, copy the content from `assets/static/form.component.html`
3. In the generated `form.scss`, copy the content from `assets/static/form.scss`

## Step 2: Add Form to Dialog

1. In `add-person-dialog.component.ts`, import and add the `Form` to the `imports` array
2. In `add-person-dialog.component.html`, add the form component:

## Step 3: Import FormsModule

1. In `form.ts`, import `FormsModule` from `@angular/forms`
2. Add it to the `imports` array of the `@NgModule` decorator

## Step 4: Make the Form Template-Driven

1. In `form.html`, add `#personForm="ngForm"` to the form element
2. Add `ngModel` directive to each form control (input fields)
3. Add `name` attribute to each form control that matches your model properties

## Step 5: Implement Form Logic

1. In `form.ts`, create two output properties:

2. Implement the form submission

3. Implement the cancel action

## Step 6: Make the business Logic for adding people

1. In the file `people.service.ts`, add a new function to add a people. Endpoint to use /peoples with the Post method
2. In the file `people.component.ts`, complete the Rxjs flux with the correct operator
   - first use the filer operator to avoid sending request if user close the dialog without submitting
   - then use the switchMap operator to send the request
   - finally use again a switchMap operator to retrieve the list of person updated
3. Register the new flow in the merge operator

## Testing Your Work

1. Run the application:
   ```bash
   npm run client -- 16-template-driven-form
   ```
2. Click the "+" button to open the form
3. Submit the form and verify the data is passed correctly

## Troubleshooting

- If the form doesn't submit, check the browser console for errors
- Make sure all form controls have both `name` and `ngModel` directives
- Verify that the `FormsModule` is properly imported in the `SharedModule`
