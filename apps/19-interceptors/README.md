# 19 — Interceptors

`UserService.login()` already writes the signed-in username to `sessionStorage` under the `'Authorization'` key, and every guard from the previous exercises already reads that key to decide who's allowed where. But nothing has ever looked at that value when the app actually talks to the API: every request `People` sends (`getPeople()`, `getPerson(id)`, `addPerson(...)`, `updatePerson(...)`, `removePerson(id)`, `getRandomPerson()`) goes out exactly as `HttpClient` built it, with no `Authorization` header attached. In this exercise you close that last gap with an **HTTP interceptor** — a function the Angular `HttpClient` pipeline runs on *every* outgoing request (and its response), letting you rewrite the request before it leaves the app without touching a single line of `People`.

You won't touch guards, the resolver, or any feature component. `authenticatedGuard`/`notAuthenticatedGuard`, `PersonDetailsResolver`, `Login`, `Home`, `StaffDirectory`, `PersonDetails`, `UserService` and `People` are already fully wired from the previous exercises. What's missing is the interceptor itself, and the one line of application bootstrap config that plugs it into `HttpClient`.

## 🎯 Learning objectives

- Writing a **functional interceptor** with `HttpInterceptorFn` — the modern replacement for the class-based `HttpInterceptor` interface, following the same `inject()`-in-a-plain-function shape you already used for guards and the resolver
- Understanding the interceptor's `(request, next)` signature: `request` is the immutable outgoing `HttpRequest`, and `next` is the rest of the interceptor chain — calling `next(request)` is what actually continues the request to the next interceptor (or to the backend if none remain)
- Producing a **modified request without mutating the original** with `HttpRequest.clone(...)` — `HttpRequest` objects are immutable by design, so every interceptor that wants to change something (headers, URL, body) must clone and forward the clone, never write to the original
- Attaching a header on every outgoing request with `clone({ setHeaders: { ... } })`
- Registering the interceptor with `provideHttpClient(withInterceptors([...]))` in `app.config.ts`, and understanding that **this call is what actually turns `HttpClient` on** in a standalone application — nothing sends a real HTTP request without it
- Reading application state (the stored session key) from inside an interceptor the same way you did inside a guard/resolver: `inject()` at the top of the function body, because interceptors run in an injection context too

## 📁 What you're working with

```
src/app/
├── app.config.ts                                          ← TO REWORK: HttpClient isn't provided yet
├── core/
│   ├── guards/authenticated.ts                             ← complete, nothing to do
│   ├── interceptors/                                       ← DOES NOT EXIST YET, you create it
│   └── provider/
│       ├── people.ts                                       ← complete, nothing to do (already calls HttpClient for every request)
│       ├── user-service.ts                                 ← complete, nothing to do (already writes 'Authorization' to sessionStorage)
│       └── window.ts                                       ← complete, nothing to do
├── feature/
│   ├── login/                                               ← complete, nothing to do
│   ├── home/                                                ← complete, nothing to do
│   └── staff-directory/
│       ├── staff-directory.ts / .html / .scss               ← complete, nothing to do
│       ├── dialog-person/                                   ← complete, nothing to do
│       ├── person-details/                                  ← complete, nothing to do
│       ├── resolvers/index.ts                               ← complete, nothing to do
│       └── staff-directory-routes.ts                        ← complete, nothing to do
```

`app.config.ts` currently looks like this:

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(APP_ROUTES, withComponentInputBinding())],
};
```

There is no `provideHttpClient(...)` call at all yet. `People` already injects `HttpClient` and calls `get`/`post`/`put`/`delete` on it, but with no provider registered for it in the app, those calls have nothing configured to run through — your interceptor needs a place to plug into, and that place doesn't exist until you add it.

## 📝 Your tasks

### 1. Create `core/interceptors/token-interceptor.ts`

This is a new file. It needs to export a functional interceptor:

- Type it with `HttpInterceptorFn` from `@angular/common/http` — a function taking an `HttpRequest` and a `next` handler, and returning what `next` returns.
- Use `inject()` inside the function body (interceptors run in an injection context, same as guards and the resolver) to reach the `'Authorization'` value, read through the `WINDOW` token's `sessionStorage` the same way `authenticatedGuard` does.
- Build a new request from the incoming one with `.clone({ setHeaders: { ... } })`, adding an `Authorization` header. Think about the conventional shape of a bearer token header (`<scheme> <value>`) rather than just forwarding the raw stored value as-is.
- Forward the **cloned** request to `next(...)` and return its result — the original `request` parameter must never be passed to `next` once you've built a modified version, and it can't be mutated directly since `HttpRequest` is immutable.

### 2. Wire the interceptor into `app.config.ts`

- Add `provideHttpClient(...)` to the `providers` array — without it, nothing in the app can make a real HTTP request no matter what `People` does.
- Pass it the `withInterceptors([...])` feature with your interceptor function inside the array. Function reference, not a call — the same convention you already followed when registering guards on a route's `canActivate`/`canMatch` arrays.

## ▶️ How to run the application

From the workspace root:

```bash
nx serve 19-interceptors
```

This also starts the `server-rest` mock API the app depends on (`environments/environment.ts` points to `http://localhost:9000/api`) — leave it running, no need to start it separately. `19-interceptors` is not the workspace's default Nx project (`01-hands-on` is), so always pass the project name explicitly.

```bash
nx build 19-interceptors   # production build
```

## ✅ How to know it's working

- The app still behaves exactly like it did in the previous exercise: sign in, land on `/people`, browse the Staff Directory, open a person's details, edit and save, all without any visible change in behavior.
- With DevTools' Network tab open, inspect any request `People` fires (e.g. `GET /api/people` when the Staff Directory loads, or `GET /api/people/:id` when the resolver runs) — its Request Headers now include an `Authorization` entry that wasn't there before.
- Signing in with a different username and reloading the Staff Directory shows a different value in that `Authorization` header — it's built from whatever is currently in `sessionStorage`, not hardcoded.
- Every request type still succeeds (list, detail, add, edit, delete, random person on `/home`) — the interceptor must not break the request it forwards.

## 🛠️ Troubleshooting

- **`NullInjectorError: No provider for HttpClient!`** — `provideHttpClient(...)` is missing (or misplaced) from the `providers` array in `app.config.ts`; `People` injecting `HttpClient` has nothing to resolve without it.
- **Requests go out but never get the `Authorization` header** — check that you're returning the *cloned* request to `next(...)`, not the original `request` parameter; cloning without forwarding the clone has no effect.
- **App crashes or a request silently never completes** — make sure your interceptor actually calls and `return`s `next(...)`. An interceptor that doesn't call `next` breaks the chain and the request never reaches the backend.
- **`inject()` throws "not in an injection context"** — same rule as guards and the resolver: call `inject()` synchronously at the top of the interceptor function body, not inside an `async` callback or after an `await`.
- **Header shows up as `Authorization: null` or `Authorization: undefined`** — this happens when you read `sessionStorage` before ever logging in (e.g. testing a direct request while signed out); sign in through `Login` first so `UserService.login()` has written a value.
- **TypeScript complains about the interceptor's signature** — `HttpInterceptorFn` expects exactly two parameters (`request: HttpRequest<unknown>`, `next: HttpHandlerFn`) and a return type matching what `next` returns; don't add extra parameters or wrap the return value.

## 🙈 Stuck?

Try getting the header to show up in the Network tab on your own first — reasoning through *why* `HttpRequest` is immutable and what `clone()` buys you, and why `provideHttpClient` has to be explicit in a standalone app, is the actual point of this exercise. If you want a reference, `apps/19-interceptors-solution` has a working implementation. Use it to check your approach once your own version works, not as a shortcut to copy from.
