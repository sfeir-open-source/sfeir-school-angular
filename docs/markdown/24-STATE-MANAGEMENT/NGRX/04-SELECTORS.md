<!-- .slide: class="with-code inconsolata" -->

# NGRX: Selectors

- Selectors are pure functions used to obtain slices of store state. <br/><br/>
- They provide a memoized, observable-based way to access data. <br/><br/>

```typescript
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './counter.reducer';

// 1. Create a feature selector for the 'people' state slice
export const selectCounterState = createFeatureSelector<State>('counterStore');

// 2. Create a selector to get the list of people
export const selectCount = createSelector(selectCounterState, (state: State) => state.count);

// 3. Create a selector that composes other selectors
export const selectOddCount = createSelector(selectCounterState, state => state.count % 2 === 0);
```

<!-- .element: class="medium-code" -->
