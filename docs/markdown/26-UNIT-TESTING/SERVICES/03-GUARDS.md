<!-- .slide: class="with-code inconsolata" -->

# A functional guard is just a function

```typescript
export const authenticatedGuard = isAuthenticated((authorization, router) => {
  if (authorization) return true;
  return router.createUrlTree(['/login']);
});
```

<!-- .element: class="big-code" -->

`authenticatedGuard`/`notAuthenticatedGuard` both read `sessionStorage` (through the `WINDOW` token) and call `Router.createUrlTree()` — but neither needs a **real** router or a **real** `window` to be tested. You invoke the guard directly, inside an injection context.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `TestBed.runInInjectionContext()` + stub providers

```typescript
function runGuard(guard: CanActivateFn) {
  return TestBed.runInInjectionContext(() => guard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
}

beforeEach(() => {
  sessionStorageStub = { getItem: vi.fn() };
  createUrlTreeSpy = vi.fn((commands: unknown[]) => ({ commands }));
  TestBed.configureTestingModule({
    providers: [
      { provide: WINDOW, useValue: { sessionStorage: sessionStorageStub } },
      { provide: Router, useValue: { createUrlTree: createUrlTreeSpy } },
    ],
  });
});
```

<!-- .element: class="small-code" -->

No component, no fixture, no rendering at all — just DI providing fakes, and a helper that runs the guard function where `inject(...)` is legal.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Asserting on the guard's decision and its side effect

```typescript
it('should redirect to /login when the user is not authenticated', () => {
  sessionStorageStub.getItem.mockReturnValue(null);

  const result = runGuard(authenticatedGuard as CanActivateFn);

  expect(createUrlTreeSpy).toHaveBeenCalledExactlyOnceWith(['/login']);
  expect(result).toEqual({ commands: ['/login'] });
});
```

<!-- .element: class="medium-code" -->

Two things to check for a guard, always: **what it returns** (`true` vs. a `UrlTree`) and **what it asked the router to build** — a guard test that only checks the return value would still pass if the redirect target were wrong.

##==##

# What this example covers, end to end

- The authenticated case: activation allowed, `createUrlTree` never called<br/><br/>
- The unauthenticated case: activation denied, redirect built to the right route (`/login` for `authenticatedGuard`, `/people` for `notAuthenticatedGuard`)<br/><br/>
- The exact `sessionStorage` key read (`'Authorization'`) matches what `login.ts`/`UserService` writes on sign-in<br/><br/>

This is task 2 of the `apps/23-unit-tests` lab — `authenticated.spec.ts`, and the same `TestBed.runInInjectionContext()` pattern you'll meet again testing a resolver.
