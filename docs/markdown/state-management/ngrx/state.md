<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: State
<br>
<ul>
    <li>mapping de clé-valeur</li><br>
    <li>récupérer grâce à nos sélectors</li><br>
    <li>retourne toujours un observable</li>
</ul>
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
Notes
- la première interface est l'interface de mon state
- la seconde celle de mon enregistrement root de mon store => StoreModule.forRoot({ people: fromPeopleReducer.reducer }). Ici on enregistre un store global nommé people qui a pour valeur l'object { people, search }
- la constante consiste en mon inital state
