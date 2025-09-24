<!-- .slide-->

# Interceptors: Definition

- **Interceptors** are functions that process outgoing HTTP requests and incoming responses.<br/><br/>
- They allow you to transform the request or response in a single, centralized place.<br/><br/>
- Common use cases include adding authentication tokens, logging, caching, and error handling.<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# Creating a Functional Interceptor since v14

An interceptor is a function that takes the `HttpRequest` and the next handler in the chain. <br/><br/>

```typescript
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Clone the request to modify it, as it's immutable.
  const authToken = 'YOUR_AUTH_TOKEN_HERE';
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authToken}` },
  });
  // 2. Pass the cloned request to the next handler.
  return next(authReq);
};
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Creating a class interceptor before v14

An interceptor is a class that implements the `HttpInterceptor` interface. <br/><br/>

```typescript
// auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. Clone the request to modify it, as it's immutable.
    const authToken = 'YOUR_AUTH_TOKEN_HERE';
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });
    // 2. Pass the cloned request to the next handler.
    return next.handle(authReq);
  }
}
```

<!-- .element: class="medium-code" -->

<!-- .slide: class="with-code inconsolata" -->

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Handling the Response

Use RxJS operators like **tap** to inspect or modify the response observable.

```typescript
// logging.interceptor.ts
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        console.log('Request successful with status:', event.status);
      }
    }),
  );
};
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/>

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. Clone the request to modify it, as it's immutable.
    const authToken = 'YOUR_AUTH_TOKEN_HERE';
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });
    // 2. Pass the cloned request to the next handler.
    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('Request successful with status:', event.status);
        }
      }),
    );
  }
}
```

<!-- .element: class="medium-code" -->

##++##
