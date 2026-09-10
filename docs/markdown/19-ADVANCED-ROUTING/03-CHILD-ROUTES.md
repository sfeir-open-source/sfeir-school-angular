# A feature owns its own routes

- `people` and `people/:id` aren't two independent screens that happen to share a prefix — they're the **list** and **detail** view of the *same* feature<br/><br/>
- A feature-owned routes file expresses that relationship directly, instead of leaking it into the root route table<br/><br/>
- `staff-directory-routes.ts` lives **inside** `feature/staff-directory/`, next to the components it configures

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `children` array

A route can nest other routes under it with `children`:

```typescript
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'users', component: AdminUsers },
    ],
  },
];
```

<!-- .element: class="medium-code" -->

- A child route's URL is **appended** to its parent's<br/><br/>
- The parent needs a component to render — `<router-outlet>` inside it is where the matching child renders

##==##

# The missing piece: an empty-path parent

`loadChildren` already gave the whole feature the `people` prefix. Nesting the list and detail views *again* under an explicit path would double it up (`people/people`, `people/people/:id`).

<br/>

The fix: an extra **empty-path (`path: ''`) route**, whose only job is to "merge" the feature's own routes into the segment that lazy-loaded them — it contributes no extra URL segment, just a place to hang `children`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `staff-directory-routes.ts`

```typescript
export const staffDirectoryRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: StaffDirectory }, // -> /people
      { path: ':id', component: PersonDetails }, // -> /people/:id
    ],
  },
];
```

<!-- .element: class="big-code" -->

- Mounted at `people` by `loadChildren`, this gives exactly `/people` (list) and `/people/:id` (detail)<br/><br/>
- No module, no `RouterModule.forChild()` — just a plain array of `Route` objects

##==##

<!-- .slide: class="with-code inconsolata" -->

# Reading the `:id` param without `ActivatedRoute`

`app.config.ts` already turns on `withComponentInputBinding()`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(APP_ROUTES, withComponentInputBinding())],
};
```

<!-- .element: class="medium-code" -->

```typescript
@Component({ selector: 'sfeir-person-details', ... })
export class PersonDetails {
  id = input.required<string>();
}
```

<!-- .element: class="medium-code" -->

- The router matches a route param name (`:id`) to a same-named `input()` on the component<br/><br/>
- No `inject(ActivatedRoute)`, no `paramMap` subscription — the value just arrives as a signal input
