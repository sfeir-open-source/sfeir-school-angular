<!-- .slide: class="with-code inconsolata" -->

# Setting up `HttpTestingController`

```typescript
describe('People', () => {
  let peopleService: People;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [People, provideHttpClient(), provideHttpClientTesting()],
    });
    peopleService = TestBed.inject(People);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());
});
```

<!-- .element: class="medium-code" -->

`provideHttpClient()` alone makes real network calls; adding `provideHttpClientTesting()` **replaces** the real backend with a controllable one — both are required, the testing provider doesn't add itself automatically.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Asserting on the request, then flushing a response

```typescript
it('should update an existing person', () => {
  peopleService.updatePerson(id, updatedPerson).subscribe();

  const req = httpMock.expectOne(`${People.baseUrl}/people/${id}`);
  expect(req.request.method).toBe('PUT');
  expect(req.request.body).toEqual(updatedPerson);

  req.flush(null); // <- resolves the subscription, as if the server responded
});
```

<!-- .element: class="medium-code" -->

`expectOne(url)` both asserts a single matching request was made **and** hands you a `TestRequest` to inspect (method, body, headers) and control (`req.flush(...)`, `req.error(...)`).

##==##

<!-- .slide: class="with-code inconsolata" -->

# `httpResource()` needs an injection context

```typescript
it('should return a random person', async () => {
  const randomPerson = TestBed.runInInjectionContext(() => peopleService.getRandomPerson());

  const req = httpMock.expectOne(`${People.baseUrl}/people/random`);
  req.flush(PEOPLE_MOCK[1]);

  await vi.waitFor(() => expect(randomPerson.value()).toEqual(PEOPLE_MOCK[1]));
});
```

<!-- .element: class="medium-code" -->

Two differences from the `Observable` methods: calling `getRandomPerson()` must happen inside `TestBed.runInInjectionContext(...)` (an `httpResource` needs one to register its internal effects), and the assertion is `vi.waitFor(...)` on `.value()` rather than a synchronous `.subscribe()` callback, because the resource settles asynchronously even after the HTTP response is flushed.

##==##

# `httpMock.verify()`: your safety net

Calling `httpMock.verify()` in `afterEach` fails the suite if:

- a request you expected was **never made**<br/><br/>
- a request was made that **no test asserted on** (a forgotten/duplicate call)<br/><br/>

Without it, a broken service could silently fire twice as many requests and every test would still pass.

<!-- .element: class="important" -->

This is task 3 of the `apps/23-unit-tests` lab — `people.spec.ts`.
