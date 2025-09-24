# Principle of DI in Angular

- The **3 main concepts** <br/><br/>
  - The Injector <br/><br/>
  - The DI Token (DI: Dependency Injection) <br/><br/>
  - The Provider

##==##

# The Injector

- Responsibilities: <br/><br/>
  - **Create instances** of dependencies. (with the help of **Providers**) <br/><br/>
  - Keep instances of dependencies in its **"cache"** <br/><br/>
  - **Make available** the dependencies to the classes that request them.

##==##

# The Injector

- You don't have to create an injector by yourself <br/><br/>
- There are **2 injector hierarchies** in your application: <br/><br/>
  - the **ModuleInjector**: implicitly created for each module + 1 injector called "root"
  - the **ElementInjector**: implicitly created for each DOM element (component) <br/><br/>
- Each Injector contains (or not) a singleton of a dependency, and can inject this instance into several components or services.

##==##

# The DI Token

- Responsibilities: <br/><br/>
  - Allows to **identify** a dependency. (KEY) <br/><br/>
  - When a dependency injection is requested, the injector will use the token to check if a dependency is available and if it can create it. (<KEY/VALUE>)

##==##

# The Provider

- Responsibilities: <br/><br/>
  - Allows to define <b>how</b> to obtain a dependency associated with a DI Token. <br/><br/>
  - A provider is defined for <b>one</b> injector, and it will be used by the latter to create the dependencies.

##==##

# Principle of DI in Angular

![](../../assets/images/school/dependency-injection/di_working.png 'center h-600')

##==##

# How to configure these 3 concepts

- Injector & Provider:
  - **providedIn** property of the **@Injectable** decorator
  - **providers: []** property of the **@NgModule, @Component, @Directive, @Pipe** decorators <br/><br/>
- Token:
  - implicit (most of the time)
  - or via the **@Inject** decorator

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Injector Types: ModuleInjector

```typescript
@NgModule({
  declarations: [PeopleAppComponent],
  providers: [ItemService],
  bootstrap: [PeopleAppComponent],
})
export class ItemModule {}
```

<!-- .element: class="medium-code" -->

```typescript
import { Injectable } from '@angular/core';
@Injectable()
export class ItemService {
  name = 'telephone';
}
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/>

```typescript
@NgModule({
  declarations: [PeopleAppComponent],
  bootstrap: [PeopleAppComponent],
})
export class ItemModule {}
```

<!-- .element: class="medium-code" -->

```typescript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: ItemModule, // Warning this is deprecated with the new versions of Angular
})
export class ItemService {
  name = 'telephone';
}
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="with-code inconsolata" -->

# Injector Types: EnvironmentInjector

```typescript
/**
 * Here you register the service into the root EnvironmentInjector
 * Items service is available in the whole application
 */
bootstrapApplication(AppComponent, { providers: [ItemService] });
```

<!-- .element: class="medium-code" -->

```typescript
/**
 * Here you register the service into the Routing EnvironmentInjector
 * Items service will be available for the UserComponent, AdminComponent
 * ItemService will be Destroyed when user navigate outside the following routes user and user/admin
 */
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

<!-- .slide: class="with-code inconsolata" -->

# Injector Types: ModuleInjector

For each application, there is an **EnvironmentInjector | ModuleInjector** called <b>'root'</b> at the top of the hierarchy <br/><br/>

```typescript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root', // <--provides this service in the root ModuleInjector
})
export class ItemService {
  name = 'telephone';
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# Injector Types: ElementInjector

## Hierarchy Injection

![](../../assets/images/school/dependency-injection/DI-module.png 'center h-500')
##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/>

```typescript
import { NgModule } from '@angular/core';
@NgModule({
  providers: [SimpleService],
})
export class ItemsModule {
  name = 'telephone';
}
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

## Hierarchy Injection

![](../../assets/images/school/dependency-injection/DI-parent.png 'center h-450')
##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/>

```typescript
@Component({
  selector: 'parent',
  templateUrl: 'parent.component.html',
  styleUrls: ['parent.component.css'],
  providers: [SimpleService],
})
export class Parent {}
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

## Hierarchy Injection

![](../../assets/images/school/dependency-injection/DI-root.png 'center h-500')
##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/>

```typescript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root', // <--provides this service in the root ModuleInjector
})
export class SimpleService {
  name = 'telephone';
}
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="sfeir-basic-slide" -->

# Zoom on `providers = []`

<br/><br/>

- Links **InjectionToken** (token) and a **Factory** <br/><br/>
- Allows decoupling the dependency and its implementation

##==##

<!-- .slide: class="with-code inconsolata" -->

# Zoom on `providers = []`

- This expression is a shortcut:

```typescript
providers: [MyService];
```

<!-- .element: class="big-code" -->

<br/><br/>

- It is equivalent to writing:

```typescript
providers: [{ provide: MyService, useClass: MyService }];
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide -->

# The different types of resolution

- Value <br/><br/>
- Alternative class <br/><br/>
- Aliased classes <br/><br/>
- Factory
