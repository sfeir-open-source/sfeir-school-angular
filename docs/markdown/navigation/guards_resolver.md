<!-- .slide: class="sfeir-basic-slide" -->
# Fonctionnement des guards de préfetching
<br><br>
- Optimiser le rendu de page<br><br>
- Renvoie un observable, une promesse ou des données bruts<br><br>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Un exemple plus parlant (le résolver définition)
<br><br>
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

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Un exemple plus parlant (enregistrement du resolver)
<br><br>
```typescript
{ path: 'users', component: TopComponent, resolve: { users: UserResolver } }
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Un exemple plus parlant (utilisation dans le composant)
<br><br>
```typescript
@Component({ ... })
class UsersComponent implements ngOnInit {
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe((data: { users: User[] } => this.users = data.users);
    }
}
```
<!-- .element: class="big-code" -->
