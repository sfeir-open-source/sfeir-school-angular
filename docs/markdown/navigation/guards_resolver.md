<!-- .slide: class="sfeir-basic-slide" -->
# Fonctionnement des guards de préfetching

- Optimiser le rendu de page<br/><br/>
- Renvoie un Observable, une Promise ou des données br/utes<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant (deprecated)

```typescript
@Injectable({ providedIn: CoreModule })
export class UserResolver implements Resolve<User[]> {
  constructor(private readonly userService: UserService) {}

  resolve() {
    return this.userService.getUsers();
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata" -->
# Un exemple est plus parlant

<br/><br/><br/>

```typescript
export function UserResolver(): Observable<User> {
  return inject(UserService).getUser();
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant (enregistrement du resolver)

```typescript
export const APP_ROUTES: Routes = { path: 'users', component: TopComponent, resolve: { users: UserResolver } }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant (utilisation dans le composant)

```typescript
@Component({ ... })
class UsersComponent implements ngOnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { users: User[] }) => this.users = data.users);
  }
}
```
<!-- .element: class="big-code" -->
