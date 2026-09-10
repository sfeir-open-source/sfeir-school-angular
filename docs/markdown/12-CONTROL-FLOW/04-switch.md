<!-- .slide: class="with-code inconsolata" -->

# `@switch` — one of many

Pick a single branch based on a value, like a JavaScript `switch`. Matching uses strict equality (`===`), with an optional `@default`:

<br/>

```html
@switch (view()) {
  @case ('card') {
    @for (person of people(); track person.id) {
      <sfeir-card [person]="person" (delete)="handleDelete(person.id)" />
    }
  }
  @case ('list') {
    <mat-list>
      @for (person of people(); track person.id) {
        <mat-list-item>{{ person.firstname }} {{ person.lastname }}</mat-list-item>
      }
    </mat-list>
  }
}
```

<!-- .element: class="small-code" -->

Notes:

- This is exactly `StaffDirectory`'s view toggle in `apps/10-control-flow`: one `UiView` signal (`'card' | 'list'`), driving which of two structurally different templates renders — the card grid built earlier, and a brand-new Material list.
- There is no fall-through: only the first matching `@case` renders. `@default` is optional; if nothing matches and there's no default, nothing renders.
