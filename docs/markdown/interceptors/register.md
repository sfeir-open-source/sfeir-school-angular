<!-- .slide: class="with-code inconsolata" -->

# Enregistrer son interceptor

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
@NgModule({
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

<!-- .element: class="big-code" -->

Notes:

-   le multi permet d'enregistrer plusieurs interceptors
-   les interceptors s'executent dans l'ordre de register

##==##

<!-- .slide: class="with-code inconsolata" -->

# Enregistrer son interceptor sans module

- Pour des interceptors sous forme de fonctions <br/>

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors[AuthorizationInterceptor])]
});
```
<!-- .element: class="big-code" -->

##==##

# Enregistrer son interceptor sans module

- Pour des interceptors sous forme de classes <br/>

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptorsFromDi())]
});
```
<!-- .element: class="big-code" -->
