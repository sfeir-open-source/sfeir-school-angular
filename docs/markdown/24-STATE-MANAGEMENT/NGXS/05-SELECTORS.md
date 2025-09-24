<!-- .slide-->

# Selectors: Definition

Selectors are functions that retrieve a slice of your state.<br/><br/>
In **NGXS**, there are two primary ways to select state:<br/><br/>

- The **store.select()** method to return an `Observable`.<br/><br/>
- The **store.selectSignal()** method to return a `Signal`. <br/><br/>
- The select function helper to return a `Signal`.<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# Selectors: `select` Function

The store also has a `select` method, which is useful when you cannot use the `@Select` decorator (e.g., in a service or dynamically).

<br/><br/>

```typescript
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

@Component({ ... })
export class ZooComponent {
  animals$: Observable<string[]> = inject(Store).select(state => state.zoo.animals);
  animals: Signal<string[]> = inject(Store).selectSignal(state => state.zoo.animals);
}
```

<!-- .element: class="big-code" -->

Notes:

- `store.selectOnce()`: Selects the current state and then completes the observable stream.
- `store.snapshot()`: Returns the raw value of the state at that instant, without an Observable. This is very useful in contexts like route guards or HTTP interceptors.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Selectors: Memoized Selectors

When you need to reuse a selector in multiple places or have complex logic, **Memoized Selectors** are the perfect tool. They are defined within the state class using the `@Selector` decorator.

```typescript
@State<string[]>({
  name: 'animals',
  defaults: [],
})
@Injectable()
export class ZooState {
  @Selector()
  static pandas(state: string[]) {
    return state.filter(s => s.includes('panda'));
  }
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Using Memoized Selectors

Once defined, you can use a memoized selector with either the `store.select()` or `store.selectSignal()` or `select()` methods. <br/><br/>

```typescript
@Component({ selector: 'sfeir-app', templateUrl: './app.html' })
export class App {
  pandasFromSelect$ = inject(Store).select(ZooState.pandas);
  pandasFromSelect = select(ZooState.pandas);
}
```

<!-- .element: class="big-code" -->
