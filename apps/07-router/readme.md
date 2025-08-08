# Angular Router Exercise (folder: apps/07-router)

## Objective

In this exercise, you'll learn how to implement client-side navigation in an Angular application using the Angular Router. You'll set up routes, configure navigation, and create a basic single-page application (SPA) with multiple views.

By the end of this exercise, you'll be able to:

- Set up basic routing in an Angular application
- Configure route definitions
- Use router directives in templates
- Navigate between different views
- Use route parameters

## Prerequisites

- Basic understanding of Angular components
- Familiarity with TypeScript
- Completion of previous exercises on components and services
- Basic understanding of Angular standalone components

## Step 1: Set Up the Router

1. Open **main.ts**
2. Import the necessary router functions and components:
3. Define your routes array:
4. Update the `bootstrapApplication` call to include the router and HTTP client:

## Step 2: Configure the App Component

1. Open **app.component.ts**
2. Import the necessary router directives and modules:
3. Update the component decorator to include the necessary imports:

## Step 3: Update the App Template

1. Open **app.component.html**
2. Replace the content with the following to add navigation and router outlet:

```html
<mat-toolbar class="extend-toolbar">
  <span>
    <a [routerLink]="['home']">
      <img src="assets/images/logo-sfeir.svg" aria-label="sfeir" alt="Sfeir" />
    </a>
  </span>

  <span class="flex"></span>

  <span>
    <a href="/locator">Maps</a>
    <a href="/people">List</a>
  </span>
</mat-toolbar>

<router-outlet />
```

## Step 4: Test Your Implementation

1. From the project root, run the application:

```bash
npm run client -- 07-router
```

2.Open your browser and verify that:

- The application loads with the home component displayed
- The navigation links are visible in the toolbar
- Clicking the home link refreshes the home view
- The "Get Random Person" button fetches and displays a new person

## Expected Outcome

- The application should display a toolbar with navigation links
- The home component should be displayed by default
- The home component should show a person's details with a refresh button
- Navigation between different views should work without full page reloads
- The URL should update to reflect the current route

## Troubleshooting

- If you see errors about missing modules, make sure you've imported all required Angular Material modules
- If routing doesn't work, check the browser console for any error messages
- Ensure your route paths are correctly defined and match the navigation links
- If the person data doesn't load, verify that the API server is running and accessible at the correct URL
