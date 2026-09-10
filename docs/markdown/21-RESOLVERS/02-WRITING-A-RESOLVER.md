<!-- .slide: class="with-code inconsolata" -->

# Writing a functional resolver

```typescript
// feature/staff-directory/resolvers/index.ts
export const personResolver: ResolveFn<Person> = route => {
  const id = route.paramMap.get('id')!;
  return inject(People).getPerson(id);
};
```

<!-- .element: class="big-code" -->

- `ResolveFn<T>` — the same functional shape as `CanActivateFn`, except its job is to **produce a value** of type `T`, not to allow/deny navigation<br/><br/>
- The first argument is an `ActivatedRouteSnapshot` — read route params off it directly with `route.paramMap.get(...)`, no injected `ActivatedRoute` observable needed<br/><br/>
- `inject()` again — a resolver runs in an injection context, exactly like a guard

Notes:

- Return the Observable directly, don't subscribe to it yourself — the router subscribes and waits for it to emit before continuing the navigation.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Registering it on the route

```typescript
export const staffDirectoryRoutes: Routes = [
  {
    path: '',
    canActivateChild: [authenticatedGuard],
    children: [
      { path: '', component: StaffDirectory },
      { path: ':id', component: PersonDetails, resolve: { person: personResolver } },
    ],
  },
];
```

<!-- .element: class="medium-code" -->

- `resolve` is an object: **key → resolver**<br/><br/>
- The key (`person`) is not arbitrary — it's about to become the name of an `input()` on `PersonDetails`
