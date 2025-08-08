# Exercise: HTTP Client in Angular (folder: apps/06-http)

## Objective

In this exercise, you'll learn how to make HTTP requests in an Angular application using the built-in `HttpClient` service. You'll also learn how to use environment files to manage API endpoints across different environments.

By the end of this exercise, you'll be able to:

- Set up the HTTP client in an Angular application
- Make GET requests to a REST API
- Use environment variables to manage API endpoints
- Handle asynchronous data fetching in components

## Prerequisites

- Basic understanding of Angular components and services
- Familiarity with TypeScript and Observables
- Completion of previous exercises on components and data binding

## Step 1: Set Up the HTTP Client

1. Open **main.ts**
2. Import the necessary HTTP client functions:

```typescript
import { provideHttpClient, withFetch } from '@angular/common/http';
```

3. Update the `bootstrapApplication` call to include the HTTP client:

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch())],
}).catch(console.error);
```

## Step 2: Configure the API Endpoint

1. Open **src/environments/environment.ts**
2. Add the `peopleEndpoint` property to the environment object:

```typescript
export const environment = {
  production: false,
  peopleEndpoint: 'http://localhost:9000/api',
};
```

## Step 3: Create the HTTP Resource in Home Component

1. Open **home.component.ts**
2. Import the necessary dependencies:
3. Create an HTTP resource to fetch random people:

## Step 4: Update the Template

1. Open **home.component.html**
2. Update the template to use the person data from the resource:

```angular181html
@if (personResource.hasValue()) {
  @let person = personResource.value();
  <mat-card>
    <mat-card-header>
      <img mat-card-avatar [src]="person.photo" [alt]="person.firstname + ' ' + person.lastname">
      <mat-card-title>{{ person.firstname }} {{ person.lastname }}</mat-card-title>
      <mat-card-subtitle>{{ person.email }}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <p>Phone: {{ person.phone }}</p>
      <p>Company: {{ person.entity }}</p>
    </mat-card-content>
  </mat-card>

  <button mat-fab color="primary" (click)="getRandomPerson()">
    <mat-icon>refresh</mat-icon>
  </button>
}
```

## Step 5: Test Your Implementation

1. Make sure your API server is running (if not, start it with `npm run server` from the project root)
2. From the project root, run the application:

```bash
npm run client -- 06-http
```

3. Open your browser and verify that:
   - A person's information is displayed when the page loads
   - Clicking the refresh button fetches and displays a different random person
   - The UI updates automatically when new data is received

## Expected Outcome

- The application should display a random person's information in a card
- Clicking the refresh button should fetch and display a new random person
- The UI should update automatically when new data is received
- No errors should appear in the browser console

## Tips

- The `httpResource` function creates a resource that automatically handles the HTTP request and state management
- The resource provides `value()`, `loading()`, and `error()` signals that you can use in your template
- The `reload()` method can be called to refresh the data
- Always use environment variables for API endpoints to make your application more maintainable

## Troubleshooting

- If you see CORS errors, make sure your API server is running and accessible
- If the data doesn't update, check the network tab in your browser's developer tools to see if the request is being made
- Make sure you've imported all necessary modules and components
- Check the browser console for any error messages
