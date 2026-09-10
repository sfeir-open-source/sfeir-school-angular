# Redirecting from inside a guard

Two ways to say "no, go somewhere else instead":

<br/>

- **Imperative**: inject `Router`, call `router.navigate([...])`, then `return false`<br/><br/>
- **Declarative**: `return router.createUrlTree([...])`

##==##

<!-- .slide: class="with-code inconsolata" -->

# Why `createUrlTree` wins

```typescript
export const authenticatedGuard: CanActivateFn = () => {
  const window = inject(WINDOW);
  const router = inject(Router);
  if (window.sessionStorage.getItem('Authorization')) {
    return true;
  }
  return router.createUrlTree(['/login']); // not navigate() + return false
};
```

<!-- .element: class="medium-code" -->

- A `UrlTree` tells the router "redirect **here** instead" in a single step, as part of the same navigation<br/><br/>
- `router.navigate(...)` starts a **brand new** navigation, racing against the one already in flight — this composes badly once a guard also has to stop a lazy chunk from loading (`canMatch`, next slide)<br/><br/>
- Returning a `UrlTree` is honest about what a guard actually is: a function from *"can this navigation continue?"* to `true`, `false`, or *"redirect instead"*

##==##

# Two guards, opposite directions

The same session lookup, branching the other way, protects the login screen itself:

<br/>

- `authenticatedGuard`: continue only if **signed in**, else redirect to `/login`<br/><br/>
- `notAuthenticatedGuard`: continue only if **signed out**, else redirect to `/people`<br/><br/>

Both read the same `'Authorization'` key through `WINDOW` — only the branch and the redirect target differ, which is a good sign the lookup itself belongs in one small shared function.
