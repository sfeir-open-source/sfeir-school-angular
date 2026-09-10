# `HttpRequest` is immutable

- You can never write to `request.headers` directly — there's nothing to mutate<br/><br/>
- Modifying a request means producing a **new** one with `request.clone(...)`, and forwarding the clone<br/><br/>
- The original `request` parameter must never reach `next(...)` once you've built a modified version

##==##

<!-- .slide: class="with-code inconsolata" -->

# `clone({ setHeaders })`

```typescript
export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(WINDOW).sessionStorage.getItem('Authorization');
  const authRequest = request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(authRequest); // the clone, not `request`
};
```

<!-- .element: class="big-code" -->

- `setHeaders` merges/overwrites headers on the clone, everything else about the request stays the same<br/><br/>
- Bearer-token convention: `Authorization: Bearer <value>` — a scheme keyword plus the token, not the raw stored value alone

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Reading the response, too

`next(request)` returns an `Observable<HttpEvent<...>>` — pipe it to react to what comes back:

```typescript
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        console.log('status:', event.status);
      }
    }),
  );
};
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

# Modifying the response

```typescript
export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse) {
        return event.clone({ body: { ...event.body, cached: true } });
      }
      return event;
    }),
  );
};
```

<!-- .element: class="medium-code" -->

##++##
