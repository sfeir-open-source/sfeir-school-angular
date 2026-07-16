# 30 · State Management with NGXS

> Manage the People feature's state with NGXS: a state class, actions and memoized selectors.

**Folder** `apps/30-ngxs-store` · **Solution** `apps/30-ngxs-store-solution` · **Run** `npm run client -- 30-ngxs-store`

## 🎯 Goal

Re-implement the same people + search state with NGXS, an opinionated, decorator-based state library. You'll define a state container, dispatch actions to mutate it, and select derived (filtered) data.

## 📚 What you'll learn

- The NGXS building blocks: `@State`, `@Action`, `@Selector`, dispatch
- How immutable state updates work
- How to wire NGXS into a standalone app and connect it to components

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Define actions

Actions are event classes with a unique `type`:

```typescript
export class SetPeople {
  static readonly type = '[App] SetPeople';
  constructor(public payload: People[]) {}
}

export class SetSearch {
  static readonly type = '[App] SetSearch';
  constructor(public payload: string) {}
}
```

### Step 2 — Define the state, selectors and handlers

```typescript
@State<AppState>({
  name: 'app',
  defaults: { people: [], search: '' },
})
@Injectable()
export class AppStore {
  static filterPerson(search: string) {
    return (people: People) =>
      people.lastname.toLowerCase().includes(search.toLowerCase()) ||
      people.firstname.toLowerCase().includes(search.toLowerCase());
  }

  @Selector()
  static search(state: AppState): string {
    return state.search;
  }

  @Selector()
  static people(state: AppState): Array<People> {
    return state.people.filter(AppStore.filterPerson(state.search));
  }

  @Action(SetPeople)
  setPeople({ getState, setState }: StateContext<AppState>, { payload }: SetPeople): void {
    setState({ ...getState(), people: payload });
  }

  @Action(SetSearch)
  setSearch({ getState, setState }: StateContext<AppState>, { payload }: SetSearch): void {
    setState({ ...getState(), search: payload });
  }
}
```

### Step 3 — Register the store

In `main.ts`:

```typescript
import { provideStore } from '@ngxs/store';
import { AppStore } from './app/core/store/app-store';

providers: [provideStore([AppStore]), /* … */];
```

### Step 4 — Connect service & component

- In `people.service.ts`, dispatch `SetPeople` when data changes (`dispatch(SetPeople)`).
- In `people.component.ts`, read `AppStore.people` / `AppStore.search` selectors and dispatch `SetSearch` from the search bar.

## ▶️ Run & verify

```bash
npm run client -- 30-ngxs-store
```

Open the People page and check:

- [ ] The list loads via the store
- [ ] Search filters by first/last name
- [ ] Delete and add both update the state

## 💡 Key concepts

- **Immutable updates** — always spread the previous state: `setState({ ...getState(), search })`, enabling predictable changes and time-travel debugging.
- **Memoized `@Selector`** — recomputes only when its input state slice changes; here it also applies the search filter.
- **Dispatch styles** — `store.dispatch(new SetSearch(term))` or the functional `dispatch(SetSearch)` helper.

## 🧯 Troubleshooting

- **`No state found`** — register the state via `provideStore([AppStore])` in `main.ts`.
- **Selector never updates** — make sure you dispatch the action that changes the underlying slice.
- **Mutation bugs** — never mutate state in place; return a new object.
