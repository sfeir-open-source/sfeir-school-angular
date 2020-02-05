<!-- .slide: class="sfeir-basic-slide with-code" -->
# Définiton dans les routes 
<br><br>
```typescript
const ROUTES: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{path: 'people', loadChildren: () => import('./people/people.module').then(mod => mod.PeopleModule) },
{ path: 'people/:id', loadChildren: () => import('./people/people.module').then(mod => mod.PeopleModule) },
];
```
<!-- .element: class="big-code" -->
Notes
- Attention il s'agit de la syntax Angular version 8
- Il est inutile d'essayer la destructuration, cela ne fonctionne pas (PeopleModule ne sera pas définit)
