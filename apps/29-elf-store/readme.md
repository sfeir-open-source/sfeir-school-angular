# Exercise 29: Implementing an Elf Store in Angular

## Introduction to Elf

Elf is a powerful, framework-agnostic state management library built on top of RxJS. It provides a simple and efficient way to manage application state with a focus on developer experience. Unlike NgRx, Elf has a more streamlined API with less boilerplate while still maintaining the benefits of centralized state management.

In this workshop, you'll implement an Elf store to manage the state of a people list with search functionality. You'll learn how to:

- Create and configure an Elf store
- Define store properties and entities
- Update and query the store
- Connect the store to Angular components
- Implement reactive filtering with RxJS

## What You'll Build

You'll build a store that:

- Maintains a list of people as entities
- Stores a search term
- Provides filtered people based on the search term
- Updates automatically when data changes

## Prerequisites

Ensure you have the Elf packages installed:

```bash
npm install @ngneat/elf @ngneat/elf-entities
```

## Step 1: Create the Store Directory

First, create a directory to house your store implementation in the core/store folder:

This directory will contain the global store for your application.

## Step 2: Create the AppStore Service

Create a new file `app-store.ts` in the store directory with the following imports:

```typescript
import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { selectAllEntitiesApply, setEntities, withEntities } from '@ngneat/elf-entities';
import { switchMap } from 'rxjs';
import type { People } from '../../shared/models/people.model';
```

## Step 3: Define the Store Interface and Filter Function

Define the interface for your store state and a helper function to filter people:

```typescript
export interface IAppStore {
  search: string;
}

const filteredPeople = (search: string) => (person: People) =>
  person.firstname.toLowerCase().includes(search.toLowerCase()) || person.lastname.toLowerCase().includes(search.toLowerCase());
```

## Step 4: Implement the AppStore Service

Implement the AppStore service with the following features:

This service:

- Creates a store with a name 'PEOPLE_STORE'
- Uses `withProps` to add a search property
- Uses `withEntities` to manage the people collection
- Provides selectors for search term and filtered people
- Provides methods to update the search term and people collection

## Step 5: Update the PeopleService

Modify the PeopleService to integrate with the store:

1. Inject the AppStore service
2. Use the `tap` operator to update the store when people data changes

## Step 6: Update the PeopleComponent

Modify the PeopleComponent to use the store:

## Step 7: Connect the Search Component

Update the template to connect the search component to the store:

```html
<sfeir-search-bar [initialSearch]="search()" (search)="filterPeopleBySearch($event)" />
```

## Step 8: Understanding the Elf Store Architecture

### Store Creation

Elf uses a functional approach to create stores:

```typescript
createStore(
  { name: 'STORE_NAME' },
  withProps<Interface>({
    /* initial props */
  }),
  withEntities<EntityType>({
    /* entity config */
  }),
);
```

### Entity Management

The `withEntities` feature provides methods to manage collections of objects with unique IDs:

- `setEntities`: Replace all entities
- `addEntities`: Add new entities
- `updateEntities`: Update existing entities
- `deleteEntities`: Remove entities

### Selectors

Selectors create observables that emit when the selected state changes:

```typescript
store.pipe(select(state => state.someProperty));
```

### Updates

The `update` method applies changes to the store:

```typescript
store.update(setProp('propertyName', newValue));
store.update(setEntities(newEntities));
```

## Step 9: Test Your Implementation

Verify your work by running:

```bash
npm run client -- 29-elf-store
```

Test the functionality by:

1. Observing the initial list of people
2. Entering search terms in the search bar
3. Verifying that the list filters correctly
4. Deleting a person and confirming the store updates

## Advanced Concepts

### Combining Selectors

The implementation uses RxJS `switchMap` to combine selectors, creating a derived state that depends on multiple pieces of state.

### Integration with Signals

The `toSignal` function from `@angular/core/rxjs-interop` converts store observables to Angular signals, making them easier to use in templates with the OnPush change detection strategy.

### Side Effects

The `tap` operator is used to create side effects that update the store when HTTP operations complete, without affecting the main observable chain.

## Conclusion

You've successfully implemented an Elf store to manage application state in a reactive way. This approach provides several benefits:

- Centralized state management
- Reactive updates with RxJS
- Improved component architecture
- Better performance with OnPush change detection
- Simplified testing

Elf offers a lightweight alternative to NgRx while still providing powerful state management capabilities.
