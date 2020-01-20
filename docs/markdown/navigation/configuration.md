<!-- .slide: class="sfeir-basic-slide" -->
# Configuration simple
<br><br>
- <strong>path: </strong>l’URL de route (ex: /people/:id)<br><br>
- <strong>component: </strong>le composant associé à cette route (ex: PeopleComponent)<br><br>
- <strong>redirectTo</strong>le fragment d’URL vers lequel rediriger route courante (ex: '/home')<br><br>
- <strong>pathMatch: </strong>stratégie de redirection (full / prefix)
<ul>
    <li>full: tente une reconnaissance depuis la racine de la route</li>
    <li>prefix: prefix: tente une reconnaissance partielle de la route</li>
</ul>

##--##

<!-- .slide: class="sfeir-basic-slide" -->
# Configuration avancé (complète)
<br>
il existe d'autre options de configuration, permettant de réaliser du routing plus avancé.<br><br>
- <strong>outlet: </strong>le nom de l'emplacement dans lequel le composant doit s'afficher<br><br>
- <strong>data: </strong>données passées à la route via ActivatedRoute<br><br>
- <strong>canActivate / canDeactivate: </strong>permet d’activer ou non la route<br><br>
- <strong>resolver: </strong>récupère des données avant de naviguer vers la route<br><br>
- <strong>children: </strong>un tableau de définition des sous-routes

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Un exemple de configuration de routes
<br><br>
```typescript
const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'people/:id', component: PersonComponent },
  { path: '**', component: NotFoundComponent }
]
```
<!-- .element: class="big-code" -->
<br>
Notes
- Attention l'ordre de déclaration des routes est importante

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# La stratégie de navigation
<br><br>
2 types de stratégie<br><br>
<ul>
    <li>Par 'Path', aussi nommé PathLocationStrategy (Mode HTML5 et pushState=>Par défaut) [ex: localhost:4200/people/1]: { useHash: false }</li><br>
    <li>Par 'Hash', aussi nommé HashLocationStrategy [ex: localhost/#/people/1]: { useHash: true }</li>
</ul>
<br><br>
```typescript
RouterModule.forRoot(routes, { useHash: true });
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Utiliser la navigation en Angular
<div class="flex-row">
    <img alt="h-600" src="assets/images/school/navigation/navigation_routing_module.png" />
    <img alt="h-500" src="assets/images/school/navigation/navigation_root_module.png" />
</div>
<img alt="h-400 center" src="assets/images/school/navigation/navigation_router_outlet.png" />

