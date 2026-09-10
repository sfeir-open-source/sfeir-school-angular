<!-- .slide: class="transition-bg-sfeir-2" -->

# Testing a SignalStore

##==##

# A SignalStore is tested like any other service

- **`TestBed`**, not `new` — `signalStore()` relies on the injection context for `inject()`, `rxMethod`, `signalMethod`; instantiating it manually breaks all of that<br/><br/>
- **Public API only** — assert on state/computed signals and the effect of calling methods, don't spy on the store's own methods or reach into private `withProps` members; if a method grows complex enough to need that, extract the logic into a service instead<br/><br/>
- Three angles: testing the **store in isolation** (mocked dependencies), testing it as **part of a feature** (store + components together), or **faking/mocking the store** when testing a component that consumes it

##==##

<!-- .slide: class="with-code inconsolata" -->

# Locally-provided store: `TestBed.configureTestingModule`

```typescript
describe('StaffDirectoryStore', () => {
  it('starts with an empty, non-loading state', () => {
    TestBed.configureTestingModule({
      providers: [StaffDirectoryStore, { provide: People, useValue: fakePeopleService }],
    });
    const store = TestBed.inject(StaffDirectoryStore);

    expect(store.people()).toEqual([]);
    expect(store.isLoading()).toBe(false);
  });
});
```

<!-- .element: class="medium-code" -->

Since `StaffDirectoryStore` isn't `providedIn: 'root'`, the testing module has to provide it explicitly — exactly like providing it on a route in the real app.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Asserting on an `rxMethod`'s effect

```typescript
it('loads people and derives filteredPeople on getPeople()', () => {
  const store = TestBed.inject(StaffDirectoryStore);

  store.getPeople(); // withHooks already called it once on init — calling again is fine, it's idempotent here
  const req = httpMock.expectOne(`${People.baseUrl}/people`);
  req.flush(PEOPLE_MOCK);

  expect(store.people()).toEqual(PEOPLE_MOCK);
  expect(store.isLoading()).toBe(false);
});
```

<!-- .element: class="medium-code" -->

Test the **outcome** (state after the call resolves), not that `getPeople` "was called" — the store's job is to end up in the right state, not to perform a specific method invocation.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Faking the whole store, for a component test

```typescript
const mockStore = {
  people: signal(PEOPLE_MOCK),
  isLoading: signal(false),
  filteredPeople: signal(PEOPLE_MOCK),
  deletePerson: vi.fn(),
};

await render(StaffDirectory, {
  providers: [{ provide: StaffDirectoryStore, useValue: mockStore }],
});
```

<!-- .element: class="medium-code" -->

A plain object exposing the same shape (signals for state/computed, functions for methods) is enough — `StaffDirectory` only ever calls `inject(StaffDirectoryStore)` and reads/calls members on it, so it can't tell the difference.

##==##

# `unprotected()`: bypassing `protectedState` in tests only

`patchState` refuses to touch a protected store's state from outside its own methods — including from a spec file. When a test genuinely needs to set up state that has no public setter for it, `unprotected(store)` from `@ngrx/signals/testing` returns a writable view:

```typescript
import { unprotected } from '@ngrx/signals/testing';

patchState(unprotected(store), { people: PEOPLE_MOCK }); // test-only setup, never production code
```

<!-- .element: class="medium-code" -->

Reach for this only to arrange a test's starting state — production code should never need it, since it always has a method to call instead.
