<!-- .slide: class="with-code inconsolata" -->

# Setting up SSR in Angular

## For new projects:

```bash
# Create a new Angular project with SSR enabled
ng new my-app --ssr
```

## For existing projects:

```bash
# Add SSR to an existing Angular project
ng add @angular/ssr
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# What does `ng add @angular/ssr` do?

- Creates `app.config.server.ts` for server configuration
- Adds `server.ts` for the Express server setup
- Updates `angular.json` with SSR build configurations
- Modifies `app.config.ts` to support hydration
- Creates build scripts for server-side rendering

```typescript
// app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Rendering Modes: per-route control

Angular SSR supports three rendering modes, chosen **per route**:

## 1. Client-Side Rendering (CSR)

```typescript
import { RenderMode } from '@angular/ssr';

export default [{ path: '/dashboard', renderMode: RenderMode.Client }] satisfies ServerRoute[];
```

<!-- .element: class="small-code" -->

## 2. Server-Side Rendering (SSR)

```typescript
export default [{ path: '/products/:id', renderMode: RenderMode.Server }] satisfies ServerRoute[];
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Rendering Modes: pre-rendering (SSG)

## 3. Pre-rendering / Static Site Generation (SSG)

```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

export default [
  { path: '/about', renderMode: RenderMode.Prerender },
  {
    path: '/blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Fetch blog post slugs at build time
      const posts = await fetch('/api/posts').then(r => r.json());
      return posts.map((post: any) => ({ slug: post.slug }));
    },
  },
] satisfies ServerRoute[];
```

<!-- .element: class="small-code" -->

Mixing modes per route is exactly what "hybrid rendering" means in practice: a static `/about`, a server-rendered `/products/:id`, a client-only `/dashboard`.
