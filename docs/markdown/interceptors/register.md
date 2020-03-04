<!-- .slide: class="sfeir-basic-slide with-code" -->
# Enregistrer son interceptor
<br><br>
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
Notes
- le multi permet d'enregistrer plusieurs interceptors
- les interceptors s'executent dans l'ordre de register
