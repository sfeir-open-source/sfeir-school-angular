# Le routing avec les standalone components

Le standalone components offre de nouvelles possibilités <br/><br/>

- lazyloader un standalone components <br/><br/>
- lazyloader un ensemble de standalone components <br/><br/>

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Lazyloader un standalone component

Une nouvelle méthode qui ressemble étrangement à celle que l'on connaît déjà: __loadChildren__ <br/><br/>

```typescript
const APP_ROUTES = [
  {path: 'home', loadComponent: () => import('@feature/home/home.component').then(cmp => cmp.HomeComponent)}
]
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Lazyloader un ensemble de composant standalone

__loadChildren__ peut désormais charger un fichier de route composé de standalone component <br/><br/>

```typescript
export const CHILD_ROUTES = [
  {
    path: '', component: UserComponent, children: [
      {path: 'admin', component: AdminComponent},
      {path: 'details', component: DetailsComponent}
    ]
  }
]
```
<!-- .element: class="medium-code"-->


```typescript
const APP_ROUTES = [
  {path: 'user', loadChildren: () => import('@feature/user/user.routes').then(rts => rts.CHILD_ROUTES)}
]
```
<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Comment enregistrer notre routing sans module

Sans module, une nouvelle façon d'enregistrer son routing. <br/><br/>

```typescript
import {bootstrapApplication} from '@angular/platform-browser';
import {importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
  ]
});
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Configurer le routing sans module
<br/><br/>

**provideRouter** prend deux paramètres: 
- les routes <br/><br/>
- la configuration du router


##==##

<!-- .slide-->
# Configurer le routing sans module

Il existe différent RouterFeature:
- **withRouterConfig**: permet de configurer la navigation <br/><br/>
- **withDebugTracing**: permet d'activer les logs interne à la navigation d'Angular <br/><br/>
- **withHashLocation**: permet de changer la stratégie de navigation par défaut (HTML5) par une stratégie basé sur le hash (#) <br/><br/>
- **withComponentInputBinding**: permet de binder les paramètres de la route à un composant <br/><br/>
- **withNavigationErrorHandler**: permet de gérer les erreurs de navigation <br/><br/>
- ... et bien d'autres

##==##

<!-- .slide: class="with-code inconsolata"-->
# Configurer le routing sans module

<br/><br/><br/>

```typescript
import {bootstrapApplication} from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withDebugTracing(), withHashLocation(), withComponentInputBinding()),
  ]
});
```
<!-- .element: class="big-code"-->

##==##

# Binder les paramètres de la route à un composant

Depuis peu, Angular nous permet de binder les paramètres de la route à un composant <br/><br/>, un peu comme le fait déjà Vue js.

Pour en bénéficier il suffit d'ajouter une configuration dans notre router <br/><br/>

- **withComponentInputBinding**: permet de binder les paramètres de la route à un composant dans le cas d'une application sans module <br/><br/>
- **RouterModule.forRoot(routes, { bindToComponentInputs: true })**: permet de binder les paramètres de la route à un composant dans le cas d'une application avec module <br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Comment ça fonctionne ?

```typescript
// Fichier main.ts

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([{ path: '/search', component: SearchComponent }], withComponentInputBinding()),
  ]
});
```
<!-- .element: class="medium-code"-->

```typescript
@Component({
  selector: 'search',
  template: `<p>Search query: {{ query }}</p>`
})
export class SearchComponent {
  @Input() query?: string;
}
```
<!-- .element: class="medium-code"-->

##==##

# Une résolution par ordre bien spécifique

Le problème avec cette notion de binding et le naming. Angular résout les paramètres de la route dans l'ordre suivant: <br/><br/>

- data <br/><br/>
- path params <br/><br/>
- query params <br/><br/>







