# The illusion ends here

Since `10-control-flow`, `People` has been a thin wrapper around a hardcoded `PEOPLE_MOCK` array — every method resolved synchronously, instantly, no network involved.

<br/><br/>

In `apps/11-http`, a real REST API now exists at `http://localhost:9000/api` (a Fastify server, the `server-rest` Nx project), serving the exact same shape of data over HTTP. `People` needs to be rewired to talk to it through **`HttpClient`** — and `Home`/`StaffDirectory` need to adapt to a world where data doesn't just "appear": it has to be fetched, can be slow, and needs a loading state while in flight.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `HttpClient`

- Angular ships its own HTTP client for talking to a server.
- Since Angular v21, it's provided **at the root injector by default** — nothing to add for the default configuration.
- It lives in the **`@angular/common/http`** package.

<br/>

```typescript
// Only needed if you want non-default behavior (fetch backend, interceptors...)
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [provideHttpClient(withFetch())],
});
```

<!-- .element: class="big-code" -->

Notes:

- `apps/11-http`'s `app.config.ts` needs **no** `provideHttpClient()` call at all — the default root provider is enough since the app doesn't need custom features yet.
- `provideHttpClient` accepts features such as `withFetch()`, `withInterceptors([...])`, and `withInterceptorsFromDi()` when you do need to customize it.
- The old `HttpClientModule` is deprecated — always use `provideHttpClient()` if you need to configure it explicitly.

##==##

<!-- .slide: class="with-code inconsolata"-->

# Injecting `HttpClient`

Inject it anywhere with the `inject()` function — in practice, inside a dedicated service like `People`, not directly in a component:

<br/>

```typescript
// core/provider/people.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class People {
  private readonly http = inject(HttpClient);
  private static readonly baseUrl = `${environment.api}/people`; // 👈 one source of truth for the URL
}
```

<!-- .element: class="big-code"-->

Notes:

- `environment.api` already points at the REST API's base URL in `apps/11-http/src/environments/` — nothing to add there, just read it from `people.ts`.
- Building every request URL off one `static readonly baseUrl` avoids repeating the string in `getPeople()`, `removePerson()`, `getRandomPerson()`...

##==##

# ⚠️ This app has a server dependency

`apps/11-http` needs the Fastify API running on port `9000` to show any data at all.

<br/><br/>

```bash
npx nx serve 11-http   # starts the API automatically (dependsOn: server-rest)
```

<br/>

If requests fail with `ERR_CONNECTION_REFUSED`, start it yourself in another terminal:

```bash
npx nx serve server-rest
```

<!-- .element: class="medium-code center" -->
