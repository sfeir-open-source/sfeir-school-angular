<!-- .slide: class="sfeir-basic-slide with-code" -->
# State: définition
<br><br>
Le __State__ est une est déclenchée de l'annotation __@State__ qui définie notre state container
<br><br>
```typescript
import { State } from '@ngxs/store';
import { AnimalService } from '@core/providers/animal.service';

@State<string[]>({
  name: 'animals',
  defaults: []
})
export class AnimalsState {
    constructor(private readonly animalService: AnimalService) { }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# State: configuration
<br>
```typescript
@State<string[]>({
  name: 'animals',
  defaults: []
})
```
<!-- .element: class="big-code" -->
<br><br>
Ici notre state indique: <br><br>
- qu'il s'agit d'un tableau de strings: __<strings[]>__
- que le nom de notre state est 'animals' (name est une props obligatoire)
- notre state initial est un tableau vide: (props default sert d'initialisation)
Notes
- Il existe encore une props: children qui sont les states associés

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# State: Réduire nos actions (rappel)
Rappel: dans notre fichier __todos.actions.ts__ nous avions ce contenu
<br><br>
```typescript
export namespace Todo {
  export class Add {
    static readonly type = '[Todo] Add';
    constructor(public payload: any) {}
  }

  export class Edit {
    static readonly type = '[Todo] Edit';
    constructor(public payload: any) {}
  }

  export class FetchAll {
    static readonly type = '[Todo] Fetch All';
  }

  export class Delete {
    static readonly type = '[Todo] Delete';
    constructor(public id: number) {}
  }
}
```

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# State: déclarer nos actions
<br>
```typescript
import { State, Action, StateContext } from '@ngxs/store';
import { Todo } from './todo.action';
@State<string[]>({
    name: 'todo',
    default: [],
})
export class TodoState {
    constructor() { }    
    @Action(Todo.Add)
    addTodo(ctx: StateContext<string[]>, action: any): void {
        const state: strings[] = ctx.getState();
        ctx.setState([...state, action.payload])
    }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# State: Déclarer nos actions
<br><br>
- Pour résumé une action se caractérise par:
<br><br>
    - une fonction prenant en paramètre le context de type __StateContext__  et le payload<br>
    - l'annotation __@Action__
<br><br>
- Le __StateContext__ possède les méthodes suivantes:<br><br>
    - setState: pour setter un nouvelle état du state dans son entièreté
    - getState: récupère le state dans son entièreté
    - patchState: modifier partiellement le state
    - dispatch: lance une nouvelle action
Notes
- coup de puce: penser au spreed opérator pour récupérer directement la méthode qui vous interesse
- il également possible d'utiliser des librairies tiers comme immer permettant de rendre chaque modification immutable (https://immerjs.github.io/immer/docs/introduction)
