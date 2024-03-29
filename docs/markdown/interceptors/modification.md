<!-- .slide: class="with-code inconsolata" -->

# Modification de la requête

```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedRequest: HttpRequest<any> = this.req.clone({ setHeaders: { Authorization: 'Bearer Nicolas' } });
        return next.handle(clonedRequest);
    }
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Modification de la réponse

```typescript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(red).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceOf HttpResponse) {
          return event.clone({ body: { ...event.body, name: 'Sfeir' } });
        }
      }),
    );
  }
}
```
<!-- .element: class="big-code" -->

##==##

# Ecriture d'un interceptor sous forme de fonction

<br/><br/>

```typescript
export function AuthorizationInterceptor(
  request: HttpRequest<People | Array<People>>,
  next: HttpHandlerFn
): Observable<HttpEvent<People | Array<People>>> {
  const clonedRequest = request.clone({ setHeaders: { Authorization: 'Sfeir' } });
  return next(clonedRequest) as Observable<HttpEvent<People | Array<People>>>;
}
```
<!-- .element: class="big-code" -->
