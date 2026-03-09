# Hooks in Angular

<br/><br/>

> Since, the apparition of Signals in Angular, a new way of managing the lifecycle of the application has been introduced: **hooks**.

##==##

# What are hooks?

- **New Way** to manage the lifecycle of the application <br/><br/>
- **Hooks** are functions that are called at specific points in the lifecycle of the application <br/><br/>
- **Unblock** with the introduction of Signals

##==##

<!-- .slide: class="with-code max-height inconsolata"-->

# Example

```typescript
import { Component, effect } from '@angular/core';

@Component({
  selector: 'sfeir-app',
  template: `<div>Hello {{ name() }}</div>`,
})
export class App {
  name = signal('SFEIR');

  constructor() {
    effect(() => {
      const name = this.name();
      console.log(`Hello ${name}`);
    });
  }
}
```

<!-- .element: class="big-code"-->

##==##

# Available hooks

- **effect**: called during the change detection phase (called multiple times) <br/><br/>
- **afterNextRender**: called when the component is rendered (called only on time) <br/><br/>
- **afterEveryRender**: called each time the component is rendered (called multiple time) <br/><br/>
- **afterRenderEffects**: called when the component is rendered (called multiple time) <br/><br/>

##==##

# How to move from the older lifecycle ?

<br/><br/>

> Signal derivation combined with Hook let you do the same thing as the older lifecycle

##==##

# Signal Derivation

- **computed** is used to create a signal that is derived from another signal (synchronous)<br/><br/>
- **linkedSignal** is used to create a signal that is linked to another signal (synchronous)<br/><br/>
- **resource** is used to create a resource this is derived from another signal (asynchronous)<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata"-->

# Computed Signal derivation

- **Derived** a signal
- **Reevaluate** each time a signal dependency changes
- **Synchronous** derivation
- **No Need** to rewrite the computed value

```typescript
@Component({
  selector: 'sfeir-app',
  template: `<div>Hello {{ fullDenomination() }}</div>`,
})
export class App {
  name = signal('SFEIR');
  agency = signal('LUXEMBOURG');
  fullDenomination = computed(() => `${this.name()} ${this.agency()}`); // return a Signal
}
```

<!-- .element: class="big-code"-->

##==##

# Linked Signal

- **Linked** a signal to another one <br/><br/>
- **Reinitiate** each time the signal linked change <br/><br/>
- **Synchronous** derivation <br/><br/>
- **Need** to rewrite the linked signal value

##==##

<!-- .slide: class="with-code inconsolata"-->

# Linked Signal

```typescript
import { linkedSignal } from '@angular/core';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.html',
})
export class App {
  fruits = signal(['apple', 'banana', 'orange']);
  selectedFruit = linkedSignal(() => this.fruits()[0]);

  selectFruit(index: number): void {
    this.selectedFruit.set(this.fruits()[index]);
  }
  resetFruits(): void {
    this.fruits.set(['apple', 'banana', 'orange', 'grape']);
  }
}
```

<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->

# Resources

- function to **derive** a signal in **asynchronous** with a **promise** <br/><br/>
- return a **resource** composed of
  - **value**: WritableSignal which is the result of the derivation
  - **loading**: Signal which is true when the resource is loading
  - **error**: Signal which represent the error of the resource
  - **status**: Signal which represent the status of the resource

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: 'app.html',
})
export class App {
  private idTodo = signal(1);
  readonly todoResource = resource({
    params: this.idTodo,
    loader: ({ params: id, abortSignal }) => fetch(`/api/todos/${id}`, { signal: abortSignal }).then(res => res.json()),
  });
}
```

<!-- .element: class="small-code"-->
