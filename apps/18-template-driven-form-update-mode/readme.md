# Exercise 18: Template-driven Form Update Mode

In this exercise, you'll implement an update form for people using Angular's template-driven forms.

## Step 1: Create UpdatePerson Component

1. Create `UpdatePerson` in the `feature` directory:
2. Add route in `app.routes.ts` to navigate to the update person page

## Step 2: Add Edit Navigation

In `card.component.html`, update the edit button:

## Step 3: Update the People service

In the `people.service.ts`, add

- `updatePerson` method to update the person details (/peoples/{id}) on PUT method
- `getPersonDetails` method to get the person details (/peoples/{id}) on GET method

## Step 4: Implement UpdatePerson Component

In `update-person.ts`, implement the component to load person details:

- `id` input to receive the person id (use with the withInputBinding feature router)
- `peopleResource` to load the person details
- `updatePerson` method to update the person details
- `goBack` method to navigate back to the people list

## Step 5: Update Form Component

1. In `form.component.ts`, add an input for the person data with a default value set to { photo: 'https://randomuser.me/api/portraits/lego/6.jpg' }
2. Update the form to use the person

## Step 6: Create Update Template

In `update-person.component.html` display the form

## Step 7: Implement Save Logic

In `update-person.component.ts`, add updatePerson and goBack methods

- updatePerson is the callback of save event of the form
- goBack is the callback of cancel event of the form

## Testing Your Work

1. Run the application:

   ```bash
   npm run client -- 18-template-driven-form-update
   ```

2. Click the edit icon on any person card
3. Verify the form is pre-filled with the person's data
4. Make changes and save
5. Verify the changes are reflected in the people list

## Troubleshooting

- If the form doesn't load, check the browser console for errors
- Ensure all routes are properly configured
- Verify the person ID is being correctly passed to the update endpoint
- Check that the form's submit handler is being called with the correct data personne
