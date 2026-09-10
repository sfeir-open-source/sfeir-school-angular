<!-- .slide: class="transition-bg-sfeir-2" -->

# Concepts

##==##

# General testing vocabulary

- **describe(name, fn)**: groups a scenario of specs<br/><br/>
- **it(name, fn)** (alias `test`): a single spec, one or more assertions<br/><br/>
- **expect(value).toXxx(...)**: a matcher compares the obtained result with an expected one<br/><br/>
- **beforeEach/afterEach**, **beforeAll/afterAll**: run setup/teardown code around each or all specs in a `describe`

##==##

<!-- .slide: class="with-code inconsolata" -->

# Vitest globals, no import needed

Vitest injects `describe`, `it`, `expect`, `vi`, `beforeEach`… as globals (configured in `vite.config.mts`) — you don't import them from `vitest` in this codebase.

```typescript
describe('People', () => {
  let peopleService: People;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [People, provideHttpClient(), provideHttpClientTesting()] });
    peopleService = TestBed.inject(People);
  });

  it('should create the service', () => {
    expect(peopleService).toBeTruthy();
  });
});
```

<!-- .element: class="medium-code" -->

##==##

# Two ways to exercise a unit

- **`TestBed`-level**: instantiate a class through Angular's DI, call methods, assert on return values/side effects — no rendering. Used for **services** and **guards**.<br/><br/>
- **`render()`-level** (from `@testing-library/angular`): actually mount a component/directive, interact with the real DOM, assert on what a user would see. Used for **components** and **directives**.<br/><br/>

**Rule of thumb**: if the unit has a template, render it and query the DOM; if it doesn't, inject it and call it directly.

<!-- .element: class="important" -->

Notes:

- This mirrors exactly the 5 exercises in apps/23-unit-tests: SignalForm and King need rendering (they have a view), authenticated.ts and People don't (pure logic/HTTP), PersonDetails needs both — it renders, but its dependency (People) is a plain injected service you fake.
