<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Modifying the Request

To modify an outgoing request, you must clone it, as **HttpRequest** objects are immutable.

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request and add the authorization header.
  const authReq = req.clone({
    setHeaders: { Authorization: 'Bearer YOUR_TOKEN_HERE' },
  });
  // Pass the modified request to the next handler.
  return next(authReq);
};
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/><br/>

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the authorization header.
    const authReq = req.clone({
      setHeaders: { Authorization: 'Bearer YOUR_TOKEN_HERE' },
    });
    // Pass the modified request to the next handler.
    return next.handle(authReq);
  }
}
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Modifying the Response

To modify a response, **pipe** the observable returned by `next()` or `next.handle()` with RxJS operators like `map`.

```typescript
export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse) {
        return event.clone({ body: { ...event.body, modified: true } });
      }
      return event;
    }),
  );
};
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/><br/>

```typescript
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: { ...event.body, modified: true } });
        }
        return event;
      }),
    );
  }

```

<!-- .element: class="medium-code" -->

##++##
