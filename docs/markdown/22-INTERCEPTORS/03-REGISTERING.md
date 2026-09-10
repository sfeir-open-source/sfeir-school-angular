<!-- .slide: class="with-code inconsolata" -->

# `provideHttpClient` turns `HttpClient` on

```typescript
// app.config.ts — before
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(APP_ROUTES, withComponentInputBinding())],
};
```

<!-- .element: class="medium-code" -->

- `People` already `inject(HttpClient)`s and calls `get`/`post`/`put`/`delete` on it<br/><br/>
- But with **no provider** registered for it, those calls have nothing to run through — `NullInjectorError: No provider for HttpClient!`

##==##

<!-- .slide: class="with-code inconsolata" -->

# Registering the interceptor

```typescript
// app.config.ts — after
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
};
```

<!-- .element: class="big-code" -->

- `withInterceptors([...])` takes an **array of functions**, executed in the order they're listed<br/><br/>
- Function reference, not a call — the exact same convention you already used registering guards on `canActivate`/`canMatch`

Notes:

- `provideHttpClient(...)` alone doesn't run any interceptor — `withInterceptors([...])` is a separate feature you opt into on top of it.

##==##

# Class-based interceptors still exist

For legacy `HttpInterceptor` classes migrating gradually:

<br/>

```typescript
provideHttpClient(withInterceptorsFromDi());
// + { provide: HTTP_INTERCEPTORS, useClass: MyLegacyInterceptor, multi: true }
```

<!-- .element: class="important" -->

<br/>

Functional interceptors (`HttpInterceptorFn`) are the modern default — same reasoning as functional guards: no class, no constructor injection, just `inject()` in a plain function.
