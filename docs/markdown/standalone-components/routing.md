# Routing with Standalone Components

Standalone components offer new possibilities:<br/><br/>

- lazy-load a standalone component<br/><br/>
- lazy-load a set of standalone components<br/><br/>

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Lazy-loading a Standalone Component

A new property that is very similar to what we already know: `loadComponent`<br/><br/>

```typescript
const APP_ROUTES: Routes = [
  {path: 'home', loadComponent: () => import('@feature/home/home.component').then(m => m.HomeComponent)}
];
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Lazy-loading a set of Standalone Components

`loadChildren` can now load a route file composed of standalone components.<br/><br/>

```typescript
// user.routes.ts
export const CHILD_ROUTES: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: 'admin', component: AdminComponent},
      {path: 'details', component: DetailsComponent}
    ]
  }
];
```
<!-- .element: class="medium-code"-->


```typescript
// app.routes.ts
const APP_ROUTES: Routes = [
  {path: 'user', loadChildren: () => import('@feature/user/user.routes').then(m => m.CHILD_ROUTES)}
];
```
<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# How to register routing without modules

Without modules, there's a new way to register your routes.<br/><br/>

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
  ]
});
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Configuring routing without modules
<br/><br/>

`provideRouter` takes two parameters: 
- the routes<br/><br/>
- the router features (configuration)


##==##

<!-- .slide-->
# Configuring routing without modules

Several `RouterFeatures` are available:
- `withRouterConfig`: allows you to configure navigation options.<br/><br/>
- `withDebugTracing`: enables logging of internal Angular navigation events.<br/><br/>
- `withHashLocation`: changes the default location strategy (HTML5) to a hash-based strategy (`#`).<br/><br/>
- `withComponentInputBinding`: enables binding of route parameters to component inputs.<br/><br/>
- `withNavigationErrorHandler`: allows you to handle navigation errors.<br/><br/>
- ... and many others.

##==##

<!-- .slide: class="with-code inconsolata"-->
# Configuring routing without modules

<br/><br/><br/>

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withDebugTracing, withHashLocation, withComponentInputBinding } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES, withDebugTracing(), withHashLocation(), withComponentInputBinding()),
  ]
});
```
<!-- .element: class="big-code"-->

##==##

# Binding route parameters to component inputs

Angular now allows us to bind route parameters to component inputs, similar to Vue.js.<br/><br/>

To enable this, you just need to add a feature to your router configuration:<br/><br/>

- `withComponentInputBinding()`: enables input binding for a module-less application.<br/><br/>
- `RouterModule.forRoot(routes, { bindToComponentInputs: true })`: enables input binding for a module-based application.<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->
# How does it work?

```typescript
// main.ts file

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([{ path: 'search/:id', component: SearchComponent }], withComponentInputBinding()),
  ]
});
```
<!-- .element: class="medium-code"-->

```typescript
@Component({
  selector: 'search',
  template: `<p>Search query: {{ query }} and id: {{ id }}</p>`
})
export class SearchComponent {
  @Input() query?: string;
  @Input() id?: string;
}
```
<!-- .element: class="medium-code"-->

##==##

# A specific resolution order

The challenge with this binding concept is naming conflicts. Angular resolves route parameters in the following order:<br/><br/>

- Route `data` object<br/><br/>
- Path parameters (`/user/:id`)<br/><br/>
- Query parameters (`?q=hello`)<br/><br/>
