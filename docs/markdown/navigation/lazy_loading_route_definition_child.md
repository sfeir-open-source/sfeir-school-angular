<!-- .slide: class="sfeir-basic-slide with-code" -->
# Definition in the child module's routes

```typescript
const adminRoutes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
  { path: 'users', loadChildren: () => import('./admin-users/admin-users.module').then(m => m.AdminUsersModule) }
  ];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
```


<!-- .element: class="big-code" -->
