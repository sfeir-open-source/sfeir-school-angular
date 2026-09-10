<!-- .slide: class="transition-bg-sfeir-2" -->

# Testing services (and guards)

##==##

# Two families, tested differently

- **HTTP-backed services** — wrap `HttpClient` calls; tested with `provideHttpClientTesting()` + `HttpTestingController`, no real backend involved<br/><br/>
- **"Helper"/pure logic units** — no HTTP, no rendering; a functional **guard** is the same idea, just a function invoked in an injection context instead of a class instantiated by `TestBed`<br/><br/>

**Neither of these needs `render()`** — there's no template, so this is pure `TestBed`-level testing.

<!-- .element: class="important" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# The service under test: `People`

```typescript
@Service()
export class People {
  static readonly baseUrl = `${environment.api}`;
  private readonly _http = inject(HttpClient);

  getPeople(): Observable<Person[]> { /* GET /people */ }
  getRandomPerson(): HttpResourceRef<Person | undefined> { /* httpResource */ }
  addPerson(body: UpsertPersonBody): Observable<void> { /* POST /people */ }
  getPerson(id: string): Observable<Person> { /* GET /people/:id */ }
  updatePerson(id: string, body: UpsertPersonBody): Observable<void> { /* PUT /people/:id */ }
  removePerson(id: string): Observable<Person[]> { /* DELETE /people/:id */ }
}
```

<!-- .element: class="small-code" -->

Five methods, two different assertion strategies: the four `Observable`-returning ones subscribe and flush like classic HTTP testing; `getRandomPerson()` returns an `httpResource`, which needs an injection context and settles asynchronously.

Notes:

- `@Service()` is this codebase's modern way of declaring an injectable — the tree-shakable, auto-provided successor to `@Injectable({ providedIn: 'root' })`. It doesn't change how you test it: `TestBed.inject(People)` works exactly the same either way.
