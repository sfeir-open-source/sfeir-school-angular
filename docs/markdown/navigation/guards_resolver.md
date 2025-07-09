<!-- .slide: class="sfeir-basic-slide" -->
# How prefetching guards work

- Optimize page rendering<br/><br/>
- Returns an Observable, a Promise, or raw data<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->
# A more telling example (deprecated)

```typescript
@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User[]> {
  constructor(private readonly userService: UserService) {}

  resolve(): Observable<User[]> {
    return this.userService.getUsers();
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata" -->
# A more telling example

<br/><br/><br/>

```typescript
export const userResolver: ResolveFn<User[]> = (route, state) => {
  return inject(UserService).getUsers();
};
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# A more telling example (registering the resolver)

```typescript
export const APP_ROUTES: Routes = [
    { 
        path: 'users', 
        component: TopComponent, 
        resolve: { 
            users: userResolver 
        } 
    }
];
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# A more telling example (using it in the component)

```typescript
@Component({ ... })
class UsersComponent implements OnInit {
  users: User[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { users: User[] }) => this.users = data.users);
  }
}
```
<!-- .element: class="big-code" -->
