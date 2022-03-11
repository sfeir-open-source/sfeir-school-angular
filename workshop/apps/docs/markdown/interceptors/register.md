<!-- .slide: class="with-code inconsolata" -->

# Enregistrer son interceptor

```typescript
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
@NgModule({
  bootstrap: [AppComponent],
  imports: [...],
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
