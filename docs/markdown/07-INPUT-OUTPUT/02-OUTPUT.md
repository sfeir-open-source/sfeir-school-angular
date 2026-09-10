<!-- .slide -->

# The other direction: telling the parent something happened

`Card`'s "Delete" icon can't decide what deleting means — only `Home` knows (here, it just refreshes to a new random person). The child needs a way to say "this happened" without calling a parent method directly.

<br/>

> That's `output()`: a component declares an event; the parent decides how to react to it.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: output signal function

- In the child component (`child.component.ts`)

```typescript
@Component({
  selector: 'app-child',
})
export class ChildComponent {
  childEvent = output<string>();

  raiseEvent() {
    this.childEvent.emit('event from child');
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: output signal function

- In the parent component's HTML template (`parent.component.html`) <br/><br/>

```html
<section>
  <app-child (childEvent)="refreshList($event)" />
</section>
```

<!-- .element: class="big-code" -->
<br/>

- In the parent component (`parent.component.ts`) <br/><br/>

```typescript
refreshList(value: string): void {
  console.info(value); // event from child
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: @Output decorator (older way)

- In the child component (`child.component.ts`)

```typescript
@Component({
  selector: 'app-child',
})
export class ChildComponent {
  @Output() childEvent = new EventEmitter<string>();

  raiseEvent() {
    this.childEvent.emit('event from child');
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: @Output decorator

- In the parent component's HTML template (`parent.component.html`) <br/><br/>

```html
<section>
  <app-child (childEvent)="refreshList($event)" />
</section>
```

<!-- .element: class="big-code" -->
<br/>

- In the parent component (`parent.component.ts`) <br/><br/>

```typescript
refreshList(value: string): void {
  console.info(value); // event from child
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# `Card`: a `delete` output carrying an id

```typescript
// libs/ui/card/card.ts
import { output } from '@angular/core';

export class Card {
  public readonly person = input.required<Person>();
  public readonly delete = output<string>();

  handleDelete(id: string): void {
    this.delete.emit(id);
  }
}
```

<!-- .element: class="medium-code" -->

```html
<!-- card.html -->
<a (click)="handleDelete(person().id)">Delete</a>
```

<!-- .element: class="medium-code" -->

```html
<!-- home.html -->
<sfeir-card [person]="person()" (delete)="refresh()" />
```

<!-- .element: class="medium-code" -->

Notes:

- Note the naming: the output is `delete`, but the *template* handler for the click is `handleDelete` — the output and its emitting method don't have to (and usually shouldn't) share the click handler's name.
- `Home`'s `refresh()` doesn't need the emitted id at all here — it just needs to know "something happened", so the event binding ignores `$event`, exactly like a native DOM event.

##==##

<!-- .slide -->

# One-way data flow, front and center

`Card` never mutates `Home`'s state directly — it has no way to. It can only:

<br/>

- **read** what `Home` gave it, through `person()`
- **emit** an event and let `Home` decide what to do about it, through `delete`

> Data flows down through `input()`, events flow up through `output()` — never the other way around, and never sideways between siblings. This is what makes a component tree predictable to reason about: to know why something changed, you only ever have to look at the signal that changed and who calls `.set()` on it.

##==##

# Rxjs Interoperability with output function

<br/><br/>

- **outputToObservable** converts an output() to an observable. <br/><br/>
- **outputFromObservable** converts an observable to an output().

##==##

<!-- .slide: class="with-code inconsolata" -->

# Two-way binding with `model()`

Need an input **and** its matching output (the `[( )]` "banana in a box")? `model()` gives you both from a single writable signal:

<br/>

```typescript
@Component({ selector: 'app-rating' })
export class Rating {
  value = model(0); // creates `value` input + `valueChange` output
}
```

<!-- .element: class="medium-code" -->

```html
<!-- parent template: reads and writes the child's signal -->
<app-rating [(value)]="rating" />
```

<!-- .element: class="medium-code" -->

Notes:

- Inside the child, update it like any signal: `this.value.set(4)`. The parent's `rating` stays in sync automatically.
