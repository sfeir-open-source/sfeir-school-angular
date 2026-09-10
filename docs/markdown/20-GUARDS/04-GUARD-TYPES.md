<!-- .slide: class="with-code inconsolata" -->

# `canActivate`: protecting an eager route

```typescript
export const APP_ROUTES: Routes = [
  { path: 'login', component: Login, canActivate: [notAuthenticatedGuard] },
  { path: 'home', component: Home, canActivate: [authenticatedGuard] },
];
```

<!-- .element: class="medium-code" -->

- Runs once the router has already resolved the route and is about to activate it<br/><br/>
- Fine for `Home`, which is eagerly loaded — there's no chunk to protect, only the render

##==##

<!-- .slide: class="with-code inconsolata" -->

# `canMatch`: protecting a *lazy* route

```typescript
export const APP_ROUTES: Routes = [
  {
    path: 'people',
    canMatch: [authenticatedGuard], // not canActivate
    loadChildren: () => import('./feature/staff-directory/staff-directory-routes').then(m => m.staffDirectoryRoutes),
  },
];
```

<!-- .element: class="medium-code" -->

- `people` is lazy-loaded — `canActivate` alone would still let the router **fetch the chunk** before rejecting the activation<br/><br/>
- `canMatch` runs *before* the router even considers the route a match, which means before it triggers the `import()` — an anonymous visitor never downloads the Staff Directory bundle at all

Notes:

- Same guard function, same `CanActivateFn`/`CanMatchFn` shape — the router calls it identically no matter which array it's registered in. Only when it's called differs.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `canActivateChild`: guarding a whole subtree once

```typescript
export const staffDirectoryRoutes: Routes = [
  {
    path: '',
    canActivateChild: [authenticatedGuard], // guards BOTH children below
    children: [
      { path: '', component: StaffDirectory },
      { path: ':id', component: PersonDetails },
    ],
  },
];
```

<!-- .element: class="medium-code" -->

- The empty-path parent route has no component to *activate* — but it owns the `children` array<br/><br/>
- One `canActivateChild` on the parent covers every child underneath, instead of repeating `canActivate` on `''` and again on `':id'`

##==##

# Putting the three together

| Guard              | Registered on           | Runs                                        | Stops                                    |
| ------------------- | ------------------------ | -------------------------------------------- | ------------------------------------------ |
| `canActivate`        | `login`, `home`           | Just before activating that route            | Rendering the component                   |
| `canMatch`            | `people` (lazy)           | Before the router even matches the route     | Fetching the lazy chunk **and** rendering  |
| `canActivateChild`    | the empty-path parent     | Before activating any of its `children`      | Rendering `StaffDirectory` **or** `PersonDetails` |

<br/>

Same guard functions, three different moments in the navigation pipeline — pick the array based on *what* you need to stop, not just *whether* you need to stop it.
