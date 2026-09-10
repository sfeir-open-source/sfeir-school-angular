<!-- .slide: class="with-code inconsolata" -->

# Reading state signals in a template

```html
<sfeir-loader [isLoading]="_store.isLoading()">
  @for (person of _store.people(); track person.id) {
    <sfeir-card [person]="person" />
  }
</sfeir-loader>
```

<!-- .element: class="medium-code" -->

Every state slice reads exactly like a `computed()`/`signal()` you'd hold on the component itself — the fact that it lives on an injected store is invisible in the template's syntax.

##==##

# DeepSignal: nested state, nested signals

If a state slice's value is a nested object literal, `signalStore` builds a `DeepSignal` for it: calling it like a signal (`store.filter()`) reads the whole object, **and** each nested key is *also* directly callable as its own signal (`store.filter.query()`).<br/><br/>

Deeply nested signals are created **lazily**, on first access — no upfront cost for state you never read that granularly.<br/><br/>

`StaffDirectoryState` is intentionally flat (`people`, `search`, `isLoading`, `view`), so you won't need `DeepSignal` drilling here — but you'll recognize the pattern the moment a future store's state gets a nested shape (e.g. `filter: { query, order }`).
