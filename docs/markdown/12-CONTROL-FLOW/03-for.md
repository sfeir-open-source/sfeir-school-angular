<!-- .slide: class="with-code inconsolata" -->

# `@for` — rendering lists

Iterate over a collection to render a template per item. `track` is **mandatory** — it tells Angular how to identify each item, so it can move DOM nodes instead of rebuilding them.

<br/>

```html
@for (person of people(); track person.id) {
  <sfeir-card [person]="person" (delete)="handleDelete(person.id)" />
} @empty {
  <p>No one in the directory yet.</p>
}
```

<!-- .element: class="big-code" -->

Notes:

- `track person.id` is exactly the expression `StaffDirectory`'s card grid uses in `apps/10-control-flow` — a stable, unique identifier survives deletions and reorders.
- The optional `@empty` block renders when the collection is empty — no separate `@if (people().length === 0)` needed alongside it.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Why not `track $index`?

`track` decides whether Angular **reuses** a DOM node or **destroys and recreates** it across re-renders.

<br/>

```html
<!-- ❌ fragile: index shifts when an item is removed from the middle -->
@for (person of people(); track $index) { ... }

<!-- ✅ stable: identity survives deletions/reorders -->
@for (person of people(); track person.id) { ... }
```

<!-- .element: class="big-code" -->

<br/>

> Deleting the 2nd person out of 5 with `track $index` makes Angular think person #3 *became* person #2 — it patches the wrong DOM node instead of removing one. `track person.id` avoids that entirely.

<!-- .element: class="important center" -->

Notes:

- `track $index` is only safe for a fixed list of primitives that never reorders or shrinks — for the staff directory, `person.id` is always the right choice.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `@for` — implicit variables

Angular exposes contextual variables inside the loop; alias any of them with `let`:

<br/>

```html
@for (person of people(); track person.id; let i = $index, let isLast = $last) {
  <li>{{ i + 1 }}. {{ person.firstname }} {{ person.lastname }}{{ isLast ? '' : ',' }}</li>
}
```

<!-- .element: class="medium-code" -->

| Variable | Meaning                       |
| -------- | ----------------------------- |
| `$index` | index of the item in the list |
| `$count` | number of items in the list   |
| `$first` | `true` for the first item     |
| `$last`  | `true` for the last item      |
| `$even`  | `true` when the index is even |
| `$odd`   | `true` when the index is odd  |
