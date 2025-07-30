<!-- .slide -->

# How "verification" guards work

- Can return an Observable, a Promise, or a boolean<br><br>
- A guard is a standard service<br><br>
- If true, navigation to the requested URL proceeds<br><br>
- If false, navigation to the requested URL is blocked

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to write a guard since v14

```typescript
export function loginGuard(): CanMatchFn {
  return (route: Route, segments: UrlSegment[]) => {
    const authentificationService = inject(AuthentificationService);
    const router = inject(Router);
    return authentificationService.verifyToken().pipe(
      map(() => true),
      catchError(() => {
        router.navigate(['/login']);
        return of(false);
      }),
    );
  };
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to write a guard before v14 (deprecated)

```typescript
@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanMatch {
  constructor(
    private readonly authentificationService: AuthentificationService,
    private readonly router: Router,
  ) {}
  canMatch(next: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.verifyToken();
  }
  verifyToken(): Observable<boolean> {
    return this.authentificationService.verifyToken().pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }
}
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to register a guard

Once created, the guard is registered in the route array as follows:
<br><br>

```typescript
export const APP_ROUTES: Routes = [
  {
    path: 'dashboard',
    canMatch: [loginGuard],
    loadChildren: () => import('app/feature/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
];
```

<!-- .element: class="big-code" -->
