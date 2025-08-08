# Exercise 21: Lazy Loading in Angular (folder apps/21-lazyloading)

In this workshop, you'll implement lazy loading for the main features of your application. Lazy loading is a design pattern that improves application performance by loading modules only when they're needed, reducing the initial bundle size and improving startup time.

## Step 1: Understand the Current Routing Configuration

Currently, all components are eagerly loaded in the `main.ts` file:

```typescript
import { HomeComponent } from './app/feature/home/home.component';
import { PeopleComponent } from './app/feature/people/people.component';
import { UpdatePerson } from './app/feature/update-person/update-person';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'people/:id', component: UpdatePerson },
];
```

This means all components are loaded when the application starts, even if the user doesn't visit all routes.

## Step 2: Implement Lazy Loading for the People Component

1. In `main.ts`, remove the import for `PeopleComponent`:

2. Update the route configuration for the 'people' path to use lazy loading:

## Step 3: Implement Lazy Loading for the UpdatePerson Component

1. In `main.ts`, remove the import for `UpdatePerson`:
2. Update the route configuration for the 'people/:id' path to use lazy loading:

## Step 4: Test Your Implementation

1. Run the application:

   ```bash
   npm run client -- 21-lazyloading
   ```

2. Open your browser's developer tools and navigate to the Network tab

3. Observe the network requests as you navigate through the application:
   - When you first load the app, only the main bundle and HomeComponent should be loaded
   - When you navigate to the People list, a new JavaScript bundle for the PeopleComponent should be loaded
   - When you navigate to edit a person, a new JavaScript bundle for the UpdatePerson component should be loaded

## Benefits of Lazy Loading

- **Faster initial loading**: Only the necessary code for the current route is loaded
- **Better resource utilization**: Memory consumption is reduced as unused modules aren't loaded
- **Improved user experience**: Users get to interact with the application sooner

## Troubleshooting

- If you encounter errors about missing modules, ensure your import paths are correct
- Check the browser console for any errors related to loading modules
- Verify that your component exports are properly named in their respective files

## Additional Notes

- Lazy loading works best for larger features that aren't needed immediately
- Consider preloading strategies for frequently accessed routes to improve user experience
- The Angular Router provides additional options for controlling how and when modules are loaded
