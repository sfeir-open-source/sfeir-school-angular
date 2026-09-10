<!-- .slide: class="transition-bg-sfeir-2" -->

# A word on classic NgRx

##==##

# Classic `@ngrx/store`: 4 concepts, 4 files

- **Actions**: unique events dispatched from components/services (`createAction`)<br/><br/>
- **Reducers**: pure functions turning `(state, action) → newState` (`createReducer`)<br/><br/>
- **Selectors**: pure, memoized functions reading slices of state (`createSelector`)<br/><br/>
- **Store**: the global, observable container you `dispatch()` into and `select()` from<br/><br/>
- Async side effects live in a **separate package**, `@ngrx/effects` (`createEffect`, `Actions`, `ofType`)

##==##

![](assets/images/school/state-management/ngrx/state_management_lifecycle.png 'h-800')

<!-- .element: class="full-center" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# The same "add a person" flow, classic style

```typescript
// actions
export const addPerson = createAction('[People] Add', props<{ body: UpsertPersonBody }>());
export const addPersonSuccess = createAction('[People] Add Success', props<{ people: Person[] }>());

// reducer
on(addPerson, state => ({ ...state, isLoading: true })),
on(addPersonSuccess, (state, { people }) => ({ ...state, people, isLoading: false })),

// effect
addPerson$ = createEffect(() => this.actions$.pipe(
  ofType(addPerson),
  switchMap(({ body }) => this.peopleService.addPerson(body).pipe(
    switchMap(() => this.peopleService.getPeople()),
    map(people => addPersonSuccess({ people })),
  )),
));
```

<!-- .element: class="small-code" -->

Three files, three concepts, for one flow. Correct, battle-tested — but a lot of ceremony for what is, underneath, just "call an API and patch some state".

##==##

# Why SignalStore, for this app

- **One file, one export** — state, computed, methods and lifecycle live together, no action/reducer/effect indirection to trace through<br/><br/>
- **Signals in, signals out** — `store.people()` is a signal you read directly in a template, no `async` pipe, no `select()` + subscription<br/><br/>
- **Composable, not one big class** — `withState`/`withComputed`/`withMethods`/`withHooks` mirror how you already structure a component<br/><br/>
- Still **fully interoperable with RxJS** via `rxMethod` when you need `switchMap`/`debounceTime`/cancellation — you don't lose anything, you drop the boilerplate around it

<!-- .element: class="important" -->

The rest of this chapter is entirely `@ngrx/signals` — this is the last you'll see of actions/reducers/effects.
