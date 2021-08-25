<!-- .slide-->

# Selectors : Définition

Les sélecteurs sont des fonctions qui récupèrent une partie ou totalement notre state<br><br>
Dans **NGXS** il existe deux méthodes pour séléctionner notre state (ou partie de notre state):<br><br>

-   méthode select du store<br><br>
-   le décorateur **@Select**

##==##

<!-- .slide: class="with-code inconsolata" -->

# Selectors : Décorateur @Select

```typescript
import { Select } from '@ngxs/store';
import { ZooState, ZooStateModel } from './zoo.state';
@Component({ ... })
export class ZooComponent {
  // Reads the name of the state from the state class
  @Select(ZooState) animals$: Observable<string[]>;
  // Uses the pandas memoized selector to only return pandas
  @Select(ZooState.pandas) pandas$: Observable<string[]>;
  // Also accepts a function like our select method
  @Select(state => state.zoo.animals) animals$: Observable<string[]>;
  // Reads the name of the state from the parameter
  @Select() zoo$: Observable<ZooStateModel>;
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Selectors : Select Function

Le store possède une méthode **select** qui peut être utile lorsque l'on ne peut pas déclarer statiquement un sélecteur avec le décorateur **@Select**.<br>
Attention cette méthode renvoie un Observable
<br><br>

```typescript
import { Store } from '@ngxs/store';
@Component({ ... })
export class ZooComponent {
  animals$: Observable<string[]>;
  constructor(private store: Store) {
    this.animals$ = this.store.select(state => state.zoo.animals);
  }
}
```

<!-- .element: class="big-code" -->

Notes:

-   Il existe la méthode selectOnce qui permet de prendre l'état courant et ne plus regarder le stream
-   Il existe également une méthode snapchot qui permet de récupérer l'état courant sans observable très utile dans les Interceptors

##==##

<!-- .slide: class="with-code inconsolata" -->

# Selectors : Memoized Selectors

Lorsque l'on souhaite utiliser un sélecteur dans différents endroits de son application ou encore avoir une logique de sélectors plus compliquée qu'un simple renvoi de state courant, les **Memoized Selectors** sont vos alliés.

```typescript
import { State, Selector } from '@ngxs/store';

@State<string[]>({
    name: 'animals',
    defaults: []
})
export class ZooState {
    @Selector()
    static pandas(state: string[]) {
        return state.filter(s => s.indexOf('panda') > -1);
    }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Selectors : Memoized Selectors

```typescript
@Component({...})
export class AppComponent {
  constructor(private readonly store: Store) { }
  // with the method decorator
  @Select(ZooState.pandas) pandas$: Observable<string[]>;
  // with the select method
  this.pandas$ = this.store.select(ZooState.pandas);
}
```

<!-- .element: class="big-code" -->
