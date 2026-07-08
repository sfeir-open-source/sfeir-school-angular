<!-- .slide: class="with-code inconsolata" -->

# HttpClient

- Angular ships its own HTTP client for talking to a server.
- You enable it once, at bootstrap, with **`provideHttpClient()`**.
- It lives in the **`@angular/common/http`** package.

<br/>

```typescript
// main.ts
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withFetch()), // withFetch() uses the modern fetch API
  ],
});
```

<!-- .element: class="big-code" -->

Notes:

- `provideHttpClient` accepts features such as `withFetch()`, `withInterceptors([...])`, and `withInterceptorsFromDi()`.
- The old `HttpClientModule` is deprecated — always use `provideHttpClient()`.

##==##

<!-- .slide: class="with-code inconsolata"-->

# Injecting HttpClient into a component or service

Once provided, inject `HttpClient` anywhere with the `inject()` function:

<br/>

```typescript
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.html',
})
export class App {
  private readonly http = inject(HttpClient);
}
```

<!-- .element: class="big-code"-->

Notes:

- In practice you inject `HttpClient` inside a dedicated service, not directly in the component — more on that in the Dependency Injection chapter.
