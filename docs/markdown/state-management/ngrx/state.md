<!-- .slide: class="with-code inconsolata" -->
# NGRX: State

- Mapping clé-valeur
- Récupérer grâce à nos  sélectors
- Retourne toujlurs un observable <br><br>

```typescript
export interface State {
  people: Object[];
  search: string;
}
export interface PeopleFeature {
  people: State;
}
export const initialState = {
  people: [],
  search: ''
};
```
<!-- .element: class="big-code" -->
Notes:
- la première interface est l'interface de mon state
- la seconde celle de mon enregistrement root de mon store => StoreModule.forRoot({ people: fromPeopleReducer.reducer }). Ici on enregistre un store global nommé people qui a pour valeur l'object { people, search }
- la constante consiste en mon inital state
