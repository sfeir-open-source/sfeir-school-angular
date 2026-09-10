<!-- .slide -->

# Extracting a reusable card

So far `Home` has owned the whole profile card: markup, styling, and the refresh handler, all in the app. In `05-input-output`, the card's markup and styling move into a new, standalone component — `Card` — living in the shared `@sfeir/ui` library, not the app.

<br/>

- `Home` still owns the **state** (the `person` signal, `refresh()`)
- `Card` only owns the **markup** — it needs a way to receive the person to display from its parent

> That's exactly what `input()` is for: declaring a property a parent binds data into.

##==##

<!-- .slide: class="with-code inconsolata"  -->

# Parent-child communication: input signal function

- Child - Component <br/>

```typescript
import { Component, input } from '@angular/core';
@Component({
  selector: 'app-child',
})
export class ChildComponent {
  name = input('');            // InputSignal<string>, optional, default ''
  age = input.required<number>(); // InputSignal<number>, must be provided
}
```

<!-- .element: class="big-code" -->
<br/>

- Parent - template <br/>

```html
<section>
  <app-child [name]="name()" [age]="age()" />
</section>
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# `Card`: a required signal input

```typescript
// libs/ui/card/card.ts
import { input } from '@angular/core';
import type { Person } from '@sfeir/types';

@Component({ selector: 'sfeir-card' })
export class Card {
  public readonly person = input.required<Person>();
}
```

<!-- .element: class="big-code" -->

```html
<!-- home.html -->
<sfeir-card [person]="person()" />
```

<!-- .element: class="medium-code" -->

Notes:

- `input.required<Person>()` throws at runtime if the template using `<sfeir-card>` forgets to bind `[person]` — the compiler and the runtime both enforce that a value is always provided, unlike an optional `input()` with a default.
- Inside `Card`'s own template, `person` is read exactly like any other signal: `person().firstname`, `person().email`, etc. — the property name doesn't change when it crosses a component boundary, only *where* it lives.

##==##

<!-- .slide: class="with-code inconsolata" data-type-show="on-stage" -->

# Parent-child communication: @Input decorator (older way)

- Child - Component <br/>

```typescript
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
})
export class ChildComponent {
  @Input() name: string = '';
  @Input({ required: true }) age!: number;
}
```

<!-- .element: class="big-code" -->
<br/>

- Parent - template <br/>

```html
<section>
  <app-child [name]="name" [age]="age" />
</section>
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" data-type-show="on-stage" -->

# Keep in mind

<br/><br/>

- **By using input signal**, you can use all the hook based on signals and component lifecycle <br/><br/>
- **By using @Input decorator**, you have to use lifecycle hook of component to make the same logic <br/><br/>
