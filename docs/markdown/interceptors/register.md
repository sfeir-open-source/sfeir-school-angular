<!-- .slide: class="with-code inconsolata" -->

# Registering Functional Interceptors

In standalone applications, you register functional interceptors in your application config using `provideHttpClient` and `withInterceptors`.

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { loggingInterceptor } from './logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Interceptors are executed in the order they are provided.
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor])),
  ],
};
```
<!-- .element: class="medium-code" -->

Notes:
- Interceptors are executed in the order they appear in the array.

##==##

<!-- .slide: class="with-code inconsolata" -->
# Registering Class-Based Interceptors

While functional interceptors are preferred, you can still use class-based interceptors in both standalone and module-based apps.

**1. Standalone Apps:**
Use `withInterceptorsFromDi()` and provide the class.

```typescript
// app.config.ts
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyLegacyInterceptor } from './my-legacy.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: MyLegacyInterceptor, multi: true },
  ],
};
```

**2. Module-Based Apps (Legacy):**

```typescript
// app.module.ts
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyLegacyInterceptor, multi: true },
  ],
})
export class AppModule { }
```
<!-- .element: class="medium-code" -->
