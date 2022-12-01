<!-- .slide-->

# Configuration simple

-   <b>path: </b>l’URL de route (ex: /people/:id)<br/><br/>
-   <b>component: </b>le composant associé à cette route (ex: PeopleComponent)<br/><br/>
-   <b>redirectTo: </b>le fragment d’URL vers lequel rediriger la route courante (ex: '/home')<br/><br/>
-   <b>pathMatch: </b>stratégie de redirection (full / prefix)
    -   full: tente une reconnaissance depuis la racine de la route
    -   prefix: tente une reconnaissance partielle de la route

##==##

<!-- .slide -->

# Configuration avancée (complète)

Il existe d'autres options de configuration, permettant de réaliser du routing plus avancé.
<br/><br/>

-   <b>outlet: </b>le nom de l'emplacement dans lequel le composant doit s'afficher<br/><br/>
-   <b>data: </b>données passées à la route via ActivatedRoute<br/><br/>
-   <b>canActivate / canDeactivate: </b>permet d’activer ou non la route<br/><br/>
-   <b>resolver: </b>récupère des données avant de naviguer vers la route<br/><br/>
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

2 types de stratégie<br/><br/>

- Par 'Path', aussi nommée **PathLocationStrategy** (Mode HTML5 et pushState => Par défaut)
  - Exemple: `localhost:4200/people/1` => `{ useHash: false }`<br/><br/>
- Par 'Hash', aussi nommée **HashLocationStrategy**
  - Exemple: `localhost/#/people/1` => `{ useHash: true }` <br/><br/>

```typescript
// app.module.ts
RouterModule.forRoot(routes, { useHash: true });
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column with-code inconsolata" -->
# Utiliser la navigation en Angular

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES),
    ],
})
export class AppModule {}
```
<!-- .element: class="medium-code"-->

##--##
<!-- .slide: class="with-code inconsolata" -->
<br/><br/><br/><br/><br/>

```html
<!-- app.component.html -->
<section class='container'>
  <router-outlet></router-outlet>
</section>
```
<!-- .element: class="medium-code"-->
