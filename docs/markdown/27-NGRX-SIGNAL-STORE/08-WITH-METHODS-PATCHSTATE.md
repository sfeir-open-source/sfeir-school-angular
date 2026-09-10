<!-- .slide: class="transition-bg-sfeir-2" -->

# Changing state: `withMethods` + `patchState`

##==##

<!-- .slide: class="with-code inconsolata" -->

# The only way to change state: `patchState`

```typescript
withMethods(({ _peopleService, _matDialog, ...store }) => ({
  changeView: () => patchState(store, state => ({ view: (state.view === 'card' ? 'list' : 'card') as UiView })),
}));
```

<!-- .element: class="big-code" -->

`patchState(store, partialOrUpdaterFn)` is the **only** sanctioned way to mutate a SignalStore's state — never `store.people = [...]`. It accepts either a partial object, or a function of the current state (needed here since the new `view` depends on the old one).

##==##

# `protectedState`: on by default, on purpose

By default a SignalStore's state is **protected** — `patchState` refuses to update it from outside the store's own `withMethods`/`withHooks`. This is what forces every state change to go through a method you wrote and can reason about, instead of any consumer poking at state directly.<br/><br/>

Opting out (`signalStore({ protectedState: false }, ...)`) lets any injector of the store call `patchState` on it directly — occasionally useful, generally **not recommended**: it defeats the "one place changes state" guarantee that makes a store easier to reason about than scattered signals.

<!-- .element: class="important" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Injecting a dependency directly into `withMethods`

`withMethods` can also receive its dependencies as a **default parameter**, resolved via `inject()` at the call site — an alternative to routing everything through `withProps` first:

```typescript
withMethods((store, booksService = inject(BooksService)) => ({
  async loadAll(): Promise<void> {
    patchState(store, { isLoading: true });
    const books = await booksService.getAll();
    patchState(store, { books, isLoading: false });
  },
}));
```

<!-- .element: class="medium-code" -->

Both styles are valid — `StaffDirectoryStore` chose `withProps` because `_peopleService`/`_matDialog` are reused by *multiple* methods (`getPeople`, `deletePerson`, `addPerson`), so grouping them once avoids repeating the `inject()` default parameter in each.

##==##

# Two kinds of methods, one rule

- **Synchronous updates** (`changeView`) — call `patchState` directly, done<br/><br/>
- **Asynchronous side effects** (API calls, dialogs) — `async`/`await` works for simple one-shot calls (`loadAll` above), but `StaffDirectoryStore`'s three async methods (`getPeople`, `deletePerson`, `addPerson`) need debouncing, cancellation, and error handling — exactly what RxJS operators are for<br/><br/>

That's `rxMethod`, next.
