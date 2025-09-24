<!-- .slide: class="with-code inconsolata" -->

# NGRX: Store

- A service that is injected into your components.
- Provides the `dispatch` and `select` methods.<br/><br/>

```typescript
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';
import { increment } from './counter.actions';

@Component({ selector: 'my-counter', templateUrl: './count.html' })
export class Counter {
  private readonly store = inject(Store);
  count$ = this.store.select(selectCount);

  increment() {
    this.store.dispatch(increment());
  }
}
```

<!-- .element: class="medium-code" -->
