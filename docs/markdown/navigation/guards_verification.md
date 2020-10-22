<!-- .slide -->
# Fonctionnement des guards de "vérification"

- Peut renvoyer un observable, une promesse ou encore un boolean<br><br>
- Un guard est un service classique<br><br>
- Si true alors on navigue vers l'url demandée<br><br>
- Si false on ne navigue pas vers l'url demandé

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant
```typescript
@Injectable({
  providedIn: CoreModule,
})
export class LoginGuards implements CanLoad {
  constructor(private readonly authentificationService: AuthentificationService, private readonly router: Router) {}
  canLoad(next: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.verifyToken();
  }
  verifyToken(): Observable<boolean> {
    return this.authentificationService.verifyToken()
      .pipe(
        map(() => true),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        }),
      );
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant<br>

Une fois créé, le guard s'enregistre de la manière suivante dans le tableau de route
<br><br>

```typescript
{ path: 'dashboard', canLoad: [LoginGuards], loadChildren: () =>
    import('app/feature/dashboard/dashboard.module').then(m => m.DashboardModule)
}
```
<!-- .element: class="big-code" -->
