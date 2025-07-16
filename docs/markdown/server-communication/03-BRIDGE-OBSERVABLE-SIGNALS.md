# Observable vs Signal ?

<br/><br/>

> STOP! Don't do think like that! Signal and Observable are different things! They work together to make you Angular application more robust

##==##

<!-- .slide: class="two-column" -->

## Signal

<br/><br/>

- Signal is **synchronous** <br/><br/>
- Signal have **an initial value** <br/><br/>
- Signal represent the **current state** of you view

##--##

## Observable

<br/><br/>

- Observable is **asynchronous** <br/><br/>
- Observable doesn't really necessary have **initial value** <br/><br/>
- Observable represent the **flow of your user**

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

<!-- .slide: class="two-column"-->

# rxResource

- function to **derive** a signal in **asynchronous** with an **observable** <br/><br/>
- return a **resource** composed of
  - **value**: WritableSignal which is the result of the derivation
  - **loading**: Signal which is true when the resource is loading
  - **error**: Signal which represent the error of the resource
  - **status**: Signal which represent the status of the resource

##--##

<!-- .slide: class="with-code inconsolata"-->

<br/><br/>

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
     * params: () => undefined
     */
    params: this.idTodo,
    stream: ({ params: id }) => this.http.get<Todo[]>(`/api/todos/${id}`),
  });
}
```

<!-- .element: class="medium-code" -->
