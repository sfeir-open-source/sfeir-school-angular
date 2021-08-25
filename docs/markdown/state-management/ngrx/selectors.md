<!-- .slide: class="with-code inconsolata" -->
# NGRX : Selectors

- Permettent de retourner partiellement ou entièrement le store
- Renvoie toujours un Observable

<br><br>

```typescript
export const getPeopleState = (state: PeopleFeature) => state.people;

export const getFilteredPeople = createSelector(getPeopleState, (state: State) =>
  filterPeople(state.search, state.people)
);
export const getSearch = createSelector(getPeopleState, (state: State) => state.search);
```
<!-- .element: class="big-code" -->
