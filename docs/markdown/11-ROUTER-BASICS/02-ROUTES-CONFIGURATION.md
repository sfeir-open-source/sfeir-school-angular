<!-- .slide: class="with-code inconsolata" -->

# A route table: `Routes`

The Router's whole job is: match the current URL against a list of **routes**, then render the component tied to the match — instead of a component hardcoding what it shows.

<br/>

```typescript
// app.route.ts
import { Routes } from '@angular/router';
import { Home } from './feature/home/home';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
];
```

<!-- .element: class="big-code" -->

Notes:

- `Routes` is just an array type — each entry is a plain object describing one route.
- Order matters: the Router walks the array top to bottom and stops at the first match.

##==##

# Anatomy of a route

<br/><br/>

- **path**: the route's URL segment (e.g. `people`, `people/:id`) — never starts with a leading `/`<br/><br/>
- **component**: the component to render when this route matches (e.g. `Home`)<br/><br/>
- **redirectTo**: the URL fragment to redirect the current route to (e.g. `/home`)<br/><br/>
- **pathMatch**: the redirect matching strategy — `full` or `prefix`
  - `full`: the **entire** remaining URL must match
  - `prefix` (default): matches as soon as the URL **starts with** this path

##==##

<!-- .slide: class="with-code inconsolata" -->

# Why `pathMatch: 'full'` matters here

Without it, an empty-path route redirects on **every** URL — because every URL "starts with" an empty string:

<br/>

```typescript
// ❌ redirects ANY route to /home, forever
{ path: '', redirectTo: '/home' }

// ✅ only redirects when the URL is EXACTLY empty
{ path: '', redirectTo: '/home', pathMatch: 'full' }
```

<!-- .element: class="big-code" -->

<br/>

> This is exactly the redirect entry you'll write in `apps/09-router`: land on `/`, get sent to `/home` — and only there.

<!-- .element: class="important center" -->

Notes:

- This is one of the most common Router bugs for newcomers: a redirect route swallowing every other route because `pathMatch` was left out.

##==##

# Advanced route options (for later)

Other configuration options exist on a route entry, useful once your app grows beyond static components:

<br/>

- **children**: an array of nested sub-routes<br/><br/>
- **data**: static data attached to the route, read via `ActivatedRoute`<br/><br/>
- **canActivate** / **canDeactivate**: guard functions that allow or block entering/leaving a route<br/><br/>
- **resolve**: fetch data **before** the route activates<br/><br/>
- **outlet**: name a secondary outlet to render into

<br/>

> Guards and resolvers are covered in depth later in the training — for now, focus on `path`/`component`/`redirectTo`.
