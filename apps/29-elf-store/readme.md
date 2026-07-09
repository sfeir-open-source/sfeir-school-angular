# 29 · State Management with Elf

> Centralize the people list and a search term in an Elf store, with reactive filtering.

**Folder** `apps/29-elf-store` · **Solution** `apps/29-elf-store-solution` · **Run** `npm run client -- 29-elf-store`

## 🎯 Goal

Introduce a store as the single source of truth for the People feature: it holds the people (as entities) and a search term, and derives the filtered list reactively. Elf gives you this with far less boilerplate than NgRx.

## 📚 What you'll learn

- How to create an Elf store with `withProps` and `withEntities`
- How to write selectors and updates
- How to connect a store to Angular components with `toSignal`

## ✅ Before you start

- Ensure the Elf packages are installed:

  ```bash
  npm install @ngneat/elf @ngneat/elf-entities
  ```

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the store service

In `core/store/app-store.ts`, define the store, its selectors and its updates:

```typescript
import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { selectAllEntitiesApply, setEntities, withEntities } from '@ngneat/elf-entities';
import { switchMap } from 'rxjs';
import type { People } from '../../shared/models/people.model';

export interface IAppStore {
  search: string;
}

const filteredPeople = (search: string) => (person: People) =>
  person.firstname.toLowerCase().includes(search.toLowerCase()) ||
  person.lastname.toLowerCase().includes(search.toLowerCase());

@Injectable({ providedIn: 'root' })
export class AppStore {
  private store = createStore(
    { name: 'PEOPLE_STORE' },
    withProps<IAppStore>({ search: '' }),
    withEntities<People>({ initialValue: [], idKey: 'id' }),
  );

  selectSearch$ = this.store.pipe(select(state => state.search));

  selectPeoples$ = this.selectSearch$.pipe(
    switchMap(search => this.store.pipe(selectAllEntitiesApply({ filterEntity: filteredPeople(search) }))),
  );

  setSearch(search: string): void {
    this.store.update(setProp('search', search));
  }

  setPeople(people: People[]): void {
    this.store.update(setEntities(people));
  }
}
```

### Step 2 — Feed the store from the service

In `people.service.ts`, inject `AppStore` and use `tap` to push fetched people into the store as a side effect.

### Step 3 — Read the store in the component

In `people.component.ts`, expose `selectPeoples$` and `selectSearch$` as signals with `toSignal`, and call `setSearch` when the search bar changes:

```html
<sfeir-search-bar [initialSearch]="search()" (search)="filterPeopleBySearch($event)" />
```

## ▶️ Run & verify

```bash
npm run client -- 29-elf-store
```

Open the People page and check:

- [ ] The list loads from the store
- [ ] Typing in the search bar filters by first/last name
- [ ] Deleting a person updates the store and the list

## 💡 Key concepts

- **`withEntities`** — manages a keyed collection with `setEntities`, `addEntities`, `updateEntities`, `deleteEntities`.
- **Derived state** — combining `selectSearch$` with `selectAllEntitiesApply` yields a filtered stream that recomputes whenever either input changes.
- **`toSignal`** — converts store observables to signals for clean, `OnPush`-friendly templates.

## 🧯 Troubleshooting

- **Store is empty** — make sure the service's `tap` calls `setPeople(...)` after the fetch.
- **Filtering does nothing** — confirm the search bar calls `setSearch` and the component reads `selectPeoples$`.
- **Type errors on entities** — `withEntities` needs an `idKey` matching your model (`'id'`).
