<!-- .slide-->

# Configuration simple

-   <b>path: </b>l’URL de route (ex: /people/:id)<br><br>
-   <b>component: </b>le composant associé à cette route (ex: PeopleComponent)<br><br>
-   <b>redirectTo: </b>le fragment d’URL vers lequel rediriger la route courante (ex: '/home')<br><br>
-   <b>pathMatch: </b>stratégie de redirection (full / prefix)
    -   full: tente une reconnaissance depuis la racine de la route
    -   prefix: tente une reconnaissance partielle de la route

##==##

<!-- .slide -->

# Configuration avancé (complète)

Il existe d'autres options de configuration, permettant de réaliser du routing plus avancé.
<br><br>

-   <b>outlet: </b>le nom de l'emplacement dans lequel le composant doit s'afficher<br><br>
-   <b>data: </b>données passées à la route via ActivatedRoute<br><br>
-   <b>canActivate / canDeactivate: </b>permet d’activer ou non la route<br><br>
-   <b>resolver: </b>récupère des données avant de naviguer vers la route<br><br>
-   <b>children: </b>un tableau de définition des sous-routes

##==##

<!-- .slide: class="with-code inconsolata" -->

# Un exemple de configuration de routes

```typescript
const ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'people', component: PeopleComponent },
    { path: 'people/:id', component: PersonComponent },
    { path: '**', component: NotFoundComponent }
];
```

<!-- .element: class="big-code" -->

Notes:

-   Attention l'ordre de déclaration des routes est important

##==##

<!-- .slide: class="with-code inconsolata" -->

# La stratégie de navigation

2 types de stratégie<br><br>

-   Par 'Path', aussi nommé PathLocationStrategy (Mode HTML5 et psuhState=>Par défaut) [ex: localhost:4200/people/1]: { useHash: false }<br><br>
-   Par 'Hash', aussi nommé HashLocationStrategy [ex: localhost/#/people/1]: { useHash: true } <br><br>

```typescript
RouterModule.forRoot(routes, { useHash: true });
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column-layout" -->

# Utiliser la navigation en Angular

##--##
![h-600](assets/images/school/navigation/navigation_routing_module.png)
##--##
![h-400](assets/images/school/navigation/navigation_root_module.png)
![h-400](assets/images/school/navigation/navigation_router_outlet.png)
