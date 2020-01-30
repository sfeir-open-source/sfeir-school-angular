<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: Selectors
<br>
<ul>
    <li>Permettent de retourner partiellement ou entièrement le store</li><br>
    <li>Renvoie toujours un observable</li>
</ul>
<br><br>
```typescript
export const getPeopleState = (state: PeopleFeature) => state.people;

export const getFilteredPeople = createSelector(getPeopleState, (state: State) =>
  filterPeople(state.search, state.people)
);
export const getSearch = createSelector(getPeopleState, (state: State) => state.search);
```
<!-- .element: class="big-code" -->
