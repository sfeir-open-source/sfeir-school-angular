# Exercise 20: Reactive Form Custom Validator

In this exercise, you'll learn how to create and implement a custom validator for reactive forms in Angular. You'll create a validator that ensures email addresses follow the SFEIR company format.

## Step 1: Create a Custom Validator

1. In the `shared/components/form/people-form.ts` file, add a static method called `sfeirEmailValidator`:

This validator checks if the email follows the pattern: `firstname.lastinitial@sfeir.com` (e.g., `john.d@sfeir.com`).

## Step 2: Apply the Custom Validator

1. In the `PersonForm` class constructor, apply your custom validator to the email field:

## Step 3: Display Validation Errors

1. In the `form.html` file, add error messages for the email field:

## Step 4: Test Your Validator

1. Try submitting the form with different email formats to verify your validator works correctly.
2. The form should only accept emails in the format `xxxxx.x@sfeir.com`.
3. The appropriate error message should appear when an invalid email is entered.

## Step 5: Run Your Application

Verify your work by running the following command:

```bash
npm run client -- 20-reactive-form-custom-validator
```
