<!-- .slide -->

# Why do we need a directive?

Some managers in `PEOPLE_MOCK` have `isManager: true`. Product wants a small crown icon next to a manager's name, wherever that name is displayed.

<br/>

The naive move: bake it straight into `Card`'s own template.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The naive approach

```html
<!-- card.html -->
<span>{{ person().firstname }} {{ person().lastname }}</span>
@if (person().isManager) {
  <mat-icon>supervised_user_circle</mat-icon>
}
```

<!-- .element: class="big-code" -->

It works... but it only works **for `Card`**.

Notes:

- This is a plausible first instinct: the data (`isManager`) is already on `person()`, so why not just `@if` the icon inline?
- Keep this illustrative — it isn't real code from any `apps/` folder, just the shape of the temptation.

##==##

<!-- .slide -->

# Why that doesn't scale

- The crown logic is now permanently **coupled to `Card`** — no other component can reuse it without copy-pasting the same `@if` block
- A table row, a list item, a mention anywhere else a manager's name shows up: same logic, duplicated again
- `Card`'s template grows presentational logic that has nothing to do with *being a card* — it's about *marking a manager*, a concern of its own

<br/><br/>

We need something **reusable**, attachable to **any element**, decoupled from any one component's template.

##==##

<!-- .slide -->

# The directive approach

`08-directive` builds exactly that: a reusable **attribute directive**, `[sfeirKing]`, that adds crown behavior to whatever element it's attached to — here, a plain `<span>` right next to the name:

<br/>

```html
<span>{{ person().firstname }} {{ person().lastname }}</span>
<span [sfeirKing]="person().isManager"></span>
```

<!-- .element: class="medium-code" -->

<br/>

No `mat-icon`, no `@if` in `Card`'s template — the `<span>` doesn't even know what it's going to render. That's entirely the directive's job.

So... what actually *is* a directive?

Notes:

- The second `<span>` is intentionally empty in the markup — its content is fully owned by the directive attached to it, not by `Card`.
- This teases the next slide (`02-CONCEPTS.md`), which digs into directive fundamentals: definition, selectors, and how to invoke one.
