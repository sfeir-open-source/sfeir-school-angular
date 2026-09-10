<!-- .slide: class="with-code inconsolata"-->

# `httpResource()` — reading data reactively

A declarative, signal-based way to bind a component directly to a `GET` endpoint. It manages the whole request lifecycle for you — no manual `.subscribe()`, no manual loading flag.

<br/>

```typescript
// core/provider/people.ts
getRandomPerson() {
  return httpResource<Person>(() => `${People.baseUrl}/random`);
}
```

<!-- .element: class="medium-code"-->

```typescript
// feature/home/home.ts
export class Home {
  private readonly peopleService = inject(People);
  protected readonly personResource = this.peopleService.getRandomPerson();

  handleRefresh(): void {
    this.personResource.reload(); // 👈 re-triggers the request
  }
}
```

<!-- .element: class="medium-code"-->

Notes:

- `httpResource` is meant for **reading** data (GET) reactively, and must be created in an **injection context** — a field initializer or constructor, exactly like `getRandomPerson()` above.
- For commands (`POST`/`PUT`/`DELETE`), keep using `HttpClient` directly — `httpResource` isn't a replacement for the whole HTTP surface.

##==##

<!-- .slide: class="with-code inconsolata"-->

# Reading resource state in the template

`httpResource` returns an `HttpResourceRef`, exposing a handful of signals:

<br/>

```html
<!-- feature/home/home.html -->
@if (personResource.isLoading() || !personResource.hasValue()) {
  <sfeir-loader />
} @else {
  <sfeir-card [person]="personResource.value()" (delete)="handleRefresh()" />
}
```

<!-- .element: class="medium-code"-->

- `value()`: the response data <br/><br/>
- `isLoading()` / `hasValue()`: exactly what you need to branch a template between a loader and real content <br/><br/>
- `error()`, `status()`: for error handling and finer-grained state

Notes:

- This is precisely the pattern `Home` uses in `apps/11-http`: branch on `isLoading()`/`hasValue()` to show `<sfeir-loader />` (from `@sfeir/ui/loader`) while waiting, then the same `<sfeir-card>` as before once the value resolves.
- `reload()`, `set()` and `update()` are also available on the ref to control the resource imperatively when needed.

##==##

<!-- .slide: class="with-code inconsolata"-->

# Beyond JSON and GET

```typescript
// Different response types
httpResource.arrayBuffer(() => `${People.baseUrl}/export/arraybuffer`);
httpResource.blob(() => `${People.baseUrl}/export/blob`);
httpResource.text(() => `${People.baseUrl}/export/text`);

// A non-GET request — pass a full HttpResourceRequest instead of a plain URL
httpResource(() => ({
  url: `${People.baseUrl}`,
  method: 'POST',
  body: { firstname: 'Ada', lastname: 'Lovelace' },
}));
```

<!-- .element: class="medium-code"-->

<br/>

> By default `httpResource` assumes a JSON body and a `GET` request — both can be overridden, but reach for plain `HttpClient` first for anything beyond simple reads.
