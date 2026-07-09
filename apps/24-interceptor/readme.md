# 24 · HTTP Interceptors

> Add an `Authorization` header to every outgoing request with a functional interceptor.

**Folder** `apps/24-interceptor` · **Solution** `apps/24-interceptor-solution` · **Run** `npm run client -- 24-interceptor`

## 🎯 Goal

Cross-cutting HTTP concerns (auth, logging, error handling) don't belong in each service. Write an interceptor that clones every request and attaches `Authorization: Bearer SFEIR`.

## 📚 What you'll learn

- What interceptors are and what they're good for
- How to write a functional interceptor (`HttpInterceptorFn`)
- Why requests are immutable and must be **cloned**

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the interceptor

In `core/interceptors/core-interceptors.ts`, clone the request with an extra header and pass it on:

```typescript
import type { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (request, next) => {
  const clonedRequest = request.clone({
    setHeaders: { Authorization: 'Bearer SFEIR' },
  });

  return next(clonedRequest);
};
```

> 💡 `HttpRequest` is immutable — you can't mutate `request`; you clone it with the changes and forward the clone to `next()`.

### Step 2 — Register it

In `main.ts`, wire the interceptor into the HTTP client:

```typescript
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './app/core/interceptors/core-interceptors';

providers: [
  provideHttpClient(withFetch(), withInterceptors([TokenInterceptor])),
  // …
];
```

## ▶️ Run & verify

```bash
npm run client -- 24-interceptor
```

Open DevTools → **Network**, trigger any request, and check:

- [ ] Every request carries `Authorization: Bearer SFEIR` in its headers
- [ ] The app still works exactly as before

## 💡 Key concepts

- **`HttpInterceptorFn`** — a function `(req, next) => Observable<HttpEvent>`; register several with `withInterceptors([...])`.
- **Order** — requests flow through interceptors top-to-bottom; responses flow back bottom-to-top.
- **Common uses** — auth tokens, correlation ids, retry/`catchError`, response transforms, caching.

## 🧯 Troubleshooting

- **Header not added** — ensure the interceptor is registered in `withInterceptors([...])` and returns `next(clonedRequest)`.
- **Nothing changes** — you may have mutated `request` instead of using the clone.
- **Only some requests affected** — check for conditional logic (e.g. `if (request.url.includes(...))`).

## 🚀 Going further

- Add a second interceptor that logs each request/response duration.
- Handle 401s globally with `catchError` and a redirect to login.
