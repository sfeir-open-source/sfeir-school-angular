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

# Registering Class-Based Interceptors in standalone application

While functional interceptors are preferred, you can still use class-based interceptors in both standalone app.

Use `withInterceptorsFromDi()` and provide the class. <br/><br/>

```typescript
// app.config.ts
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyLegacyInterceptor } from './my-legacy.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptorsFromDi()), { provide: HTTP_INTERCEPTORS, useClass: MyLegacyInterceptor, multi: true }],
};
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Registering Class-Based Interceptors in module-based application

While functional interceptors are preferred, you can still use class-based interceptors in both standalone app.

Use `withInterceptorsFromDi()` and provide the class. <br/><br/>

```typescript
// app.module.ts
@NgModule({
  providers: [provideHttpClient(withInterceptorsFromDi()), { provide: HTTP_INTERCEPTORS, useClass: MyLegacyInterceptor, multi: true }],
})
export class AppModule {}
```

<!-- .element: class="medium-code" -->
