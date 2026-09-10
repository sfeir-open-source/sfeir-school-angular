<!-- .slide: class="with-code inconsolata" -->

# Principle: Dependency Injection

A class is **provided** with its dependencies from an **external** source, rather than instantiating them itself:

<br/>

```typescript
// Without DI: the class controls its own dependencies
class Car {
  constructor() {
    this.engine = new Engine();
    this.tires = Tires.getInstance();
    this.doors = app.get('doors');
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Angular does this for you, on instantiation

```typescript
// Historical: constructor parameters
@Component({...})
class Car {
  constructor(
    public engine: EngineService,
    private readonly tires: TiresService,
    private doors: DoorsService,
  ) {}
}
```

<!-- .element: class="medium-code" -->

```typescript
// Modern: inject()
@Component({ selector: 'sfeir-app' })
export class Car {
  private readonly engine = inject(EngineService);
  private tires = inject(TiresService);
  public doors = inject(DoorsService);
}
```

<!-- .element: class="medium-code" -->

Notes:

- Same mechanism as `People` in `07-provider` — just with three dependencies instead of one. The injector doesn't care how many; it resolves each one independently.

##==##

<!-- .slide -->

# The 3 concepts behind every injection

- The **Injector** <br/><br/>
- The **DI Token** <br/><br/>
- The **Provider**

##==##

# The Injector

- Creates instances of dependencies, with the help of **Providers** <br/><br/>
- Keeps instances in its own **cache** (this is what makes a service a singleton _within_ a given injector) <br/><br/>
- **Makes available** the dependencies to the classes that request them

##==##

# The Injector: two hierarchies

- You never create an injector yourself — Angular does <br/><br/>
- Two injector hierarchies exist in an application:
  - The **EnvironmentInjector**: created for the whole app (a single "root" one, plus one per lazy-loaded route)
  - The **ElementInjector**: created implicitly for each component <br/><br/>
- Each injector may (or may not) hold a singleton of a dependency, and can inject that instance into several components or services

##==##

# The DI Token

- **Identifies** a dependency — think of it as a **key** <br/><br/>
- When an injection is requested, the injector uses the token to check whether it has (or can create) a matching dependency — think **key/value**

##==##

# The Provider

- Defines **how** to obtain a dependency associated with a DI Token <br/><br/>
- A provider is registered on **one** injector, which uses it to create the dependency it's associated with

##==##

# How to configure these 3 concepts

- Injector & Provider:
  - `providedIn` on `@Injectable`, or the `factory`/`autoProvided` options on `@Service`
  - `providers: []` on `@Component` / `@Directive` (an `@NgModule`, in legacy code) <br/><br/>
- Token: implicit almost all the time — or explicit via `InjectionToken` + `@Inject`

##==##

<!-- .slide: class="with-code inconsolata" -->

# The root `EnvironmentInjector`

Every application has one `EnvironmentInjector` called **`root`**, at the top of the hierarchy:

<br/>

```typescript
@Injectable({
  providedIn: 'root', // <- provides this service in the root EnvironmentInjector
})
export class ItemService {
  name = 'telephone';
}
```

<!-- .element: class="big-code" -->

```typescript
// equivalent, modern syntax
@Service()
export class ItemService {
  name = 'telephone';
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Scoping a provider to part of the app

```typescript
// Registered on the root EnvironmentInjector — available everywhere
bootstrapApplication(App, { providers: [ItemService] });
```

<!-- .element: class="medium-code" -->

```typescript
// Registered on a route's EnvironmentInjector — only available to
// UserComponent and AdminComponent, and destroyed when the user
// navigates away from these routes
const ROUTES = [
  {
    path: 'user',
    component: UserComponent,
    providers: [ItemService],
    children: [{ path: 'admin', component: AdminComponent }],
  },
];
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

## `ElementInjector` hierarchy

![](assets/images/school/dependency-injection/DI-parent.png 'center h-450')

##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/>

```typescript
@Component({
  selector: 'parent',
  templateUrl: 'parent.html',
  providers: [SimpleService], // scoped to this component and its children
})
export class Parent {}
```

<!-- .element: class="medium-code" -->

Notes:

- Every component gets its own `ElementInjector`, forming a tree that mirrors the component tree itself. A provider on `@Component({ providers: [...] })` creates a **new instance** for that component and everything nested inside it — unlike `providedIn: 'root'`, which is a single instance for the whole app.

##++##

##==##

<!-- .slide -->

# `providers: []` — a shortcut

```typescript
providers: [MyService];
```

is exactly equivalent to:

```typescript
providers: [{ provide: MyService, useClass: MyService }];
```

<br/>

> "Provide `MyService`" really means "when someone asks for the token `MyService`, give them an instance built with `useClass: MyService`". The array-of-classes shorthand just hides this for the common case.
