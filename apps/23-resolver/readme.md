# Exercise 23: Route Resolvers in Angular (folder apps/23-resolver)

In this workshop, you'll implement a route resolver to fetch person details before navigating to the person edit view. Resolvers are a powerful feature in Angular's routing system that allow you to pre-fetch data before a route is activated, ensuring that the data is available when the component is loaded.

## Step 1: Understand the Current Implementation

Currently, the `UpdatePerson` component fetches person details using the `rxResource` approach:

```typescript
id = input.required<string>();
peopleResource = rxResource({
  params: this.id,
  stream: ({ params: personId }) => this.peopleService.getPersonDetails(personId),
});
```

This works, but it means the data is fetched after the component is loaded, which can lead to a loading state in the UI. With a resolver, we can pre-fetch this data during the routing process.

## Step 2: Create the Resolver Function

1. Open the `main-routing-guard.ts` file in the `core/guards` directory
2. Add a new resolver function called `personDetailsResolver` below the existing guard:
3. Return the details of the person using the `PeopleService`

## Step 3: Apply the Resolver to the Route

1. In `main.ts`, import the resolver:
2. Add the resolver to the 'people/:id' route configuration:

## Step 4: Update the Component to Use Resolved Data

1. Modify the `update-person.ts` file to use the resolved data instead of fetching it directly.
   - create a person input required for that
2. Update the `update-person.html` template to use the resolved data:

## Step 5: Test Your Implementation

1. Run the application:

   ```bash
   npm run client -- 23-resolver
   ```

2. Navigate to a person detail page and observe that:
   - The data is available immediately when the component loads
   - There's no loading state or flickering in the UI
   - The form is pre-populated with the person's details

## Understanding Angular Resolvers

Resolvers provide several benefits:

- **Pre-fetched data**: Data is available before the component is activated
- **Better user experience**: No loading states or flickering in the UI
- **Error handling**: You can handle data loading errors during navigation
- **Simplified components**: Components don't need to handle data fetching logic

In modern Angular (v14+), functional resolvers are preferred over class-based resolvers for their simplicity and better tree-shaking.

## Troubleshooting

- If the resolver isn't working, check that you've imported it correctly in `main.ts`
- Verify that the resolver is properly configured in the route definition
- Make sure the component is correctly using the resolved data
- Check the browser console for any errors

## Additional Notes

- Resolvers can return observables, promises, or synchronous values
- Consider using a loading indicator if the resolver takes a long time to resolve
- For complex data requirements, you can use multiple resolvers for a single route
- Be careful not to block navigation for too long with slow resolvers
