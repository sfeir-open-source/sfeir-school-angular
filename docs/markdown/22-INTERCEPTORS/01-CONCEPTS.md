# The auth loop still has a gap

- `UserService.login()` writes the signed-in username to `sessionStorage` under `'Authorization'`<br/><br/>
- Every guard from the last two modules already reads that key to decide who's allowed where<br/><br/>
- But nothing has ever looked at it when the app actually **talks to the API** — `People.getPeople()`, `getPerson(id)`, `addPerson(...)`, `updatePerson(...)`, `removePerson(id)` all go out exactly as `HttpClient` built them, with no `Authorization` header attached

##==##

# Interceptors: definition

- Functions that process every **outgoing** HTTP request and **incoming** response<br/><br/>
- Run in a single, centralized place — not copy-pasted into every method of `People`<br/><br/>
- Common use cases: authentication headers, logging, caching, error handling — here, closing the auth loop

##==##

<!-- .slide: class="with-code inconsolata" -->

# A functional interceptor

```typescript
// token-interceptor.ts
export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(WINDOW).sessionStorage.getItem('Authorization');
  const authRequest = request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(authRequest);
};
```

<!-- .element: class="medium-code" -->

- `request`: the immutable outgoing `HttpRequest`<br/><br/>
- `next`: the rest of the interceptor chain — calling `next(request)` is what actually continues the request onward
