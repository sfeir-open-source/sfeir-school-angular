<!-- .slide: class="with-code inconsolata" -->

# Writing a functional guard

```typescript
export const authenticatedGuard: CanActivateFn = () => {
  const window = inject(WINDOW);
  const router = inject(Router);
  if (window.sessionStorage.getItem('Authorization')) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
```

<!-- .element: class="big-code" -->

- A plain function matching the `CanActivateFn` signature<br/><br/>
- `inject()` works here even though there's no constructor — functional guards run inside an **injection context** for the duration of the call

Notes:

- `inject()` must be called synchronously in the function body — not inside an `async` callback, not after an `await`. Once the guard's function call returns, the injection context is gone.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `inject(WINDOW)` instead of the global `window`

```typescript
// core/provider/window.ts
export const WINDOW = new InjectionToken<Window>('WINDOW', {
  providedIn: 'root',
  factory: () => window,
});
```

<!-- .element: class="medium-code" -->

- Wraps the global `window` behind an injection token<br/><br/>
- Lets a guard (or any service) read `sessionStorage` without touching the browser global directly<br/><br/>
- The real payoff: this token can be swapped for a fake `window` in a unit test — a guard that calls `window.sessionStorage` directly can't

##==##

# Where does `'Authorization'` come from?

`UserService.login()` already writes the signed-in username to `sessionStorage` under the `'Authorization'` key the moment the login form is submitted.

<br/><br/>

A guard's whole job, in this app, is to **read that key back** and decide whether a navigation should be allowed to continue based on whether it's there.
