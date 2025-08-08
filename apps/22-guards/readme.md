# Exercise 22: Route Guards in Angular (folder apps/22-guards)

In this workshop, you'll implement a route guard to validate the format of a person ID before allowing navigation to the person details page. Route guards are an essential part of Angular's routing system that allow you to control access to routes based on certain conditions.

## Step 1: Create a Guards Directory

1. Create a new directory called `guards` in the `core` directory:

## Step 2: Create the Route Guard

1. Create a new file called `main-routing-guard.ts` in the `core/guards` directory
2. Inside this file create the updatePersonGuard function
   This guard:
   - Uses the functional guard approach with `CanMatchFn`
   - Checks if the person ID in the URL matches the pattern `[a-z0-9]{24}` (24 alphanumeric characters)
   - Returns `true` if the ID is valid, allowing navigation to proceed
   - Redirects to the home page if the ID is invalid

## Step 3: Apply the Guard to the Route

1. In `main.ts`, import the guard:
2. Apply the guard to the 'people/:id' route:

## Step 4: Test Your Implementation

1. Run the application:

   ```bash
   npm run client -- 22-guards
   ```

2. Test the guard by navigating to different URLs:
   - Try a valid ID: `/people/abc123456789012345678901` (should work)
   - Try an invalid ID: `/people/123` (should redirect to home)

## Understanding Angular Route Guards

Angular provides several types of route guards:

- **CanMatch**: Determines if a route can be matched (used in our example)
- **CanActivate**: Determines if a route can be activated
- **CanActivateChild**: Determines if child routes can be activated
- **CanDeactivate**: Determines if a user can leave a route
- **Resolve**: Pre-fetches data before activating a route

In modern Angular (v14+), functional guards are preferred over class-based guards for their simplicity and better tree-shaking.

## Troubleshooting

- If the guard isn't working, check that you've imported it correctly in `main.ts`
- Verify that the regex pattern is correctly defined
- Check the browser console for any errors
- Make sure you're using the correct guard type for your use case

## Additional Notes

- Route guards are a powerful way to control navigation in your application
- They can be used for authentication, authorization, form validation, and more
- Consider using multiple guards for complex navigation rules
- Guards can return observables or promises for asynchronous validation
