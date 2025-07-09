<!-- .slide-->
# Selectors: Definition

Selectors are functions that retrieve a slice of your state.<br/><br/>
In **NGXS**, there are two primary ways to select state:<br/><br/>

-   The `store.select()` method.<br/><br/>
-   The **`@Select`** decorator.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Selectors: @Select Decorator

The `@Select` decorator is a convenient way to select state directly within your components.

```typescript
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ZooState, ZooStateModel } from './zoo.state';
import { Observable } from 'rxjs';

@Component({ ... })
export class ZooComponent {
  // 1. Selects the entire ZooState slice
  @Select(ZooState) zoo$: Observable<ZooStateModel>;

  // 2. Uses a memoized selector from the state class
  @Select(ZooState.pandas) pandas$: Observable<string[]>;

  // 3. Accepts a function to select a nested property
  @Select(state => state.zoo.animals) animals$: Observable<string[]>;
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Selectors: `select` Function

The store also has a `select` method, which is useful when you cannot use the `@Select` decorator (e.g., in a service or dynamically).

<br/><br/>

```typescript
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({ ... })
export class ZooComponent {
  animals$: Observable<string[]>;
  constructor(private store: Store) {
    this.animals$ = this.store.select(state => state.zoo.animals);
  }
}
```
<!-- .element: class="big-code" -->

**Note:**
- `store.selectOnce()`: Selects the current state and then completes the observable stream.
- `store.snapshot()`: Returns the raw value of the state at that instant, without an Observable. This is very useful in contexts like route guards or HTTP interceptors.

##==##

<!-- .slide: class="with-code inconsolata" -->
# Selectors: Memoized Selectors

When you need to reuse a selector in multiple places or have complex logic, **Memoized Selectors** are the perfect tool. They are defined within the state class using the `@Selector` decorator.

```typescript
import { Injectable } from '@angular/core';
import { State, Selector } from '@ngxs/store';

@State<string[]>({
  name: 'animals',
  defaults: []
})
@Injectable()
export class ZooState {
  @Selector()
  static pandas(state: string[]) {
    return state.filter(s => s.includes('panda'));
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Using Memoized Selectors

Once defined, you can use a memoized selector with either `@Select` or `store.select()`.

```typescript
@Component({...})
export class AppComponent {
  // With the @Select decorator
  @Select(ZooState.pandas) pandas$: Observable<string[]>;

  // With the store.select() method
  pandasFromSelect$: Observable<string[]>;

  constructor(private readonly store: Store) {
    this.pandasFromSelect$ = this.store.select(ZooState.pandas);
  }
}
```
<!-- .element: class="big-code" -->
