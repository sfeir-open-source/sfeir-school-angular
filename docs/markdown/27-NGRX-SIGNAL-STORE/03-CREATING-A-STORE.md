<!-- .slide: class="transition-bg-sfeir-2" -->

# Anatomy of a SignalStore

##==##

<!-- .slide: class="with-code inconsolata" -->

# `signalStore()`: a sequence of features

`signalStore(...)` accepts a sequence of **store features** and returns an injectable class. Each feature contributes state, properties, or methods — the store is the sum of its features.

```typescript
import { signalStore, withState } from '@ngrx/signals';

type StaffDirectoryState = {
  people: Person[];
  search: string;
  isLoading: boolean;
  view: UiView;
};

const INITIAL_STATE: StaffDirectoryState = { people: [], search: '', isLoading: false, view: 'card' };

export const StaffDirectoryStore = signalStore(withState(INITIAL_STATE));
```

<!-- .element: class="medium-code" -->

##==##

# `withState()`: one signal per slice, for free

For each key in the initial state object, `signalStore` automatically creates a corresponding **read signal** on the store instance — you never write `people = signal<Person[]>([])` yourself.

<br/>

The `StaffDirectoryStore` instance now exposes:

- `people: Signal<Person[]>`
- `search: Signal<string>`
- `isLoading: Signal<boolean>`
- `view: Signal<UiView>`

Nested object state slices get a `DeepSignal` instead — a signal whose properties are themselves signals, generated lazily on demand.

##==##

<!-- .slide: class="with-code inconsolata" -->

# State can also come from a factory

`withState` also accepts a factory function, executed in the injection context — useful when the initial state depends on an injected value:

```typescript
const STAFF_DIRECTORY_STATE = new InjectionToken<StaffDirectoryState>('StaffDirectoryState', {
  factory: () => INITIAL_STATE,
});

export const StaffDirectoryStore = signalStore(withState(() => inject(STAFF_DIRECTORY_STATE)));
```

<!-- .element: class="medium-code" -->

Not needed for our case (a static initial state is enough), but useful to know when a store's defaults should vary per environment/config.
