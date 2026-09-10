# Going further: `HttpContext`

- Lets you pass **metadata** to and from an interceptor, without fragile conditional logic based on the URL or a header<br/><br/>
- Example use case: marking one specific request as "cacheable" so a caching interceptor treats it differently from the rest

##==##

<!-- .slide: class="with-code inconsolata" -->

# A context token

```typescript
// context.tokens.ts
export const CACHEABLE = new HttpContextToken<boolean>(() => false);
```

<!-- .element: class="big-code" -->

```typescript
// user.service.ts
getUser(): Observable<User> {
  const context = new HttpContext().set(CACHEABLE, true);
  return this.http.get('url', { context });
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Reading it back in an interceptor

```typescript
export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CACHEABLE)) {
    return of(new HttpResponse({ status: 200, body: cachedValue }));
  }
  return next(req);
};
```

<!-- .element: class="big-code" -->

- `set(token, value)` / `get(token)` / `delete(token)` / `keys()` — the whole `HttpContext` API<br/><br/>
- Not used by `tokenInterceptor` in this app — its condition is global (every request gets a token) — but this is the tool once an interceptor needs to behave differently *per call site*
