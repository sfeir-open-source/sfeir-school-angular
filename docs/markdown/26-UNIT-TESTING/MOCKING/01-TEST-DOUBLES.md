<!-- .slide: class="transition-bg-sfeir-2" -->

# Test doubles with Vitest

##==##

# Mocking via the injector, in `providers`

- Swaps an injected class (a service, a token) for a fake, without touching the component/store under test<br/><br/>
- Convenient when every test in a suite should share the same fake

##==##

<!-- .slide: class="with-code inconsolata" -->

# `vi.fn()`: a fake function you can assert on

```typescript
const sessionStorageStub = { getItem: vi.fn() };
sessionStorageStub.getItem.mockReturnValue('john.doe');

// later...
expect(sessionStorageStub.getItem).toHaveBeenCalledExactlyOnceWith('Authorization');
```

<!-- .element: class="big-code" -->

`vi.fn()` creates a stand-alone spy function: give it a return value with `.mockReturnValue(...)`/`.mockImplementation(...)`, then assert on calls with `toHaveBeenCalled()`, `toHaveBeenCalledTimes(n)`, `toHaveBeenCalledExactlyOnceWith(...)`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `vi.spyOn()`: wrap an existing method

```typescript
const locationBackSpy = vi.spyOn(TestBed.inject(Location), 'back').mockImplementation(() => void 0);

// ...trigger the action...

expect(locationBackSpy).toHaveBeenCalledOnce();
```

<!-- .element: class="big-code" -->

Unlike `vi.fn()`, `vi.spyOn(object, 'method')` replaces a method on a **real object** you already have (here, the real `Location` service from Angular's DI) while still tracking calls — useful when you don't want to fake the whole dependency, just observe/neutralize one side effect (`Location.back()` would otherwise try to navigate a real browser history).

##==##

<!-- .slide: class="with-code inconsolata" -->

# Providing a fake service with `useValue`

```typescript
const STUB_MOCK_PEOPLE_SERVICE = {
  updatePerson: vi.fn(() => of(void 0)),
} satisfies Partial<People>;

const { fixture } = await render(PersonDetails, {
  inputs: { person: PERSON },
  providers: [{ provide: People, useValue: STUB_MOCK_PEOPLE_SERVICE }],
});
```

<!-- .element: class="medium-code" -->

A `Partial<People>` object is enough — you only implement the methods the component under test actually calls. TypeScript's `satisfies` keeps it type-checked against the real service's shape without forcing you to stub every method.

##==##

# Choosing the right double

- **`vi.fn()`** — a brand-new function with no prior behavior; use it for callbacks/outputs and for entire fake services (`{ updatePerson: vi.fn() }`)<br/><br/>
- **`vi.spyOn(obj, 'method')`** — wraps a method that already exists on a real instance; use it when the rest of the object should stay real (spying on `Location.back()` while still using the real `Location`)<br/><br/>
- **`vi.mock()`** — replaces an entire module's exports at the module-resolution level; rarely needed in this codebase since DI already gives you a clean seam (`providers: [{ provide: X, useValue: ... }]`) — reach for `vi.mock()` only for things DI can't reach, like a third-party module imported directly

Notes:
- This app never needs `vi.mock()` in its specs because everything worth faking (People, Router, WINDOW, MatDialog) is injected — Angular's DI is already the mocking seam. That's a deliberate architectural benefit of dependency injection: it makes `vi.mock()`-style module patching mostly unnecessary.
