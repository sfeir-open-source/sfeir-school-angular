# Angular Exercise: Component Basics

## Overview

This exercise will guide you through creating and understanding Angular components. You'll build a simple application with a navigation bar and a home component that displays a welcome message.

### Step 1: Create the Home Component

1. Generate a new home component:

   ```bash
   npx nx generate @nx/angular:component apps/02-ngg/src/app/feature/home --dry-run
   ```

The --dry-run option is used to preview the changes that will be made without actually modifying the files.
Remove it when you're ready to create the component.

2. In `home.component.ts`:
   - Set up a simple component with a name property
   - Import and use Angular Material's CardModule

3. In `home.component.html`:
   - Create a card that displays the name property

### Step 2: Set Up Routing

Bootstrap the application on the home Component in the `main.ts` file.

### Step 3: Styling

Change the selector in the `index.html` file to match the name of the component.

## Testing

1. Run the application:
   ```bash
   npx nx serve 02-ngg
   ```
2. Navigate to `http://localhost:4200`
3. Verify that:
   - your home component is rendered
