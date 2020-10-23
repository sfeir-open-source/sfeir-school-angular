<!-- .slide: class="sfeir-basic-slide" -->
# Fonctionnement des guards de préfetching<br>

- Optimiser le rendu de page<br><br>
- Renvoie un observable, une promesse ou des données bruts<br><br>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant (le résolver définition)

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

<!-- .slide: class="with-code inconsolata" -->
# Un exemple plus parlant (enregistrement du resolver)

```typescript
{ path: 'users', component: TopComponent, resolve: { users: UserResolver } }
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
