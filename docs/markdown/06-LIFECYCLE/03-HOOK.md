# Hooks in Angular

<br/><br/>

> Since, the apparition of Signals in Angular, a new way of managing the lifecycle of the application has been introduced: **hooks**.

Notes:

- This module is a bonus: there's no matching `apps/` exercise for it. But `08-directive`, right after `07-provider`, uses `effect()` inside a directive's constructor to react to an input signal — this is where that pattern comes from.
- In a signals-first codebase, most of the classic lifecycle hooks from the previous slides shrink to a niche role: `ngOnChanges` is replaced by simply reading an `input()` signal wherever you need it, `ngOnInit`'s "run once on creation" role is often just a field initializer or an `effect()`. `ngOnDestroy` and `ngAfterViewInit` still matter — signals don't touch teardown or view-query timing.

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

- **effect**: runs whenever a signal it reads changes (called multiple times) <br/><br/>
- **afterNextRender**: runs once, after the **next** render (great for DOM measurement) <br/><br/>
- **afterEveryRender**: runs after **every** render (called multiple times) <br/><br/>
- **afterRenderEffect**: run after a render and when the effect dependencies change (called multiple times) <br/><br/>

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
  - **value**: Signal holding the result of the derivation
  - **isLoading**: Signal which is `true` while the resource is loading
  - **error**: Signal holding the error, if any
  - **status**: Signal describing the resource status (`idle`, `loading`, `resolved`, `error`…)

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
