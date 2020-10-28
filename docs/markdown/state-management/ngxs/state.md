<!-- .slide: class="with-code inconsolata" -->

# State : définition

Le **State** est une class préfixée de l'annotation **@State** qui définit notre state container.
<br><br>

```typescript
import { State } from '@ngxs/store';
import { AnimalService } from '@core/providers/animal.service';

@State<string[]>({
    name: 'animals',
    defaults: []
})
export class AnimalsState {
    constructor(private readonly animalService: AnimalService) {}
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# State : configuration

```typescript
@State<string[]>({
  name: 'animals',
  defaults: []
})
```

<!-- .element: class="big-code" -->

Ici notre state indique: <br>

-   qu'il s'agit d'un tableau de strings: **<strings[]>**
-   que le nom de notre state est 'animals' (name est une prop obligatoire)
-   notre state initial est un tableau vide: (la prop default sert d'initialisation)
    Notes:
-   Il existe encore une props: children qui sont les states associés

##==##

<!-- .slide: class="with-code inconsolata" -->

# State : Réduire nos actions (rappel)

Rappel: dans notre fichier **todos.actions.ts** nous avions ce contenu

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

<!-- .slide: class="with-code inconsolata" -->

# State : déclarer nos actions

```typescript
import { State, Action, StateContext } from '@ngxs/store';
import { Todo } from './todo.action';
@State<string[]>({
    name: 'todo',
    default: []
})
export class TodoState {
    constructor() {}
    @Action(Todo.Add)
    addTodo(ctx: StateContext<string[]>, action: any): void {
        const state: strings[] = ctx.getState();
        ctx.setState([...state, action.payload]);
    }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# State : Déclarer nos actions

- Pour résumer une action se caractérise par:
    - une fonction prenant en paramètre le context de type **StateContext** et le payload
    - l'annotation **@Action**

<br><br>

- Le **StateContext** possède les méthodes suivantes:
    - setState: pour setter un nouvelle état du state dans son entièreté
    - getState: récupère le state dans son entièreté
    - patchState: modifier partiellement le state
    - dispatch: lance une nouvelle action

Notes:
-   coup de puce: penser au spread opérator pour récupérer directement la méthode qui vous interesse
-   il également possible d'utiliser des librairies tiers comme immer permettant de rendre chaque modification immutable (https://immerjs.github.io/immer/docs/introduction)
