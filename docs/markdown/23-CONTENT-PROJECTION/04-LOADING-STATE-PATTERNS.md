<!-- .slide: class="with-code inconsolata" -->

# Driving loading manually: `tap()` + `finalize()`

`StaffDirectory` composes its people list from three merged RxJS flows (`_getPersonsFlow`, `_deletePersonFlow`, `_upsertPersonFlow`) — no `resource` here, just plain observables:

```typescript
private _isLoading = signal(false);
isLoading = this._isLoading.asReadonly();

private _deletePersonFlow = this._deleteSubject.pipe(
  tap(() => this._isLoading.set(true)),
  switchMap(id => this._people.removePerson(id)),
  finalize(() => this._isLoading.set(false)),
);
```

<!-- .element: class="medium-code" -->

- `tap()` flips the flag **on** when the flow starts<br/><br/>
- `finalize()` flips it back **off** whether the flow completes *or* errors — a plain `tap()` chained on the success channel would never run after an error, leaving the overlay stuck on

##==##

<!-- .slide: class="with-code inconsolata" -->

# Driving loading from a `resource`: `computed()`

`Home` already holds `_personResource = this._peopleService.getRandomPerson()`, an `httpResource`:

```typescript
_isLoading = computed(() => this._personResource.isLoading() && !this._personResource.hasValue());
```

<!-- .element: class="big-code" -->

- `isLoading()` alone is `true` on **every** refresh, including refreshes that already have a previous value to keep showing<br/><br/>
- Combining with `!hasValue()` avoids re-showing the overlay once a person is already displayed underneath it — only the *first* load counts as "loading" from the wrapper's point of view

##==##

<!-- .slide: class="with-code inconsolata" -->

# Wiring it to the wrapper

```html
<!-- staff-directory.html -->
<sfeir-loader [isLoading]="isLoading()">
  <section>
    <!-- @switch (view()) { ... } -->
  </section>
  <section class="buttons-fab"><!-- add / toggle-view buttons --></section>
</sfeir-loader>
```

<!-- .element: class="medium-code" -->

- One `<sfeir-loader>` around **everything** — content and controls — replacing the old per-`@empty`-block self-closing `<sfeir-loader />` tags<br/><br/>
- Every consumer of `Loader` picks its own source of truth for `isLoading` — a manual signal here, a `computed()` over a resource there — the component itself doesn't care which
