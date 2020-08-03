# NGRX : State

- Mapping clé-valeur
- Récupérer grâce à nos  sélectors
- Retourne toujours un observable <br><br>

##==##
<!-- .slide: class="with-code inconsolata" -->

# NGRX : State

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
<!-- .element: class="medium-code" -->

Notes:
- la première interface est l'interface de mon state
- la seconde celle de mon enregistrement root de mon store => StoreModule.forRoot({ people: fromPeopleReducer.reducer }). Ici on enregistre un store global nommé people qui a pour valeur l'object { people, search }
- la constante consiste en mon inital state