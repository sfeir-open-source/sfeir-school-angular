<!-- .slide: class="two-column-layout" -->
# NGRX : Reducers
##--##
<br><br>

- contient l'ensemble des actions
- contient le métier des actions
- Seul endroit ou l'on modifie le state
- une mutation est toujours synchrone
##--##
<!-- .slide: class="with-code inconsolata" -->
<br><br>

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
