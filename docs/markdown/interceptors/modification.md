<!-- .slide: class="with-code inconsolata" -->

# Modifying the Request

To modify an outgoing request, you must clone it, as `HttpRequest` objects are immutable.

```typescript
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

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

##==##

<!-- .slide: class="with-code inconsolata" -->

# Modifying the Response

To modify a response, use the `pipe` operator on the observable returned by `next()` with RxJS operators like `map`.

```typescript
// response.interceptor.ts
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse) {
        // Clone the event and modify the response body.
        return event.clone({ body: { ...event.body, modified: true } });
      }
      // Return the event without modification if it's not an HttpResponse.
      return event;
    })
  );
};
```

<!-- .element: class="medium-code" -->
