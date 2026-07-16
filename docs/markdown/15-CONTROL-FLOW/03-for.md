<!-- .slide: class="with-code inconsolata" -->

# `@for` — rendering lists

Iterate over a collection to render a template per item. `track` is **mandatory** — it tells Angular how to identify each item, so it can move DOM nodes instead of rebuilding them.

<br/>

```html
<ul>
  @for (movie of movies(); track movie.id) {
    <li>{{ movie.title }}</li>
  } @empty {
    <li>No movie to display.</li>
  }
</ul>
```

<!-- .element: class="big-code" -->

Notes:

- Use a stable unique id (`movie.id`). For a fixed list of primitives you can use `track $index`.
- The optional `@empty` block renders when the collection is empty.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `@for` — implicit variables

Angular exposes contextual variables inside the loop; alias any of them with `let`:

<br/>

```html
@for (movie of movies(); track movie.id; let i = $index, let isEven = $even) {
  <li>{{ i }} — {{ movie.title }} ({{ isEven ? 'even' : 'odd' }})</li>
}
```

<!-- .element: class="medium-code" -->

| Variable | Meaning                                    |
| -------- | ------------------------------------------ |
| `$index` | index of the item in the list              |
| `$count` | number of items in the list                |
| `$first` | `true` for the first item                  |
| `$last`  | `true` for the last item                   |
| `$even`  | `true` when the index is even              |
| `$odd`   | `true` when the index is odd               |
