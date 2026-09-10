<!-- .slide: class="transition-bg-sfeir-2" -->

# Going further: entity management

##==##

<!-- .slide: class="with-code inconsolata" -->

# `withEntities`: a purpose-built shape for collections

`StaffDirectoryStore` keeps `people` as a plain `Person[]` — filtering it with `Array.filter` is perfectly fine at this scale. The `@ngrx/signals/entities` plugin offers an alternative once a collection needs frequent by-id lookups/updates:

```typescript
import { withEntities } from '@ngrx/signals/entities';

export const StaffDirectoryStore = signalStore(
  withEntities<Person>(), // requires an `id: EntityId` (string | number) on Person — it has one
);
```

<!-- .element: class="medium-code" -->

This adds `ids: Signal<EntityId[]>`, `entityMap: Signal<EntityMap<Person>>` (state), and a computed `entities: Signal<Person[]>` — a normalized map instead of an array, so looking up "the person with this id" is O(1) instead of an `Array.find`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Entity updaters: `patchState` helpers for collections

```typescript
import { addEntity, removeEntity, updateEntity } from '@ngrx/signals/entities';

withMethods(({ _peopleService, ...store }) => ({
  deletePerson: rxMethod<string>(
    pipe(switchMap(id => _peopleService.removePerson(id).pipe(
      tap(() => patchState(store, removeEntity(id))), // 👈 instead of patching the whole array
    ))),
  ),
}));
```

<!-- .element: class="medium-code" -->

`addEntity`, `removeEntities`, `updateEntity({ id, changes })`, `updateAllEntities(...)` all compose with `patchState` the same way a plain object patch does — none of them throw if the entity is missing/duplicate, they're safe no-ops.

##==##

# Would this help `StaffDirectoryStore` today?

Not really, at this app's scale — `filteredPeople`'s `Array.filter` over a few dozen people costs nothing, and the extra `ids`/`entityMap` indirection would be pure overhead for zero by-id lookups elsewhere in this app. Reach for `withEntities` when a store's collection genuinely needs frequent single-entity reads/updates (a Kanban board's cards, a chat's messages) — know it exists, but don't reach for it reflexively.

<!-- .element: class="important" -->
