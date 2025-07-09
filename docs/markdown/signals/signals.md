<!-- .slide: class="with-code inconsolata"-->
# How to create a Signal
<br/><br/>

```typescript
const name = signal<string>('SFEIR');
```
<!-- .element: class="big-code"-->

<br /><br/>

The signature of a signal is as follows:
<!-- .element: class="important"-->

<br/><br/>

```typescript
import { EqualityFn, WritableSignal } from '@angular/core';

signal<T>(initialValue: T, options?: { equality?: EqualityFn<T> }): WritableSignal<T>;
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->

## Reading a signal's value

<br/><br/>

- In the component's class:
```typescript
const name = signal<string>('SFEIR');
console.log(name()); // SFEIR
```
<!-- .element: class="big-code"-->

<br/><br/>

- In the template:
```html
<span>{{ name() }}</span>
```
<!-- .element: class="big-code"-->

##==##

# The WritableSignal Object
<br /><br />

- The **`set()`** method: allows you to change the signal's value by replacing it.<br /><br />
- The **`update()`** method: allows you to change the signal's value based on its previous value.<br /><br />
- The **`asReadonly()`** method: allows you to expose a signal as a read-only version.<br /><br />

##==##

<!-- .slide: class="with-code inconsolata"-->
# The `set()` method

<br/><br/>

- Allows you to set a new value for the signal, replacing the old one.<br /><br />

```typescript
const name = signal<string>('SFEIR');
console.log(name()); // SFEIR

name.set('Google');
console.log(name()); // Google
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# The `update()` method

<br/><br/>

- Allows you to modify the signal's value using its previous value.<br /><br />

```typescript
const name = signal<string>('SFEIR');
console.log(name()); // SFEIR

name.update(currentName => `${currentName} Luxembourg`);
console.log(name()); // SFEIR Luxembourg
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# The `asReadonly()` method

<br/><br/>

- Allows you to expose a signal as a read-only `Signal`.<br /><br />

```typescript
const name = signal<string>('SFEIR');
const nameReadonly = name.asReadonly();
console.log(nameReadonly()); // SFEIR

// The following line would cause a compilation error:
// nameReadonly.set('Google'); // Error: Property 'set' does not exist on type 'Signal<string>'.
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Changing the Equality Function

- You can change how Angular detects if the value has changed.<br/><br/>
- Be careful, as this can lead to bugs if not used correctly.<br/><br/>

```typescript
import { isEqual } from 'lodash-es';

const data = signal(['test'], { equal: isEqual });

// This will not trigger updates because isEqual returns true
data.set(['test']);
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->

# Deriving a signal with `computed`

- A **`computed`** signal is defined by a derivation function.<br/><br/>
- It is lazily evaluated and memoized by default.<br/><br/>
- Its dependencies are tracked dynamically.<br/><br/>

```typescript
const showCount = signal(false);
const count = signal(0);
const conditionalCount = computed(() => {
  if (showCount()) {
    return `The count is ${count()}.`;
  } else {
    return 'Nothing to see here!';
  }
});
```
<!-- .element: class="big-code"-->

##==##

# Performing side effects with `effect`

<br/><br/>

- An **`effect`** is defined by a side-effect function.<br/><br/>
- The function runs at least once.<br/><br/>
- It re-runs whenever its tracked signal dependencies change.<br/><br/>
- An effect must be created within an injection context.<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata"-->
# Performing side effects with `effect`

```typescript
@Component({ selector: 'app-root', template: ''})
export class AppComponent {
  id = signal('12');
  todo = signal<Todo | null>(null);

  constructor() {
    effect((onCleanup) => {
      const controller = new AbortController();
      onCleanup(() => controller.abort());

      fetch(`/todos/${this.id()}`, { signal: controller.signal })
        .then(response => response.json())
        .then(data => this.todo.set(data));
    });
  }
}
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Performing side effects with `effect` outside constructor

```typescript
@Component({ selector: 'app-root', template: ''})
export class AppComponent implements OnInit {
  readonly #injector = inject(Injector);
  id = signal('12');
  todo = signal<Todo | null>(null);

  ngOnInit(): void {
    effect((onCleanup) => {
      const controller = new AbortController();
      onCleanup(() => controller.abort());

      fetch(`/todos/${this.id()}`, { signal: controller.signal })
        .then(res => res.json())
        .then(data => this.todo.set(data));
    }, { injector: this.#injector });
  }
}
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Preventing re-evaluation with `untracked`

- **`untracked`** prevents a signal read from being tracked as a dependency.<br/><br/>
- It is used inside a reactive function (`computed` or `effect`).<br/><br/>
- **`untracked`** takes a function as its parameter.<br/><br/>

```typescript
const company = signal('SFEIR');
const employeeNumber = signal(100);

effect(() => {
  console.log(`The company ${untracked(company)} has ${employeeNumber()} employees.`);
});
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Putting it all together
<br/><br/>

```typescript
const counter = signal(0);
const isEven = computed(() => counter() % 2 === 0);

effect(() => {
  console.log(`The counter is ${counter()} and is ${isEven() ? 'even' : 'odd'}.`);
});

// The effect runs. Logs: "The counter is 0 and is even."

counter.set(1);
// The effect runs again. Logs: "The counter is 1 and is odd."

counter.set(2);
// The effect runs again. Logs: "The counter is 2 and is even."
```
<!-- .element: class="big-code"-->

##==##

# Putting it all together

![h-900 full-width](assets/images/school/signals/signals-working.png)

##==##

# Interoperability with RxJS

RxJS is not deprecated; it is now used for different purposes:<br/><br/><br/>

- **Signals** are used to manage the state of your application (e.g., the state of a loader).<br/><br/>
- **RxJS** is used to manage events and asynchronous streams (e.g., user input, WebSocket messages).<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata"-->
# Interoperability with RxJS: `toObservable`

The `toObservable` function converts a signal into an RxJS observable.<br/><br/>

```typescript
import { toObservable } from '@angular/core/rxjs-interop';

const counter = signal(0);
const counter$ = toObservable(counter);

counter$.subscribe(value => console.log(value)); // Logs 0

counter.set(1); // Logs 1
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Interoperability with RxJS: `toSignal`

The `toSignal` function converts an observable into a signal.<br/><br/>

```typescript
import { toSignal } from "@angular/core/rxjs-interop";
import { of } from "rxjs";

const counter$ = of(0);
const counter = toSignal(counter$, { requireSync: true });

console.log(counter()); // 0
```
<!-- .element: class="big-code"-->

**`toSignal`** takes an observable and a configuration object as parameters:<br/><br/>

- `initialValue`: (required for async sources) defines an initial value before the observable emits.<br/><br/>
- `requireSync`: ensures the observable emits synchronously on subscription. Throws an error if it doesn't.<br/><br/>
