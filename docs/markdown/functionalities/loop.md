<!-- .slide: class="with-code inconsolata" -->
# Looping with @for

- The `@for` block iterates over a collection to render a template for each item.
- It requires a `track` expression to uniquely identify items, boosting performance.
- It provides implicit variables like `$index`, `$first`, `$last`, `$even`, and `$odd`.
- An optional `@empty` block can be used to render content when the collection is empty.

```html
<ul>
  @for (fruit of fruits; track fruit.id; let i = $index, isEven = $even) {
    <li>{{ i }}: {{ fruit.name }} ({{ isEven ? 'Even' : 'Odd' }})</li>
  } @empty {
    <li>No fruits available.</li>
  }
</ul>
```
<!-- .element: class="big-code" -->

Notes:
- The `track` expression is mandatory. Use a unique property like `item.id` or `track $index` for simple arrays.
