<!-- .slide: class="with-code inconsolata" -->
# Définition dans les routes du module principal

```typescript
const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.AdminModule) }
];

```
<!-- .element: class="big-code" -->
Notes:
- Attention il s'agit de la syntax Angular version 8
- Il est inutile d'essayer la destructuration, cela ne fonctionne pas (PeopleModule ne sera pas définit)
- Vous pouvez également utiliser la syntax async / await de la manière suivante: async() => (await import('./people/people.module')).PeopleModule
