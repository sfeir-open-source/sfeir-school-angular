# Exercise: Component Hierarchy (folder: apps/03-cpt-hierarchy)

## Objective

This workshop will guide you through creating a component hierarchy in Angular. You'll learn how to structure components and make them work together by calling the `HomeComponent` from within the `AppComponent`.

## Prerequisites

- Basic understanding of Angular components

## Step 1: Update the App Component Template

- In the **app.component.html** file, replace the `<mat-card>` element with the `<sfeir-home>` component.
- In the **app.component.ts** file, import the `HomeComponent` in the `imports` section.

## Step 2: Configure the Bootstrap Component

In the **main.ts** file, update the `bootstrapApplication` method to use `AppComponent` instead of `HomeComponent`.

## Step 3: Update the Root Component

In the **index.html** file, replace the `<sfeir-home>` selector with `<sfeir-app>`.

## Step 4: Run and Test

Navigate to the root directory of the project and run the following command to test your implementation:

```shell
npm run client -- 03-cpt-hierarchy
```

## Expected Outcome

- The application should display the home component content within the app component
- The component hierarchy should be properly established
- No errors should appear in the browser console

## Tips

- Remember to import all necessary modules in your components
- Check the browser's developer tools for any compilation or runtime errors
