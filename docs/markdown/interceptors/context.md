# Contexte d'un interceptor
<br/><br/>

- Notion introduite avec la version 12 d'Angular <br/><br/>
- Passer des metadata à un interceptor<br/><br/>
- Plus de hack<br/><br/>
- __Exemple__ dire qu'une requête est 'cachable'

##==##

# Propriété du contexte
<br/><br/>

- mutable<br/><br/>
- partagé entre les différentes requêtes clonées
 
##==##

<!-- .slide: class="with-code inconsolata" -->
# Un contexte est un simple token
<br/><br/>

```typescript
export const CACHABLE = new  HttpContextToken<boolean>(() => false);
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Modifier le contexte

__La modification d'un contexte ou le setter se fait à l'aide de la classe HttpContext__
<br/><br/>

```typescript
new HttpContext().set(CACHABLE, true)
``` 
<!-- .element: class="medium-code" -->


```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly http: HttpClient) {}

   getUser(): Observable<User> {
    return this.http.get<User>(url, { context: new HttpContext().set(CACHABLE, true) })
  }
}
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Récupérer le contexte dans notre interceptor


```typescript
export class CacheInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | User> {
    if (req.context.get(CACHABLE) === true) {
      return of(new HttpResponse({ status: 200, body: MOCK_PERSON }));
    }
    return next.handle(req);
  }
}
```
<!-- .element: class="big-code" -->

##==##

# La classe HttpContext

- __set__ : permet de setter un token du contexte<br/><br/>
- __get__ : récupère la valeur du token du contexte<br/><br/>
- __delete__ : supprime le token du contexte<br/><br/>
- __keys__ : récupère tous les tokens du contexte<br/><br/>

