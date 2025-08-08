# Exercise: 01-hands-on (apps/01-hands-on directory)

The goal of this exercise is to understand how Angular application bootstrapping works.

Currently, if you run the application, an error will appear in your browser's developer tools console.

This exercise aims to fix this error :)

<br>

## Step 1

In the src/app directory, create the AppComponent component. This component should have a property called name with your first name as its value.
<br><br>

## Step 2

In the **app.component.html** file, display the value of the **name** variable using the {{ name }} syntax, which is Angular's interpolation syntax.
<br><br>

## Step 3

In the **main.ts** file, bootstrap the AppComponent.

## Step 4

Check your work by navigating to the workshop root directory and running the following command:

```shell
npm run client -- 01-hands-on
```
