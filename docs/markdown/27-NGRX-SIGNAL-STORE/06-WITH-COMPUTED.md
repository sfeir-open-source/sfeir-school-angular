<!-- .slide: class="transition-bg-sfeir-2" -->

# Deriving state: `withComputed`

##==##

<!-- .slide: class="with-code inconsolata" -->

# `filteredPeople`: the store-level `computed()`

```typescript
export const StaffDirectoryStore = signalStore(
  withState(INITIAL_STATE),
  withComputed(({ search, people }) => ({
    filteredPeople: computed(() =>
      people().filter(
        p =>
          p.firstname.toLowerCase().includes(search().toLowerCase()) ||
          p.lastname.toLowerCase().includes(search().toLowerCase()),
      ),
    ),
  })),
);
```

<!-- .element: class="medium-code" -->

`withComputed`'s factory is called with the store built **so far** — here, the state signals from `withState` — and must return a dictionary of computed signals (or plain functions, auto-wrapped in `computed()`).

##==##

# Why derive `filteredPeople` instead of storing it

- `filteredPeople` is **never patched directly** — it's always `people()` + `search()` recombined, so it can never drift out of sync with either<br/><br/>
- Feature order matters: `withComputed` here runs *after* `withState`, so it can destructure `search`/`people` from the store — a feature can only see what earlier features already added<br/><br/>
- The template switches from reading `_store.people()` to `_store.filteredPeople()` — the raw list stays available too, for anything that genuinely needs the unfiltered data

<!-- .element: class="important" -->

Notes:
- This is the same instinct as a component's own `computed()` for a derived value — just relocated onto the store, and reusable by every consumer of `StaffDirectoryStore`, not just one component.
