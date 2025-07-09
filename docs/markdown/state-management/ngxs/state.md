<!-- .slide: class="with-code inconsolata" -->

# State: Definition

A **State** is a class decorated with `@State` that defines a state container.
<br/><br/>

```typescript
import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { AnimalService } from '@core/providers/animal.service';

@State<string[]>({
   name: 'animals',
   defaults: []
})
@Injectable()
export class AnimalsState {
    constructor(private readonly animalService: AnimalService) {}
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# State: Configuration

```typescript
@State<string[]>({
  name: 'animals',
  defaults: []
})
```
<!-- .element: class="big-code" -->

<br/><br/>

This state configuration indicates:

-   The state model is an array of strings: **`<string[]>`**
-   The name of the state slice is 'animals' (the `name` property is required).
-   The initial state is an empty array (the `defaults` property defines the initial value).
-   **Note**: There is also a `children` property for registering nested state classes.

##==##

<!-- .slide: class="with-code inconsolata" -->

# State: Handling Actions (Reminder)

Recall the actions we defined in our **`todos.actions.ts`** file:

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
# State: Declaring Action Handlers

```typescript
import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { Todo } from './todo.actions';

@State<string[]>({
  name: 'todo',
  defaults: []
})
@Injectable()
export class TodoState {
  @Action(Todo.Add)
  addTodo(ctx: StateContext<string[]>, action: Todo.Add): void {
    const state = ctx.getState();
    ctx.setState([...state, action.payload]);
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# State: Action Handler Summary

- An action handler is a method within a state class that is decorated with **`@Action`** and takes the state context and the action as parameters.

<br/><br/>

- The **`StateContext`** provides the following methods:
  - `getState()`: Returns the current value of the state slice.
  - `setState()`: Sets the state slice to a new value.
  - `patchState()`: Modifies a part of the state slice.
  - `dispatch()`: Dispatches a new action.

**Notes:**
- You can use destructuring to access context methods directly: `addTodo({ setState, getState }, action) { ... }`
- It's also possible to use third-party libraries like Immer to simplify immutable updates (https://immerjs.github.io/immer/docs/introduction).
