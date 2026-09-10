<!-- .slide: class="with-code inconsolata" -->

# Registering the Router: `provideRouter()`

The Router is just another injectable Angular has to know about — you register it once, at bootstrap, in the `ApplicationConfig`'s `providers` array:

<br/>

```typescript
// app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.route';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(APP_ROUTES), // 👈 same DI-based bootstrap pattern
  ],
};
```

<!-- .element: class="medium-code" -->

Notes:

- `provideRouter` **creates** the routing configuration for the whole application and **exposes** `Router`, `ActivatedRoute` and `Location` to every injector in the app.
- This is the exact same pattern used everywhere else in Angular's standalone bootstrap: a `provideXxx()` function added to the `providers` array — nothing router-specific to learn about DI itself.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `RouterOutlet`: where routed content lands

`RouterOutlet` is a standalone directive — import it like any other component dependency, then drop `<router-outlet />` where the matched component should render:

<br/>

```typescript
// app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 👈 no more `import { Home } from ...`

@Component({
  selector: 'sfeir-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {}
```

<!-- .element: class="small-code" -->

```html
<!-- app.html -->
<section class="toolbar"><!-- ...nav links... --></section>
<router-outlet />
<!-- 👈 replaces the hardcoded <sfeir-home /> -->
```

<!-- .element: class="small-code"-->

Notes:

- Notice what disappears from `App`: the import of `Home`. `App` no longer needs to know that component exists — routing turned a static parent→child relationship into one driven entirely by configuration.
- `<router-outlet>` itself renders nothing visible; the Router inserts the matched component as its sibling in the DOM, right after the `<router-outlet>` marker.

##==##

<!-- .slide: class="with-code inconsolata" -->
# Two navigation strategies

<br/>

- **Path** — `PathLocationStrategy` (the default, HTML5 `pushState`)
  - `localhost:4200/people/1`<br/><br/>
- **Hash** — `HashLocationStrategy`
  - `localhost:4200/#/people/1` 


```typescript
// Path strategy is the default — provideRouter(APP_ROUTES) is enough.
// Opt into hash-based routing with a routing feature function:
provideRouter(APP_ROUTES, withHashLocation());
```

<!-- .element: class="medium-code" -->

Notes:

- Hash-based routing is mostly a fallback for static hosting that can't rewrite every URL back to `index.html` — prefer the default path strategy unless you have that constraint.

##==##

# A preview: routing feature functions

`provideRouter()` takes an optional list of **feature functions** that tune how routing behaves — you'll meet several of these later in the training:

<br/>

- **withHashLocation**: switches to hash-based URLs<br/><br/>
- **withRouterConfig**: tunes navigation options (e.g. how query params are handled)<br/><br/>
- **withDebugTracing**: logs every internal navigation event, handy while debugging<br/><br/>
- **withComponentInputBinding**: binds route parameters straight onto component `input()`s — no more manual `ActivatedRoute` reading (coming up when we build the person-detail page)<br/><br/>
- **withNavigationErrorHandler**: a hook to react to failed navigations
