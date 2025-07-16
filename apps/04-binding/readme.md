# Exercise: Data Binding (folder: apps/04-binding)

## Objective

This workshop will guide you through implementing data binding in Angular to display user details in a card component. You'll learn how to use different types of bindings to display dynamic data in your templates.

## Prerequisites

- Basic understanding of Angular components
- Familiarity with TypeScript
- Knowledge of HTML and CSS

## Step 1: Set Up the Component Structure

1. In the **home.component.html** copy and paste the content of the **home.component.html** file from the assets/static folder.

2. In the **home.component.scss** copy and paste the content of the **home.component.scss** file from the assets/static folder.

## Step 2: Implement Data Binding

1. In **home.component.ts**:
   - Import the necessary Angular Material modules
   - Import the PEOPLE mock data
   - Create a signal to hold the person data
   - Initialize the signal with the first person from the PEOPLE array

## Step 3: Update the Template with Bindings

In **home.component.html**, implement the following bindings:

- Property binding for the image source
- String interpolation for text content
- Property binding for links (email, phone)
- Attribute binding for accessibility

Example bindings:

```html
<img [ngSrc]="person().photo" alt="Profile photo" width="128" height="128" />
<h2>{{ person().firstname }} {{ person().lastname }}</h2>
<a [href]="'mailto:' + person().email">{{ person().email }}</a>
```

## Step 5: Run and Test

To test your implementation, run the following command from the project root:

```bash
npm run client -- 04-binding
```

## Expected Outcome

- A card displaying the first person's information from the PEOPLE mock data
- Properly formatted contact information with working links
- Clean, responsive layout using Angular Material components
- No errors in the browser console

## Tips

- Use Angular's signal for reactive data binding
- Leverage Angular Material components for a consistent look and feel
- Remember to import all necessary modules in your standalone components
- Check the browser's developer tools for any compilation or runtime errors
