<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: State
<ul>
    <li>mapping de clé-valeur</li>
    <li>récupérer grâce à nos sélectors</li>
    <li>retourne toujours un observable</li>
</ul><br><br>
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
Notes
- la première interface est l'interface de mon state
- la seconde celle de mon enregistrement root de mon store => StoreModule.forRoot({ people: fromPeopleReducer.reducer }). Ici on enregistre un store global nommé people qui a pour valeur l'object { people, search }
- la constante consiste en mon inital state
