<!-- .slide: class="with-code inconsolata" -->
# NGRX : Selectors
<br>

- Permettent de retourner partiellement ou entièrement le store
- Renvoie toujours un observable

<br><br>

```typescript
export const getPeopleState = (state: PeopleFeature) => state.people;

export const getFilteredPeople = createSelector(getPeopleState, (state: State) =>
  filterPeople(state.search, state.people)
);
export const getSearch = createSelector(getPeopleState, (state: State) => state.search);
```
<!-- .element: class="big-code" -->
