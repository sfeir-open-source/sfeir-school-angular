<!-- .slide: class="sfeir-basic-slide with-code" -->
# NGRX: Store
<ul>
    <li>service à injecter dans nos composants</li>
    <li>possède les méthodes __dispatch__ et __select__</li>
</ul>
<br><br>
```typescript
@Component({...})
export class MyCounterComponent {
  count$: Observable<number>;
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }
  increment() {
    this.store.dispatch(increment());
  }
}
```
<!-- .element: class="big-code" -->
