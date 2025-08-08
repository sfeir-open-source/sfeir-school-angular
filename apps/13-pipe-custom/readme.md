# Custom Pipe Workshop

In this workshop, you will learn how to create and use a custom pipe in an Angular application. Pipes are powerful tools that allow you to transform data directly in your templates.

## Objective

Create a custom pipe called "NaPipe" that will display "N/A" (Not Available) when a value is undefined or null, instead of displaying an empty string.

## Prerequisites

- Basic knowledge of Angular
- Understanding of built-in pipe concepts like date, uppercase, etc.

## Workshop Steps

### Step 1: Prepare the structure

1. In the `shared` folder, create a new folder named `pipes`

### Step 2: Create the custom pipe

1. Generate a new pipe named "NaPipe" in the pipes folder you just created
2. Make sure the pipe is correctly declared in the CardComponent

### Step 3: Implement the pipe

1. Open the generated `na.pipe.ts` file and analyze its structure

   - You'll see the class decorated with `@Pipe` and a `transform` method that will be responsible for the data transformation

2. Implement the `transform` method to return "N/A" if the passed value is undefined or null, otherwise return the original value

### Step 4: Use the pipe in the template

1. In your component that displays a person's details, identify where the manager is displayed
2. Modify the template to apply your "na" pipe to the "person.manager" property
3. Verify that when a person doesn't have a manager (undefined or null value), you see "N/A" instead of an empty string

### Step 5: Test your implementation

1. Launch the development server with the server

   ```bash
   npm run client -- 13-pipe-custom
   ```

2. Check in the user interface that:
   - People who have a manager correctly display the manager's name
   - People without a manager display "N/A" instead

## Key Concepts to Understand

- **Angular Pipes**: Pipes are an elegant way to transform data in your templates without modifying the original data
- **Reusability**: A well-designed pipe can be reused throughout your application
- **Code Readability**: Pipes help keep your templates clean and readable by moving transformation logic into dedicated classes
