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
  { path: 'home', loadComponent: () => import('@feature/home/home.component').then(cmp => cmp.HomeComponent)}
]
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Lazyloader un ensemble de composant standalone

__loadChildren__ peut désormais charger un fichier de route composé de standalone component <br/><br/>

```typescript
export const CHILD_ROUTES = [
  { path: '', component: UserComponent, children: [
    { path: 'admin', component: AdminComponent },
    { path: 'details', component: DetailsComponent } 
  ]}
]
```
<!-- .element: class="big-code"-->

<br/><br/>


```typescript
const APP_ROUTES = [
  { path: 'user', loadChildren: () => import('@feature/user/user.routes').then(rts => rts.CHILD_ROUTES)}
]
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Comment enregistrer notre routing sans module

Sans module, une nouvelle façon d'enregistrer son routing. <br/><br/>

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, { providers: [
  importProvidersFrom(RouterModule.forRoot(APP_ROUTES))
] });
```
<!-- .element: class="big-code"-->
