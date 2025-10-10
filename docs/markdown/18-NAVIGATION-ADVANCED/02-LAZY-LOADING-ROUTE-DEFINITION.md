<!-- .slide: class="with-code inconsolata" data-type-show="on-stage" -->

# Definition in the main routing with Module

```typescript
const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
];
```

<!-- .element: class="big-code" -->

Notes:

- Note: this is the syntax for Angular version 8.
- It is useless to try destructuring; it does not work (PeopleModule will not be defined).
- You can also use the async/await syntax as follows: async() => (await import('./people/people.module')).PeopleModule

##==##

<!-- .slide: class="with-code inconsolata" -->

# Definition in the main routing with Standalone Component

```typescript
const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },
  { path: 'order', loadComponent: () => import('./order/order.component').then(m => m.OrderComponent) },
];
```

<!-- .element: class="big-code" -->
