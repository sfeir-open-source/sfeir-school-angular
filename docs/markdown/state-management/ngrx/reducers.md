<!-- .slide: class="two-column" -->
# NGRX : Reducers

<br/><br/>

- Contiennent l'ensemble des actions
- Contiennent le métier des actions
- Seul endroit où l'on modifie le state
- Une mutation est toujours synchrone

##--##
<!-- .slide: class="with-code inconsolata" -->
<br/><br/><br/>

```typescript
const _counterReducer = createReducer(initialState,
on(increment, state => state + 1),
on(decrement, state => state - 1),
on(reset, state => 0),
);
 
export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
```
<!-- .element: class="big-code" -->
