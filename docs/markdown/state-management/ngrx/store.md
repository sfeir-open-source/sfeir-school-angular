<!-- .slide: class="with-code inconsolata" -->
# NGRX : Store

- Service à injecter dans nos composants
- Possède les méthodes __dispatch__ et __select__<br/><br/>

```typescript
@Component({...})
export class MyCounterComponent {
  count$: Observable<number>;
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }
  increment() {
    this.store.dispatch(increment());
  }
}
```
<!-- .element: class="big-code" -->
