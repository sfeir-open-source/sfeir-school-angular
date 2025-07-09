# NGRX: State

- A key-value map representing the data structure.
- Accessed reactively using selectors.
- The store provides state as an Observable.<br/><br/>

##==##
<!-- .slide: class="with-code inconsolata" -->

# NGRX: State

```typescript
// Defines the shape of the state for this feature
export interface State {
  people: Person[];
  searchQuery: string;
  loading: boolean;
  error: any;
}

// Defines the initial state for this feature
export const initialState: State = {
  people: [],
  searchQuery: '',
  loading: false,
  error: null
};
```
<!-- .element: class="medium-code" -->

**Note:**
- The `State` interface defines the structure of your feature's state.
- The `initialState` provides the default values for the state when the application loads.
