<!-- .slide: class="transition-bg-sfeir-2" -->

# Going further: custom store features

##==##

<!-- .slide: class="with-code inconsolata" -->

# `signalStoreFeature`: package a pattern once, reuse everywhere

Any combination of `withState`/`withComputed`/`withMethods` you'd otherwise copy-paste between stores can be extracted into your own feature function with `signalStoreFeature`:

```typescript
export function withRequestStatus() {
  return signalStoreFeature(
    withState<{ requestStatus: 'idle' | 'pending' | 'fulfilled' | { error: string } }>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isPending: computed(() => requestStatus() === 'pending'),
      error: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    })),
  );
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Composed into any store, alongside its own features

```typescript
export const StaffDirectoryStore = signalStore(
  withState(INITIAL_STATE),
  withRequestStatus(), // 👈 adds requestStatus/isPending/error to this store too
  withProps(/* ... */),
  withComputed(/* ... */),
  withMethods(/* ... */),
);
```

<!-- .element: class="medium-code" -->

If a second store in this app (say, a future `DashboardStore`) needed the same "is a request pending / did it fail" shape, `withRequestStatus()` would give it for free — instead of re-declaring `isLoading`-style state and computed signals by hand in every store, the way `StaffDirectoryStore` currently does for just itself.

##==##

# When this is worth it

Custom features pay off once you notice the **same shape** (state + computed + updaters) repeated across two or more stores — extracting it turns a copy-pasted pattern into a single, testable, tree-shakable unit. For a single store like `StaffDirectoryStore`, plain `withState`/`withComputed`/`withMethods` inline is simpler and perfectly idiomatic; reach for `signalStoreFeature` the moment a second store needs the same thing.

<!-- .element: class="important" -->
