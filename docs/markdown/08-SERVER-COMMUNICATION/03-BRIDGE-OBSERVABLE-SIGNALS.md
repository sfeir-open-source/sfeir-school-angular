# Observable vs Signal ?

<br/><br/>

> STOP — it's not one _or_ the other! Signals and Observables solve different problems, and they work **together** to make your Angular application more robust.

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

## Signal

<br/><br/>

- Signal is **synchronous** <br/><br/>
- Signal have **an initial value** <br/><br/>
- Signal represent the **current state** of you view

##++##

##++##

## Observable

<br/><br/>

- Observable is **asynchronous** <br/><br/>
- Observable doesn't really necessary have **initial value** <br/><br/>
- Observable represent the **flow of your user**
  ##++##

##==##

# When to use Signal and when to use Observable

<br/><br/>

> Signal is present to manage the state of your view, Observable is present to manage the flow of your user

##==##

# Convert an observable to a signal

<br/><br/>

- **rxResource**: return a resource <br/><br/>
- **toSignal** return a signal

##==##

<!-- .slide: class="with-code inconsolata"-->

# ToSignal

- function to **convert** an observable to a signal
- refresh when observable emit
- unsubscribe automatically when view is destroyed <br/><br/>

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: 'app.html',
})
export class App {
  private readonly http = inject(HttpClient);
  readonly todos = toSignal(this.http.get<Todo[]>('/api/todos'), { initialValue: [], sync: false });
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="tc-multiple-columns"-->

##++##

# rxResource

- function to **derive** a signal in **asynchronous** with an **observable** <br/><br/>
- return a **resource** composed of
  - **value**: Signal holding the result of the derivation
  - **isLoading**: Signal which is `true` while the resource is loading
  - **error**: Signal holding the error, if any
  - **status**: Signal describing the resource status

##++##

##++## class="with-code inconsolata"

<br/><br/><br/><br/><br/><br/>

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: 'app.html',
})
export class App {
  private readonly http = inject(HttpClient);
  private idTodo = signal(1);
  readonly todoResource = rxResource({
    /**
     * if you don't want to refresh the call each time the id change:
     * params: undefined
     */
    params: this.idTodo,
    stream: ({ params: id }) => this.http.get<Todo[]>(`/api/todos/${id}`),
  });
}
```

<!-- .element: class="medium-code" -->

##++##
