<!-- .slide: class="with-code inconsolata" -->
# NGRX: Selectors

- Selectors are pure functions used to obtain slices of store state.
- They provide a memoized, observable-based way to access data.

<br/><br/>

```typescript
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PeopleState } from './people.reducer';

// 1. Create a feature selector for the 'people' state slice
export const selectPeopleState = createFeatureSelector<PeopleState>('people');

// 2. Create a selector to get the list of people
export const selectAllPeople = createSelector(
  selectPeopleState,
  (state: PeopleState) => state.people
);

// 3. Create a selector that composes other selectors
export const selectFilteredPeople = createSelector(
    selectAllPeople,
    (people) => people.filter(p => p.attending)
);
```
<!-- .element: class="big-code" -->
