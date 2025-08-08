# Angular Services and HTTP Communication Exercise

## Objective

In this exercise, you'll learn how to create and use Angular services to encapsulate HTTP communication. You'll refactor the existing code to move all HTTP calls into a dedicated service, making your components more maintainable and following the single responsibility principle.

## Learning Outcomes

By the end of this exercise, you'll be able to:

- Create and use Angular services
- Encapsulate HTTP communication in services
- Use dependency injection to provide services
- Understand the benefits of the service layer pattern
- Work with Observables for asynchronous operations

## Prerequisites

- Understanding of Angular components
- Basic knowledge of HTTP and REST APIs
- Familiarity with RxJS Observables
- Completion of previous exercises on components and routing

## Exercise Steps

### Step 1: Create a PeopleService

1. Generate a new service called `PeopleService` in the `core/providers` folder:
2. Implement the service with the following methods:
   - `getPeople()` - Fetches the list of all people
   - `getRandomPeople()` - Fetches a random person
   - `deletePeople(id: string)` - Deletes a person by ID

### Step 2: Update the HomeComponent

1. Inject the `PeopleService` into the `HomeComponent`
2. Replace direct httpResource with the resource returned by the people service

### Step 3: Update the PeopleComponent

1. Inject the `PeopleService` into the `PeopleComponent`
2. Replace direct HTTP calls with calls to the service methods

## Testing Your Implementation

1. Start the application:

   ```bash
   npm run client -- 11-service
   ```

2. Verify that:
   - The home page still shows a random person
   - The people page still shows the list of people
   - Deleting a person from the people page works as expected
   - The random person refreshes when clicking the button on the home page

## Key Concepts

### Angular Services

Services are a fundamental part of Angular applications. They are:

- Singleton by default (when provided in root)
- Used to share data and functionality across components
- Ideal for encapsulating business logic and data access

### Dependency Injection

Angular's dependency injection system:

- Manages the creation and lifetime of service instances
- Makes services available to components and other services
- Promotes loose coupling and testability

### HTTP Communication

- The `HttpClient` service is used to make HTTP requests
- Services encapsulate HTTP calls to keep components focused on the UI
- Observables are used to handle asynchronous operations

## Troubleshooting

- **Service Not Found**: Ensure the service is provided in the root injector with `@Injectable({ providedIn: 'root' })`
- **HTTP Errors**: Check the browser's developer tools network tab for failed requests
- **No Data**: Verify that the API endpoint in the environment file is correct
