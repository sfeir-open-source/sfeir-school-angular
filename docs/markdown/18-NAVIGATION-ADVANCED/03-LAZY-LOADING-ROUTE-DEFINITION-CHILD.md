<!-- .slide: class="sfeir-basic-slide with-code" -->

# Definition in the child module's routes

```typescript
const adminRoutes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
  { path: 'users', loadChildren: () => import('./admin-users/admin-users.module').then(m => m.AdminUsersModule) },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  declarations: [AdminComponent],
})
export class AdminModule {}
```

<!-- .element: class="big-code" -->

##==##

# Definition in the child module's routes with Standalone Component

> Contrary to an application with modules, there is no concepts of child and root. Concepts of child routes will be replaced by the concepts of grouping route

##==##

<!-- .slide: class="with-code incosolata" -->

# Definition of the grouping route

```typescript
const adminRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', loadComponent: () => import('./admin-users/admin-users.routes').then(m => m.routes) },
];
```

<!-- .element: class="big-code" -->

```typescript
export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'admin', loadComponent: () => import('./user/user-admin').then(c => c.UserAdmin) },
      { path: ':id', loadComponent: () => import('./user/user-details').then(c => c.UserDetails) },
    ],
  },
];
```

<!-- .element: class="big-code" -->
