<!-- .slide: class="with-code inconsolata" -->

# Looping with @for

- Appears in Angular v17
- The `@for` block iterates over a collection to render a template for each item.
- It requires a `track` expression to uniquely identify items, boosting performance.
- It provides implicit variables like `$index`, `$first`, `$last`, `$even`, and `$odd`.
- An optional `@empty` block can be used to render content when the collection is empty.

```angular181html
<ul>
  @for (fruit of fruits(); track fruit.id; let i = $index; let isEven = $even) {
  <li>{{ i }}: {{ fruit.name }} ({{ isEven ? 'Even' : 'Odd' }})</li>
  } @empty {
  <li>No fruits available.</li>
  }
</ul>
```

<!-- .element: class="big-code" -->

Notes:

- The `track` expression is mandatory. Use a unique property like `item.id` or `track $index` for simple arrays.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Looping with the deprecated \*ngFor structural directive

- The `*ngFor` structural directive iterates over a collection to render a template for each item.
- It provides implicit variables like `index`, `first`, `last`, `even`, and `odd`.
- deprecated in Angular v20

```angular181html
<ul>
  <li *ngFor="let fruit of fruits(); let i = index; let isEven = even">
    {{ i }}: {{ fruit.name }} ({{ isEven ? 'Even' : 'Odd' }})
  </li>
</ul>
```

<!-- .element: class="big-code" -->
