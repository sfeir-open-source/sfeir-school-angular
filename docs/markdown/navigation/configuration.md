<!-- .slide-->

# Simple Configuration

-   <b>path: </b>the route URL (e.g., /people/:id)<br/><br/>
-   <b>component: </b>the component associated with this route (e.g., PeopleComponent)<br/><br/>
-   <b>redirectTo: </b>the URL fragment to redirect the current route to (e.g., '/home')<br/><br/>
-   <b>pathMatch: </b>redirection strategy (full / prefix)
    -   full: attempts to match from the root of the route
    -   prefix: attempts a partial match of the route

##==##

<!-- .slide -->

# Advanced Configuration (complete)

Other configuration options exist, allowing for more advanced routing.
<br/><br/>

-   <b>outlet: </b>the name of the location where the component should be displayed<br/><br/>
-   <b>data: </b>data passed to the route via ActivatedRoute<br/><br/>
-   <b>canActivate / canDeactivate: </b>allows activating or deactivating the route<br/><br/>
-   <b>resolver: </b>retrieves data before navigating to the route<br/><br/>
-   <b>children: </b>an array of sub-route definitions

##==##

<!-- .slide: class="with-code inconsolata" -->

# An example of route configuration

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

-   Be careful, the order of route declaration is important.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Navigation Strategy

2 types of strategy<br/><br/>

- By 'Path', also named **PathLocationStrategy** (HTML5 mode and pushState => Default)
  - Example: `localhost:4200/people/1` => `{ useHash: false }`<br/><br/>
- By 'Hash', also named **HashLocationStrategy**
  - Example: `localhost/#/people/1` => `{ useHash: true }` <br/><br/>

```typescript
// app.module.ts
RouterModule.forRoot(routes, { useHash: true });
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column with-code inconsolata" -->
# Using navigation in Angular

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
