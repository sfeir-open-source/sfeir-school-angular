<!-- .slide: class="with-code inconsolata" -->
# NGRX: Store

- A service that is injected into your components.
- Provides the `dispatch` and `select` methods.<br/><br/>

```typescript
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCount } from './counter.selectors';
import { increment } from './counter.actions';

@Component({...})
export class MyCounterComponent {
  count$: Observable<number>;

  constructor(private store: Store) {
    this.count$ = this.store.select(selectCount);
  }

  increment() {
    this.store.dispatch(increment());
  }
}
```
<!-- .element: class="big-code" -->
