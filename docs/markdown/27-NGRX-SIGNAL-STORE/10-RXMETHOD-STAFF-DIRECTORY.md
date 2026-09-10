<!-- .slide: class="with-code inconsolata" -->

# `getPeople`: `rxMethod<void>`, replacing `_getPersonsFlow`

```typescript
getPeople: rxMethod<void>(
  pipe(
    tap(() => patchState(store, { isLoading: true })),
    mergeMap(() =>
      _peopleService.getPeople().pipe(
        tap({
          next: people => patchState(store, { people }),
          error: console.error,
          finalize: () => patchState(store, { isLoading: false }),
        }),
      ),
    ),
  ),
),
```

<!-- .element: class="small-code" -->

`finalize` (not just the success branch of `tap`) turns `isLoading` back off **whether the call succeeds or fails** — a common bug is forgetting this and getting a loader stuck forever on error.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `deletePerson`: `rxMethod<string>`, `switchMap` for cancellation

```typescript
deletePerson: rxMethod<string>(
  pipe(
    tap(() => patchState(store, { isLoading: true })),
    switchMap(id =>
      _peopleService.removePerson(id).pipe(
        tap({
          next: people => patchState(store, { people }),
          error: console.error,
          finalize: () => patchState(store, { isLoading: false }),
        }),
      ),
    ),
  ),
),
```

<!-- .element: class="small-code" -->

`switchMap` here means: if `deletePerson` is called again before the previous delete resolves, the previous in-flight request is **cancelled** — the right cancellation semantics for "the user clicked delete on a different row before the first one finished."

##==##

<!-- .slide: class="with-code inconsolata" -->

# `addPerson`: `rxMethod<void>` orchestrating a dialog, then a refetch

```typescript
addPerson: rxMethod<void>(
  pipe(
    mergeMap(() =>
      _matDialog.open<DialogPerson, UpsertPersonBody | undefined>(DialogPerson).afterClosed().pipe(
        filter(Boolean), // <- user cancelled the dialog: stop here, nothing to save
        tap(() => patchState(store, { isLoading: true })),
        switchMap(formValue =>
          _peopleService.addPerson(formValue).pipe(
            switchMap(() => _peopleService.getPeople()),
            tap({
              next: people => patchState(store, { people }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
  ),
),
```

<!-- .element: class="small-code" -->

Notice `MatDialog.open(...)` moved **into the store** — because `_matDialog` is now a store dependency, not a component one. `StaffDirectory`'s "add" button just calls `_store.addPerson()`.

##==##

# Choosing the operator: cancellation semantics, not habit

| Method         | Operator   | Why                                                                 |
| -------------- | ---------- | -------------------------------------------------------------------- |
| `getPeople`    | `mergeMap` | Simple refetch, nothing to cancel — runs to completion              |
| `deletePerson` | `switchMap`| A newer delete call should supersede a stale in-flight one          |
| `addPerson`    | `mergeMap` (outer) / `switchMap` (inner save) | Dialog opening doesn't need cancellation; the save+refetch does |

<!-- .element: class="medium-code" -->

This table is the whole exercise, condensed: mapping `StaffDirectory`'s three existing `Subject` + operator pipelines onto three `rxMethod`s is closer to a **direct translation** than a redesign — the RxJS you already know doesn't change, only where it lives.

<!-- .element: class="important" -->
