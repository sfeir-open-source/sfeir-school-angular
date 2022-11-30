<!-- .slide-->

# Interceptors: Définition

-   Intercepte une requête<br/><br/>
-   Renvoie la requête retravaillée<br/><br/>
-   Service Angular implémentant HttpInterceptor<br/><br/>
-   S'exécute pour chaque requête

##==##

<!-- .slide: class="with-code inconsolata" -->

# Interceptors: Exemple

```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
    }
}
```
<!-- .element: class="big-code" -->

<br/><br/>

-   Si l'on souhaite modifier la requête partante, il faut cloner la requête à l'aide de la méthode clone (HttpRequest)
-   Si l'on souhaite modifier la réponse, pensez à utiliser les Observables et `instanceOf`
