# How prefetching guards work

- Optimize page rendering<br/><br/>
- Returns an Observable, a Promise, or raw data<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to write a resolver since v14

<br/><br/><br/>

```typescript
export const userResolver: ResolveFn<User[]> = (route, state) => {
  return inject(UserService).getUsers();
};
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" data-type-show="on-stage" -->

# How to write a resolver before v14

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

<!-- .slide: class="with-code inconsolata" -->

# How to register a resolver

```typescript
export const APP_ROUTES: Routes = [
  {
    path: 'users',
    component: TopComponent,
    resolve: {
      users: userResolver,
    },
  },
];
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Retrieve the resolved data in the component

```typescript
@Component({ ... })
class UsersComponent implements OnInit {
  private route = inject(ActivatedRoute);
  users = toSignal(this.route.data.pipe(map(data => data.users)), { sync: true});
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Retrieve the resolved data thanks to router feature

- Since v14, router have a new feature (**withComponentInputBinding**) that allows to retrieve resolved data, params and query params in the component
  thanks to the **input** property. <br/><br/>
- name of the input property is the same as the name of the resolver, params or query params.<br/><br/>

```typescript
@Component({ ... })
class UsersComponent implements OnInit {
  users = input.required<User[]>();
}
```

<!-- .element: class="big-code" -->
