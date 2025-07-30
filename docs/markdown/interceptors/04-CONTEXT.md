# Using HttpContext with Interceptors

- Introduced in Angular v12, `HttpContext` allows you to pass metadata to and from interceptors. <br/><br/>
- This avoids fragile workarounds for conditional logic within interceptors. <br/><br/>
- **Example Use Case**: Marking a specific HTTP request as "cacheable."

##==##

<!-- .slide: class="with-code inconsolata" -->

# Create a Context Token

A token is created using `HttpContextToken`. The factory function provides its default value. <br/><br/>

```typescript
// context.tokens.ts
import { HttpContextToken } from '@angular/common/http';

// The factory `() => false` sets the default value if none is provided.
export const CACHEABLE = new HttpContextToken<boolean>(() => false);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Provide Context in a Service

In your service, use the `context` option in an HTTP call to provide the token. <br/><br/>

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CACHEABLE } from './context.tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUser(): any {
    const context = new HttpContext().set(CACHEABLE, true);
    return this.http.get('url', { context });
  }
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Use the Context in an Interceptor

The interceptor can now read the metadata from the context to perform conditional logic. <br/><br/>

```typescript
// caching.interceptor.ts
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { CACHEABLE } from './context.tokens';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CACHEABLE)) {
    const cachedResponse = new HttpResponse({ status: 200, body: { name: 'Cached User' } });
    return of(cachedResponse);
  }
  return next(req);
};
```

<!-- .element: class="medium-code" -->

##==##

# The HttpContext API

- **set(token, value)**: Sets the value for a token. <br/><br/>
- **get(token)**: Retrieves the value of a token. <br/><br/>
- **delete(token)**: Deletes a token and its value. <br/><br/>
- **keys()**: Returns an iterator of all tokens in the context.
