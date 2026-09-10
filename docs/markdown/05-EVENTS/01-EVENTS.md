<!-- .slide: class="with-code inconsolata"-->

# Event binding: `( )`

- Event name in **parentheses** — the opposite bracket shape from property binding's `[ ]`
- Refers to a **method** of the class
- To get the event's details, use **`$event`**

<br/>

```typescript
@Component({
  selector: 'sfeir-app',
  template: ` <input type="text" (keyup)="updateValue($event)" />
    <p>Value: {{ value() }}</p>`,
})
export class App {
  value = signal('');

  updateValue(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
```

<!-- .element: class="medium-code"-->

Notes:

- `[ ]` = data flows **into** the element (property binding). `( )` = data flows **out of** the element (event binding). Getting the brackets backwards is a classic beginner mistake, and the compiler error it produces isn't always obvious.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The refresh button: no arguments needed

Not every handler needs `$event`. In `04-events`, clicking the FAB button doesn't care about the click itself — it just needs to run:

<br/>

```html
<!-- home.html -->
<button mat-fab color="accent" (click)="refresh()">
  <mat-icon>autorenew</mat-icon>
</button>
```

<!-- .element: class="big-code" -->

Notes:

- `(click)="refresh()"` — note the **two** sets of parentheses: one for the event binding syntax, one to actually *call* the method. `(click)="refresh"` (missing the call) compiles, but does nothing when clicked — Angular evaluates the method reference instead of invoking it.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Mutating a signal from an event handler

The handler doesn't reassign the signal — it calls `.set(...)` to push a new value into the **existing** signal:

<br/>

```typescript
export class Home {
  person = signal<Person>(PEOPLE_MOCK[0]);

  refresh(): void {
    const index = Math.floor(Math.random() * PEOPLE_MOCK.length);
    this.person.set(PEOPLE_MOCK[index]);
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- `this.person = ...` would silently break reactivity — you'd be replacing the signal itself with a plain value, and anything that captured a reference to the original signal (the template's binding, a `computed`) would be reading a stale one.
- `.set(...)` is what tells Angular "this signal's value changed, re-run whatever reads it" — the template re-renders with no manual refresh logic anywhere.

##==##

<!-- .slide -->

# Naming and visibility: who needs to see this signal?

A signal's exposure isn't just a style choice — it documents **who is allowed to read it**:

<br/>

| Convention | Meaning |
| --- | --- |
| `protected readonly _person` | template-only, defensively named — nothing outside this component reads it |
| `public readonly person` | something outside the class needs it too (a test, a future parent) — no underscore, because it's now part of the component's public surface |

Notes:

- This is precisely the change `04-events` asks for: `_person` (protected) becomes `person` (public) the moment a test — or later, a parent component — needs to read it directly. The rename isn't cosmetic: it's Angular's ordinary TypeScript access modifiers doing real API-design work.
- `readonly` still applies to both: nothing outside the class should ever reassign the signal itself, only call `.set()`/`.update()` on it.
