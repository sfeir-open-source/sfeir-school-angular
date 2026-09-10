<!-- .slide: class="transition-bg-sfeir-2" -->

# Scoping the store to a route

##==##

<!-- .slide: class="with-code inconsolata" -->

# `providers` on the route config, not the component

```typescript
export const staffDirectoryRoutes: Routes = [
  {
    path: '',
    canActivateChild: [authenticatedGuard],
    providers: [StaffDirectoryStore], // 👈 scoped to this route subtree
    children: [
      { path: '', component: StaffDirectory },
      { path: ':id', component: PersonDetails, resolve: { person: PersonDetailsResolver } },
    ],
  },
];
```

<!-- .element: class="medium-code" -->

`StaffDirectory` and `PersonDetails` **both** sit under this route, so both can inject the same `StaffDirectoryStore` instance — a component-level `providers: [StaffDirectoryStore]` on `StaffDirectory` alone couldn't offer that, since `PersonDetails` isn't a descendant of `StaffDirectory`'s component tree.

##==##

# Why route-scoped, not component- or root-scoped

- **Component-scoped** would tie the store to `StaffDirectory` only — `PersonDetails` couldn't share it, and re-rendering `StaffDirectory` (e.g. via `@if`) would recreate the store unnecessarily<br/><br/>
- **Root-scoped** (`providedIn: 'root'`) would make the store — and its people list — live for the **entire app session**, including while the user is logged out or on unrelated routes; wasteful, and a stale list could leak into a later session<br/><br/>
- **Route-scoped** matches the actual lifetime that makes sense: created the moment a user navigates into `/people`, destroyed the moment they navigate away — the same lifecycle behavior a component-level provider gives you, but shared across every component under that route instead of tied to one

<!-- .element: class="important" -->

##==##

# The observable effect: a fresh fetch, every visit

Because the store (and its `onInit` hook) is recreated on every entry into the route, navigating away from `/people` and back triggers a **new** `getPeople()` call — visible as a fresh network request each time. This is the concrete, testable proof that the store's lifecycle is doing what you intended, not an incidental side effect.

Notes:
- If `StaffDirectoryStore`'s state ever "resets unexpectedly" when navigating between the list and a person's details, the most common cause is exactly this: the store ended up provided somewhere with a shorter lifetime than intended.
