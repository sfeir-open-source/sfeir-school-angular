<!-- .slide: class="sfeir-basic-slide" -->
# Interceptors: Définitions
<br><br>
- Intercepte une requête
- Renvoie la requête retravaillée
- Service Angular implémentant HttpInterceptor
- S'exécute pour chaque requête

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Interceptors: Exemple
<br>
```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
      return next.handle(req);
  } 
}
```
<!-- .element: class="big-code" -->
<br><br>
 - Si l'on souhaite modifier la requête partante, il faut cloner la reqête à l'aide de la méthode clone (HttpRequest)
 - Si l'on souhaite modifier la reponse, pensez à utiliser les observables et instanceOf
