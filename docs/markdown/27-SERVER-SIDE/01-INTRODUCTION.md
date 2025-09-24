<!-- .slide -->

# Angular Server-Side Rendering (SSR)

## Introduction to Hybrid Rendering

![](assets/images/school/server-side/schema-ssr.png 'h-900 center')

##==##

# What is Server-Side Rendering?

**Server-Side Rendering (SSR)** is a technique where Angular applications are rendered on the server before being sent to the client.

<br>

**Key Benefits:**

- **Faster initial page loads** - HTML is rendered on the server
- **Better SEO** - Search engines receive fully rendered HTML
- **Improved performance** on mobile devices and slow connections
- **Better Core Web Vitals** - Faster First Contentful Paint (FCP)

##==##

# Client-Side vs Server-Side Rendering

| **Client-Side Rendering (CSR)** | **Server-Side Rendering (SSR)** |
| ------------------------------- | ------------------------------- |
| JavaScript runs in browser      | JavaScript runs on server       |
| Slower initial load             | Faster initial load             |
| Better for interactive apps     | Better for content-heavy pages  |
| Simple development model        | Requires server-compatible code |
| Poor SEO by default             | Excellent SEO                   |

##==##

# What is Hybrid Rendering?

**Hybrid rendering** combines the benefits of:

- **Server-Side Rendering (SSR)** - Dynamic content rendered on server
- **Static Site Generation (SSG)** - Pre-rendered at build time
- **Client-Side Rendering (CSR)** - Interactive features in browser

<br/><br/>

This gives you **fine-grained control** over how different parts of your app are rendered for optimal user experience.

##==##

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
- Adds `server.ts` file for Express server setup
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

# Rendering Modes

Angular SSR supports three rendering modes:

## 1. Client-Side Rendering (CSR)

```typescript
import { RenderMode } from '@angular/ssr';

export default [
  {
    path: '/dashboard',
    renderMode: RenderMode.Client,
  },
] satisfies ServerRoute[];
```

<!-- .element: class="small-code" -->

## 2. Server-Side Rendering (SSR)

```typescript
export default [
  {
    path: '/products/:id',
    renderMode: RenderMode.Server,
  },
] satisfies ServerRoute[];
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Rendering Modes (continued)

## 3. Pre-rendering / Static Site Generation (SSG)

```typescript
import { RenderMode, ServerRoute } from '@angular/ssr';

export default [
  {
    path: '/about',
    renderMode: RenderMode.Prerender,
  },
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

##==##

<!-- .slide: class="with-code inconsolata" -->

# Server-Compatible Components

Some browser APIs are not available on the server:

❌ **Avoid these on server:**

- `window`, `document`, `navigator`, `location`
- DOM manipulation in constructors
- Browser-specific APIs

✅ **Use lifecycle hooks for browser-only code:**

```typescript
import { Component, afterNextRender, afterEveryRender } from '@angular/core';

@Component({
  selector: 'app-browser-feature',
  template: `<div #content>Content here</div>`,
})
export class BrowserFeature {
  constructor() {
    // ✅ Safe - only runs in browser
    afterNextRender(() => {
      console.log('Window width:', window.innerWidth);
      document.title = 'Updated Title';
    });
  }
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Accessing Request and Response

Angular provides DI tokens for server-side information:

```typescript
import { Component, inject } from '@angular/core';
import { REQUEST, RESPONSE_INIT, REQUEST_CONTEXT } from '@angular/core';

@Component({
  selector: 'app-server-info',
  templateUrl: './server-info.html',
})
export class ServerInfo {
  private request = inject(REQUEST);
  private responseInit = inject(RESPONSE_INIT);
  requestUrl = this.request?.url || 'Not available';
  userAgent = this.request?.headers.get('user-agent') || 'Unknown';

  constructor() {
    // Set custom response headers
    if (this.responseInit) {
      this.responseInit.headers = {
        ...this.responseInit.headers,
        'X-Custom-Header': 'SSR-Rendered',
      };
    }
  }
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# HTTP Client with SSR

HTTP requests work seamlessly with SSR:

```typescript
import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  template: `
    @for (user of usersResource.value(); track user.id) {
      <div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    }
  `,
})
export class UserList {
  // This HTTP request will be made on the server during SSR
  usersResource = httpResource<User[]>(() => '/api/users');
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Building and Running SSR App

## Development with SSR:

```bash
ng serve
# Runs with SSR enabled in development
```

## Building for production:

```bash
ng build
# Creates both client and server bundles
```

## Running the production server:

```bash
npm run serve:ssr
# Starts the Express server with SSR
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Hydration in Angular

**Hydration** makes server-rendered content interactive:

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideClientHydration(), // Enables hydration
  ],
};
```

**Benefits:**

- Preserves server-rendered DOM
- Avoids content flickering
- Faster time to interactivity
- Better user experience

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Performance Best Practices

## 1. Use appropriate rendering modes:

```typescript
export default [
  { path: '/', renderMode: RenderMode.Prerender }, // Static homepage
  { path: '/products', renderMode: RenderMode.Server }, // Dynamic catalog
  { path: '/dashboard', renderMode: RenderMode.Client }, // User-specific
] satisfies ServerRoute[];
```

## 2. Optimize server-side data fetching:

```typescript
@Component({...})
export class ProductComponent {
  constructor() {
    // Fetch data once on server, reuse on client
    this.product$ = this.http.get(`/api/products/${this.id}`);
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Common Pitfalls and Solutions

## Problem: Using browser APIs in constructor

```typescript
// DON'T DO THIS
@Component({...})
export class BadComponent {
  constructor() {
    localStorage.setItem('key', 'value'); // Error on server!
  }
}
```

<!-- .element: class="small-code" -->

## Solution: Use afterNextRender

```typescript
// DO THIS INSTEAD
@Component({...})
export class GoodComponent {
  constructor() {
    afterNextRender(() => {
      localStorage.setItem('key', 'value'); // Safe!
    });
  }
}
```

<!-- .element: class="small-code" -->
