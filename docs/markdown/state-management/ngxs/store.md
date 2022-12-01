<!-- .slide -->
# Store : Définition

Le **store** est un gestionnaire d'état global/par feature qui permet:
<br/><br/>

-   de dispatcher des actions<br/><br/>
-   sélectionner le state dans son entièreté ou partiellement

##==##

<!-- .slide: class="with-code inconsolata" -->
# Store : Actions

Créer l'action:

```typescript
export class AddAnimal {
  static readonly type = '[Zoo] Add Animal';
  constructor(public name: string) {}
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Store : Actions

Utiliser l'action:

```typescript
import { Store } from '@ngxs/store';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {
  constructor(private store: Store) {}

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name));
  }
}
```

<!-- .element: class="big-code" -->
