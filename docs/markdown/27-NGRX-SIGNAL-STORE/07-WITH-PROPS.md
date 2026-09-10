<!-- .slide: class="transition-bg-sfeir-2" -->

# Dependencies live on the store: `withProps`

##==##

<!-- .slide: class="with-code inconsolata" -->

# The store injects its own dependencies

```typescript
export const StaffDirectoryStore = signalStore(
  withState(INITIAL_STATE),
  withProps(() => ({
    _peopleService: inject(People),
    _matDialog: inject(MatDialog),
  })),
  withComputed(/* ... */),
);
```

<!-- .element: class="medium-code" -->

`withProps`'s factory runs in an injection context too — this is where `People` and `MatDialog` move from being *the component's* dependencies to being *the store's*. `StaffDirectory` will no longer inject either of them itself.

##==##

# `withProps` isn't only for dependencies

Beyond grouping injected services, `withProps` is the general-purpose escape hatch for **any** custom property that isn't state and isn't a computed signal:

- static/config values<br/><br/>
- **observables derived from state**, as an integration point with RxJS-based APIs — e.g. `isLoading$: toObservable(isLoading)`<br/><br/>
- grouped dependencies read again later by `withMethods`/`withHooks`, as you're about to see with `_peopleService`/`_matDialog`

<!-- .element: class="important" -->

Notes:
- The naming convention `_peopleService`/`_matDialog` (leading underscore) signals "private to the store" even though SignalStore doesn't enforce real TypeScript-level privacy on withProps members — it's a readability convention carried over from this codebase's component style (`_isLoading`, `_people` in the pre-store StaffDirectory).
