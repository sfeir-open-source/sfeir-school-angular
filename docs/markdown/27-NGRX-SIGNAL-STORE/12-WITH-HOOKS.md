<!-- .slide: class="transition-bg-sfeir-2" -->

# Lifecycle: `withHooks`

##==##

<!-- .slide: class="with-code inconsolata" -->

# `onInit`: run once, when the store is created

```typescript
export const StaffDirectoryStore = signalStore(
  withState(INITIAL_STATE),
  withProps(/* ... */),
  withComputed(/* ... */),
  withMethods(/* ... */),
  withHooks({
    onInit: store => {
      store.getPeople();
    },
  }),
);
```

<!-- .element: class="medium-code" -->

This replaces what currently happens **implicitly** in `StaffDirectory`: `_getPersonsFlow` used to fire as soon as the merged `toSignal(...)` was constructed. With the store, nothing loads automatically unless `onInit` says so — miss this and the list silently never loads.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `onDestroy`, and the factory signature for shared state

```typescript
withHooks({
  onInit(store) {
    interval(2_000).pipe(takeUntilDestroyed()).subscribe(() => store.increment());
  },
  onDestroy(store) {
    console.log('final state on destroy', store.count());
  },
});
```

<!-- .element: class="medium-code" -->

Both run in an injection context, so `inject()`/`takeUntilDestroyed()` work directly inside them. When `onInit` and `onDestroy` need to **share** something (a logger instance, an interval id), use the factory signature instead — same shape as `withMethods`/`withComputed`, a function returning `{ onInit, onDestroy }`.

##==##

# The component-lifecycle parallel

Store-level `onInit`/`onDestroy` are the exact equivalent of a component's constructor-time setup and `ngOnDestroy` — except they run exactly once **per store instance**, regardless of how many components inject it. If `StaffDirectoryStore` is later injected from two sibling components under the same route, `getPeople()` still only fires once, not twice — because there's only one store instance to hook into.

<!-- .element: class="important" -->
