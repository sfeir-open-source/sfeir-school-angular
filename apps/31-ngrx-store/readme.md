# 31 · State Management with NGRX

> Manage the People feature's state the Redux way: actions, a reducer and memoized selectors.

**Folder** `apps/31-ngrx-store` · **Solution** `apps/31-ngrx-store-solution` · **Run** `npm run client -- 31-ngrx-store`

## 🎯 Goal

Implement the same people + search state with NgRx, the Redux-inspired store for Angular. You'll define actions, a pure reducer, and selectors that derive the filtered list.

## 📚 What you'll learn

- The NgRx flow: dispatch → action → reducer → new state → selector → view
- How to write a pure reducer with `createReducer` / `on`
- How memoized selectors compose and derive state

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Actions

```typescript
import { createAction, props } from '@ngrx/store';

export const SET_SEARCH = '[APP] - Set Search';
export const SET_PEOPLE = '[APP] - Set People';

export const setSearch = createAction(SET_SEARCH, props<{ search: string }>());
export const setPeople = createAction(SET_PEOPLE, props<{ people: Array<People> }>());
```

### Step 2 — State shape

```typescript
export interface AppState {
  search: string;
  people: Array<People>;
}

export interface AppStore {
  store: AppState;
}

export const INITIAL_STATE: AppState = { search: '', people: [] };
```

### Step 3 — Reducer

A reducer is a pure function that returns a **new** state per action:

```typescript
const APP_REDUCER = createReducer(
  INITIAL_STATE,
  on(setSearch, (state, { search }) => ({ ...state, search })),
  on(setPeople, (state, { people }) => ({ ...state, people })),
);

export function appReducer(state, action) {
  return APP_REDUCER(state, action);
}
```

### Step 4 — Selectors

```typescript
const filterPeople = (search: string) => (people: People) =>
  people.lastname.toLowerCase().includes(search.toLowerCase()) ||
  people.firstname.toLowerCase().includes(search.toLowerCase());

const selectRootStore = (rootStore: AppStore) => rootStore.store;

export const selectSearch = createSelector(selectRootStore, state => state.search);
export const selectPeople = createSelector(selectRootStore, state => state.people.filter(filterPeople(state.search)));
```

### Step 5 — Register the store

In `main.ts`:

```typescript
import { provideStore } from '@ngrx/store';
import { appReducer } from './app/core/store/reducer';

providers: [provideStore({ store: appReducer }), /* … */];
```

### Step 6 — Connect service & component

- In `people.service.ts`, dispatch `setPeople({ people })` when data changes.
- In `people.component.ts`, `store.select(selectPeople)` (convert with `toSignal`) and dispatch `setSearch` from the search bar.

## ▶️ Run & verify

```bash
npm run client -- 31-ngrx-store
```

Open the People page and check:

- [ ] The list loads through the store
- [ ] Search filters by first/last name
- [ ] Delete and add both update the state

## 💡 Key concepts

- **Unidirectional data flow** — components dispatch actions; reducers produce new state; selectors read it. Predictable and testable.
- **Pure reducers** — no side effects, always return a new object (`{ ...state, … }`).
- **Memoized selectors** — `createSelector` caches results and only recomputes when inputs change.
- **`toSignal(store.select(...), { requireSync: true })`** — the recommended bridge to signals for modern templates.

## 🧯 Troubleshooting

- **`No reducers provided`** — register with `provideStore({ store: appReducer })`.
- **Selector returns nothing** — check `selectRootStore` matches the feature key (`store`).
- **State doesn't change** — verify the reducer handles the dispatched action via `on(...)`.
