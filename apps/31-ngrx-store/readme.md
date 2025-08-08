# Exercise 31: Implementing State Management with NGRX

In this exercise, you'll learn how to implement state management in Angular using NGRX. You'll create a store to manage application state using actions, reducers, selectors, and integrate them with your components and services.

## What is NGRX?

NGRX is a state management library for Angular applications inspired by Redux. It provides a predictable state container that helps you write applications that behave consistently and are easy to test.

Key concepts in NGRX:

- **Store**: The global state container that holds the entire state tree
- **Actions**: Payloads of information that send data from your application to the store
- **Reducers**: Pure functions that specify how the application's state changes in response to actions
- **Selectors**: Pure functions used to select, derive, and compose pieces of state

## What You'll Build

In this workshop, you'll implement a state management solution for the People feature that will:

- Store the list of people in the global state
- Store and manage search criteria
- Filter people based on search input using selectors
- Update state when people are added or deleted

## Step 1: Create the Store Directory Structure

First, create a directory structure for your NGRX store:

1. In the `core` folder, create a new directory called `store`
2. This directory will contain all your NGRX-related files

## Step 2: Define Actions

Create a file called `action.ts` in the `store` directory to define your actions:

These actions will:

- `setSearch`: Update the search term in the store
- `setPeople`: Update the people array in the store

## Step 3: Define State Interface

Create a file called `state.ts` in the `store` directory to define your state structure:

```typescript
import { People } from '../../shared/models/people.model';

export interface AppState {
  search: string;
  people: Array<People>;
}

export interface AppStore {
  store: AppState;
}

export const INITIAL_STATE: AppState = {
  search: '',
  people: [],
};
```

## Step 4: Create Reducers

Create a file called `reducer.ts` in the `store` directory to handle state changes:

The reducer:

- Takes the current state and an action as arguments
- Returns a new state object (immutability principle)
- Uses the `on` function to handle specific actions

## Step 5: Create Selectors

Create a file called `selector.ts` in the `store` directory to select pieces of state:

The selectors:

- `selectSearch`: Returns the current search term
- `selectPeople`: Returns the filtered list of people based on the search term
- Use memoization for performance optimization

## Step 6: Register the Store

Register your store in the application. For standalone applications, update `main.ts`:

## Step 7: Integrate with the People Service

Update the `PeopleService` to dispatch actions when data changes:

## Step 8: Connect the Store to Components

Update the `PeopleComponent` to use the NGRX store:

## Step 9: Test Your Implementation

Run your application to verify that the NGRX store is working correctly:

```shell
npm run client -- 31-ngrx-store
```

Test the following functionality:

1. The list of people should load correctly
2. Searching should filter the list based on first or last name
3. Deleting a person should update the list
4. Adding a new person should update the list

## Understanding NGRX Patterns

### Immutable State Updates

NGRX follows the immutability principle. Reducers always return a new state object:

```typescript
on(setSearch, (state, { search }) => ({ ...state, search }));
```

This ensures predictable state changes and enables features like time-travel debugging.

### Memoized Selectors

Selectors use memoization to optimize performance:

```typescript
export const selectPeople = createSelector(selectRootStore, state => state.people.filter(filterPeople(state.search)));
```

The selector only recalculates when its dependencies change.

### Action Naming Conventions

Use descriptive action names with context:

```typescript
export const SET_SEARCH = '[APP] - Set Search';
export const SET_PEOPLE = '[APP] - Set People';
```

The `[APP]` prefix indicates the feature or component that dispatches the action.

### Store Integration Patterns

There are multiple ways to use the store in components:

1. **Direct Observable subscription**:

```typescript
people$ = this.store.select(selectPeople);
```

2. **Converting to signals** (recommended for modern Angular):

```typescript
people = toSignal(this.store.select(selectPeople), { requireSync: true });
```

By completing this exercise, you've learned how to implement a complete state management solution using NGRX, including defining actions, reducers, selectors, and integrating them with Angular services and components. This provides a solid foundation for managing complex application state in a predictable and maintainable way.
