# Simple Configuration

- **path:** the route URL (e.g., /people/:id)<br/><br/>
- **component:** the component associated with this route (e.g., PeopleComponent)<br/><br/>
- **redirectTo:** the URL fragment to redirect the current route to (e.g., '/home')<br/><br/>
- **pathMatch:** redirection strategy (full / prefix)
  - full: attempts to match from the root of the route
  - prefix: attempts a partial match of the route

##==##

# Advanced Configuration (complete)

Other configuration options exist, allowing for more advanced routing.
<br/><br/>

- <b>outlet: </b>the name of the location where the component should be displayed<br/><br/>
- <b>data: </b>data passed to the route via ActivatedRoute<br/><br/>
- <b>canActivate / canDeactivate: </b>allows activating or deactivating the route<br/><br/>
- <b>resolver: </b>retrieves data before navigating to the route<br/><br/>
- <b>children: </b>an array of sub-route definitions

##==##

<!-- .slide: class="with-code inconsolata" -->

# An example of route configuration

```typescript
const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'people/:id', component: PersonComponent },
  { path: '**', component: NotFoundComponent },
];
```

<!-- .element: class="big-code" -->

Notes:

- Be careful, the order of route declaration is important.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Navigation Strategy

2 types of strategy<br/><br/>

- By 'Path', also named **PathLocationStrategy** (HTML5 mode and pushState => Default)
  - Example: `localhost:4200/people/1` => `{ useHash: false }`<br/><br/>
- By 'Hash', also named **HashLocationStrategy**
  - Example: `localhost/#/people/1` => `{ useHash: true } | withHashLocation()` <br/><br/>

```typescript
// app.module.ts
@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
})
export class AppModule {}
// main.ts file
bootstrapApplication(AppComponent, { providers: [provideRouter(ROUTES, withHashLocation())] });
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Using navigation in Angular

<br/><br/><br/>

```angular181html
<!-- app.component.html -->
<section class="container">
  <router-outlet />
</section>
```

<!-- .element: class="big-code"-->

##==##

# Zoom in on the provideRouter function

<br/><br/>

- **create**: the routing for the entire application <br/><br/>
- **expose**: the router service, activatedRoute service and location service to the entire application <br/><br/>
- **take**: a list of feature router function after the routing configuration

##==##

# Routing Feature functions

Routing feature functions let you configuring how is managed the navigation <br/><br/>

- **withRouterConfig**: allows you to configure navigation options.<br/><br/>
- **withDebugTracing**: enables logging of internal Angular navigation events.<br/><br/>
- **withHashLocation**: changes the default location strategy (HTML5) to a hash-based strategy (`#`).<br/><br/>
- **withComponentInputBinding**: enables binding of route parameters to component inputs.<br/><br/>
- **withNavigationErrorHandler**: allows you to handle navigation errors.<br/><br/>
