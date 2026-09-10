<!-- .slide: class="with-code inconsolata" -->

# Before: eager, flat routes

```typescript
// app.route.ts
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'people', component: StaffDirectory },
  { path: 'people/:id', component: PersonDetails },
];
```

<!-- .element: class="big-code" -->

`StaffDirectory` and `PersonDetails` are `import`ed at the top of the file → they're bundled eagerly, whether or not `/people` is ever visited.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `loadComponent`: lazy loading a single component

```typescript
const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
];
```

<!-- .element: class="big-code" -->

- `loadComponent` takes a function returning a `Promise` of the component class<br/><br/>
- The router calls it — and downloads the chunk — the first time it needs to activate that route

##==##

<!-- .slide: class="with-code inconsolata" -->

# `loadChildren`: lazy loading a whole feature

```typescript
// app.route.ts
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'people', loadChildren: () => import('./feature/staff-directory/staff-directory-routes').then(m => m.staffDirectoryRoutes) },
];
```

<!-- .element: class="big-code" -->

- `loadChildren` resolves to a `Routes` array, not a single component<br/><br/>
- The eager imports of `StaffDirectory` and `PersonDetails` disappear from `app.route.ts` entirely — the router only ever reaches them through this chunk

Notes:

- Destructuring `import()`'s return value directly (e.g. `then(({ staffDirectoryRoutes }) => staffDirectoryRoutes)`) works exactly the same as `.then(m => m.staffDirectoryRoutes)` — both just read the named export off the resolved module object.
- A dynamic `import()` always resolves to a **module namespace object** — you must pick the named export off it, `loadChildren` never accepts the module itself as the routes array.
