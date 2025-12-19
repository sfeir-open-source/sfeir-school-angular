# Exercise 19-reactive-form (folder apps/19-reactive-form)

In this workshop, you'll learn how to create a reactive form in Angular. You'll transform an existing template-driven form into a reactive form, which offers more robust form handling, validation, and testing capabilities.

## Step 1: Import ReactiveFormsModule

1. In `form.ts`, replace the import of `FormsModule` with `ReactiveFormsModule`:

## Step 2: Create a Typed Form Model

1. Create a new file called `people-form.ts` in the `shared/components/form` directory:

   ```typescript
   import { FormControl, FormGroup, Validators } from '@angular/forms';

   type Controls = {
     id: FormControl<string>;
     photo: FormControl<string>;
     firstname: FormControl<string>;
     lastname: FormControl<string>;
     email: FormControl<string>;
     phone: FormControl<string>;
   };

   export class PersonForm extends FormGroup<Controls> {
     constructor() {
       super({
         id: new FormControl('', { nonNullable: true }),
         photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg', { nonNullable: true }),
         firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
         lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
         email: new FormControl(null, [Validators.required]),
         phone: new FormControl(null, [Validators.required, Validators.pattern(/\d{10}/)]),
       });
     }
   }

   export type Person = ReturnType<PersonForm['getRawValue']>;
   ```

## Step 3: Update the Form Component

1. In `form.ts`, import the `PersonForm` and `Person` types
2. Replace the `PeopleForm` import and usage with the new `Person` type
3. Create an instance of `PeopleForm` in `form.ts`
4. Create an effect to handle `this.person` changes and use it to set `PeopleForm` value
5. Update the `submit` method to use the form value

## Step 4: Update the Form Template

1. In `form.html`, replace the template-driven form directives with reactive form directives
2. Replace all `[(ngModel)]` directives with `formControlName` directives
3. Update all form fields with their respective `formControlName` attributes
4. Update the submit button to use the reactive form's validity

## Testing Your Work

1. Run the application:

   ```bash
   npm run client -- 19-reactive-form
   ```

2. Click the "+" button to open the form
3. Fill out the form and submit it
4. Verify that validation works correctly
5. Check that the form data is passed correctly when submitted

## Troubleshooting

- If you see errors about missing imports, make sure you've imported `ReactiveFormsModule` correctly
- If form validation isn't working, check that you've set up the validators correctly in the `PersonForm` class
- If the form doesn't update with existing data, ensure your `effect` is working properly
- Check the browser console for any errors

## Key Differences Between Template-Driven and Reactive Forms

- **Template-driven forms**: Form structure and validation are defined in the template using directives
- **Reactive forms**: Form structure and validation are defined in the component class
- Reactive forms provide more robust validation, testing, and dynamic form capabilities
- Reactive forms make it easier to handle complex form scenarios and custom validation
