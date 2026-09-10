<!-- .slide: class="with-code inconsolata" -->

# Before: the row markup lives inside `StaffDirectory`

```html
<mat-list>
  @for (person of _people(); track person.id) {
  <mat-list-item>
    <img [src]="person.photo" matListItemAvatar />
    <span matListItemTitle>{{ person.firstname }} {{ person.lastname }}</span>
    <span matListItemLine>{{ person.entity }} — {{ person.email }}</span>
  </mat-list-item>
  }
</mat-list>
```

<!-- .element: class="medium-code" -->

Nothing here is reusable outside this exact component.

##==##

<!-- .slide: class="with-code inconsolata" -->

# After: `<sfeir-list>` owns the loop, the caller owns the row

```html
<sfeir-list [data]="_people()">
  <ng-template #item let-person>
    <mat-list-item>
      <img [src]="person.photo" matListItemAvatar />
      <span matListItemTitle>{{ person.firstname }} {{ person.lastname }}</span>
      <span matListItemLine>{{ person.entity }} — {{ person.email }}</span>
    </mat-list-item>
  </ng-template>
</sfeir-list>
```

<!-- .element: class="big-code" -->

- `List` never sees `Person`, `firstname`, or `matListItemAvatar` — it only sees "a template" and "an array with `id`s"<br/><br/>
- `let-person` reads the `$implicit` value `list.html`'s outlet handed it, one `person` per rendered row

##==##

# What actually moved where

| | Owns | Never touches |
| --- | --- | --- |
| `libs/ui/list` (`List<T>`) | `<mat-list>`, the `@for`, the outlet | What a row looks like, what `T` actually is |
| `staff-directory.html` (the caller) | The row markup, the `Person` fields | Iteration, tracking, the `<mat-list>` wrapper |

<br/>

This is the payoff of `NgTemplateOutlet`: two components, each owning exactly one half of "render a list", neither one aware of the other's concern.
