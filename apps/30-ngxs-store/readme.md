# Exercise 30: Implementing State Management with NGXS

In this exercise, you'll learn how to implement state management in Angular using NGXS. You'll create a store to manage application state, define actions, selectors, and integrate them with your components and services.

## What is NGXS?

NGXS is a state management pattern + library for Angular. It acts as a single source of truth for your application's state, providing simple rules for predictable state mutations.

Key concepts in NGXS:

- **Store**: The global state container
- **Actions**: Classes that describe unique events
- **State**: Classes with decorators that define a state container
- **Selectors**: Methods that slice a specific portion of state
- **Dispatch**: Method to send actions to the store

## What You'll Build

In this workshop, you'll implement a state management solution for the People feature that will:

- Store the list of people
- Store and manage search criteria
- Filter people based on search input
- Update state when people are added or deleted

## Step 1: Create the Store Directory

First, create a directory structure for your store:

1. In the `core` folder, create a new directory called `store`
2. This directory will contain all your store-related files

## Step 2: Create the App Store Service

Create a file called `app-store.ts` in the `store` directory:

## Step 3: Define Actions

Actions are events that trigger state changes. Create two action classes:

These actions will:

- `SetPeople`: Update the people array in the store
- `SetSearch`: Update the search term in the store

## Step 4: Implement State Logic

Now, implement the state logic in your `AppStore` service:

1. Add a helper method to filter people based on search criteria:

```typescript
// HELPERS
static filterPerson(search: string) {
  return (people: People) =>
    people.lastname.toLowerCase().includes(search.toLowerCase()) ||
    people.firstname.toLowerCase().includes(search.toLowerCase());
}
```

2. Add memoized selectors to retrieve state
3. Add action handlers to update state
4. register in the file `main.ts` your store

## Step 5: Integrate with the People Service

Update the `PeopleService` to interact with the store:

1. Import the necessary NGXS functions and your actions:
2. Add a dispatch map to your service:
3. Update your service methods to dispatch actions when data changes:

## Step 6: Connect the Store to Components

Update the `PeopleComponent` to use the store:

1. Import the necessary NGXS functions and your actions:
2. Replace direct service calls with store selectors:
3. Add a dispatch method for the search action:

## Step 7: Test Your Implementation

Run your application to verify that the store is working correctly:

```shell
npm run client -- 30-ngxs-store
```

Test the following functionality:

1. The list of people should load correctly
2. Searching should filter the list based on first or last name
3. Deleting a person should update the list
4. Adding a new person should update the list

## Understanding NGXS Patterns

### Immutable State Updates

NGXS follows the immutability principle. When updating state, always create a new state object:

```typescript
setState({
  ...state, // spread the existing state
  search: payload, // update only what changes
});
```

### Selectors memoized

Selectors can compute derived state:

```typescript
@Selector()
static people(state: AppState): Array<People> {
  return state.people.filter(AppStore.filterPerson(state.search));
}
```

This selector not only returns people but also applies filtering based on the current search term.

### Dispatch Patterns

There are multiple ways to dispatch actions in NGXS:

1. Using the Store service directly:

```typescript
const store = inject(Store);

updateSearch(term: string) {
  this.store.dispatch(new SetSearch(term));
}
```

2. Using the dispatch function (as shown in this workshop):

```typescript
private readonly setSearch = dispatch(SetSearch);
// Later in code:
this.setSearch(searchTerm);
```

By completing this exercise, you've learned how to implement a complete state management solution using NGXS, including defining state structure, creating actions, implementing selectors, and integrating with Angular services and components.
