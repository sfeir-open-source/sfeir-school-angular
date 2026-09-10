<!-- .slide: class="with-code inconsolata" -->

# HTTP Client with SSR

HTTP requests work seamlessly with SSR — including `httpResource`, from the Http chapter:

```typescript
import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  template: `
    @for (user of usersResource.value(); track user.id) {
      <div><h3>{{ user.name }}</h3><p>{{ user.email }}</p></div>
    }
  `,
})
export class UserList {
  // This HTTP request is made on the server during SSR
  usersResource = httpResource<User[]>(() => '/api/users');
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Building and running the SSR app

```bash
ng serve
# Runs with SSR enabled in development

ng build
# Creates both client and server bundles

npm run serve:ssr
# Starts the Express server with SSR
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Hydration: making server-rendered HTML interactive

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

<!-- .element: class="big-code" -->

**Benefits**: preserves the server-rendered DOM, avoids content flickering, faster time to interactivity, better user experience — without hydration, Angular would throw away the server's HTML and re-render everything from scratch on the client.
