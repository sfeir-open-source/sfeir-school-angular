<!-- .slide: class="with-code inconsolata" -->

# Link 3: fetching data driven by a signal — `rxResource()`

`id` is now a signal input. The detail page's data must **refetch every time `id` changes** — including navigating directly from one person's URL to another's. `rxResource()` (from `@angular/core/rxjs-interop`) does exactly that:

<br/>

```typescript
// feature/person-details/person-details.ts
export class PersonDetails {
  readonly id = input.required<string>();
  private readonly peopleService = inject(People);

  protected readonly personResource = rxResource({
    params: this.id, // 👈 the SIGNAL itself, not id()
    stream: ({ params: id }) => this.peopleService.getPerson(id),
  });
}
```

<!-- .element: class="medium-code" -->

<br/>

> Pass the **signal**, not its current value — `rxResource` re-runs `stream` every time `params` changes, which is the whole point.

<!-- .element: class="important center" -->

Notes:

- This is the single most common bug in this exercise: writing `params: this.id()` (a plain string, read once) instead of `params: this.id` (the signal) — the resource then never refetches when navigating between two people.
- `rxResource` is the RxJS-based sibling of `httpResource` from `13-HTTP` — same reactive lifecycle, but the `stream` factory returns any `Observable`, not just an HTTP call, so it composes with the rest of RxJS (`switchMap`, `catchError`...) if needed.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Reading the resource in the template

Exactly the same signals as `httpResource` in `13-HTTP` — `isLoading()`, `hasValue()`, `value()`:

<br/>

```html
<!-- feature/person-details/person-details.html -->
@if (personResource.isLoading() || !personResource.hasValue()) {
  <sfeir-loader />
} @else {
  <sfeir-signal-form
    [person]="personResource.value()"
    (cancelForm)="goBack()"
    (submitForm)="savePerson($event)"
  />
}
```

<!-- .element: class="medium-code" -->

Notes:

- Don't render `<sfeir-signal-form>` before the resource actually `hasValue()` — the form's `linkedSignal` (next slide) needs a real `Person` to derive from, not a transient `undefined`.
