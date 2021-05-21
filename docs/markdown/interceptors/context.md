# Context d'un interceptor
<br><br>

- Notion introduite avec la version 12 d'Angular <br><br>
- Passer des metadatas à un interceptor<br><br>
- Plus de hack<br><br>
- __Exemple__ dire qu'une requête est 'cachable'

##==##

# Propriété du context
<br><br>

- mutable<br><br>
- partagé entre les différentes requêtes clonées
 
##==##

<!-- .slide: class="with-code inconsolata" -->
# Un context est un simple token
<br><br>

```typescript
export const CACHABLE = new  HttpContextToken<boolean>(() => false);
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Modifier le context

__La modification d'un context ou le setter se fait à l'aide de la classe HttpContext__

<br><br>

```typescript
new HttpContext().set(CACHABLE, true)
``` 
<!-- .element: class="big-code" -->
<br><br>

```typescript
@Injectable({ providedIn: CoreModule })
export class UserService {
  constructor(private readonly http: HttpClient) {}

   getUser(): Observable<User> {
    return this.http.get<User>(url, { context: new HttpContext().set(CACHABLE, true) })
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Récupérer le context dans notre interceptor

<br><br>

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
<br><br>

- __set__ : permet de setter un token du context<br><br>
- __get__ : récupère la valeur du token du context <br><br>
- __delete__ : supprime le token du context<br><br>
- __keys__ : récupère toutes les tokens du context<br><br>

