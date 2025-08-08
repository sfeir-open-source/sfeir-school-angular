# Exercise 32: Unit Testing in Angular

In this exercise, you'll learn how to write effective unit tests for different Angular components. You'll implement tests for pipes, directives, components, and services using Jest and Angular Testing Library.

## What You'll Learn

- How to test Angular pipes
- How to test Angular directives
- How to test Angular components
- How to test Angular services with HTTP requests
- How to use Angular Testing Library for more user-centric tests

## Step 1: Testing Pipes

Pipes are the simplest Angular elements to test since they are pure functions.

1. Open the file `src/app/shared/pipes/na.pipe.spec.ts`
2. Write tests for the `NaPipe` that verify:
   - The pipe is created successfully
   - The pipe returns the input value when it's defined
   - The pipe returns "N/A" when the input is undefined and no default value is provided
   - The pipe returns the default value when provided and the input is undefined

## Step 2: Testing Directives

Directives require a host component to be tested properly.

1. Open the file `src/app/shared/directives/badge.spec.ts`
2. Create a host component that uses the directive
3. Write tests that verify:
   - The directive is created successfully
   - The directive correctly adds an icon when the input is true
   - The directive doesn't add an icon when the input is false
   - The directive changes color on mouse events

## Step 3: Testing Components

Components often have complex interactions and dependencies.

1. Open the file `src/app/shared/components/form/form.spec.ts`
2. Write tests that verify:
   - The component is created successfully
   - The component renders the correct form fields
   - The component emits the correct events when the form is submitted
   - The component validates form inputs correctly

## Step 4: Testing Services

Services often interact with HTTP, so we need to mock those interactions.

1. Open the file `src/app/core/providers/people.service.spec.ts`
2. Write tests that verify:
   - The service is created successfully
   - The service makes HTTP requests to the correct endpoints
   - The service correctly processes successful responses
   - The service correctly handles errors
   - For httpResource tests, remember to:
     - Use TestBed.runInInjectionContext for creating the resource
     - Call TestBed.tick() to trigger the effect
     - Use await TestBed.inject(ApplicationRef).whenStable() to ensure values are propagated
     - Test error handling using the error() method

## Step 5: Running Your Tests

Verify your work by running the tests:

```shell
npm run test -- 32-unit-tests
```

## Step 6: Exploring Advanced Testing Techniques

After completing the basic tests, explore more advanced testing techniques:

1. Testing components with inputs and outputs
2. Testing components with child components
3. Testing components with services
4. Testing components with routing
5. Using Angular Testing Library for more user-centric tests

## What You've Learned

By completing this exercise, you've learned:

- How to write effective unit tests for different Angular elements
- How to use Jest as a test runner
- How to mock dependencies and HTTP requests
- How to test complex interactions between components
- Best practices for Angular testing

These skills will help you build more reliable and maintainable Angular applications.
