# NGRX: State

- A key-value map representing the data structure. <br/><br/>
- Accessed reactively using selectors. <br/><br/>
- The store provides state as an Observable.

##==##

<!-- .slide: class="with-code inconsolata" -->

# NGRX: State

```typescript
// Defines the shape of the state for this feature
export interface State {
  count: number;
  error: any;
}

// Defines the initial state for this feature
export const initialState: State = {
  count: 0,
  error: null,
};
```

<!-- .element: class="medium-code" -->

Notes:

- The `State` interface defines the structure of your feature's state.
- The `initialState` provides the default values for the state when the application loads.
