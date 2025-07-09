<!-- .slide: class="with-code inconsolata" -->

# Action: Definition

**Actions** are commands that trigger a state mutation.<br/><br/>
The state can only be modified through actions.
<br/><br/>

Each action must contain a static `type` property that serves as a unique identifier.<br/><br/><br/>

```typescript
export class FeedZebra {
  static readonly type = '[Zoo] Feed Zebra';
  constructor(public name: string, public hayAmount: number) {}
}
```
<!-- .element: class="big-code" -->

**Note:**
- In this example, we are passing arguments (`name` and `hayAmount`) when we dispatch the action.

##==##

<!-- .slide: class="with-code inconsolata" -->
# Action: How to Dispatch It

- In a component, an action is dispatched using the `store.dispatch()` method.
- Dispatching an action returns an Observable.<br/><br/>

```typescript
import { Store } from '@ngxs/store';

@Component({ ... })
export class ZooComponent {
  constructor(private readonly store: Store) {}

  feedZebra(name: string, hayAmount: number): void {
    this.store.dispatch(new FeedZebra(name, hayAmount));
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# Actions: Naming Convention

A **good** action type should have three parts:<br/><br/>

-   The context where the action originates (e.g., `[User Page]`, `[API]`).
-   A verb describing what the action does (e.g., `Add User`).
-   The entity it acts upon is often implied by the context.<br/><br/>
    **Example**: On a click, I add a user to a table.<br/><br/>
    **`[User Page] Add User`**

##==##

<!-- .slide: class="with-code inconsolata" -->

# Actions: Grouping Actions

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
<!-- .element: class="medium-code" -->
