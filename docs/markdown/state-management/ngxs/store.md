<!-- .slide -->
# Store: Definition

The **store** is a global or feature-level state manager that allows you to:
<br/><br/>

-   Dispatch actions<br/><br/>
-   Select the state, either in its entirety or partially

##==##

<!-- .slide: class="with-code inconsolata" -->
# Store: Actions

Create the action:

```typescript
export class AddAnimal {
  static readonly type = '[Zoo] Add Animal';
  constructor(public name: string) {}
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Store: Actions

Use the action:

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
