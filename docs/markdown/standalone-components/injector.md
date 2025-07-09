# Injection in Angular 14+

Without modules, the concept of a `ModuleInjector` no longer exists.<br/><br/>

- **Element Injector**<br/><br/>
- **Environment Injector**

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Environment Injector for a set of routes

Without modules, registering a service for a specific feature is done differently.<br/><br/>
This is where the concept of an **Environment Injector** becomes essential.<br/><br/>

```typescript
export const CHILD_ROUTES: Routes = [
  {
    path: '',
    component: UserComponent,
    providers: [UserService], // Provided for this route and its children
    children: [
      {path: 'admin', component: AdminComponent},
      {path: 'details', component: DetailsComponent}
    ]
  }
];
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Ensuring a provider is only injected in an Environment Injector

This feature ensures that a provider is only registered in an environment injector, not on a component.<br/><br/>

```typescript
import { makeEnvironmentProviders } from '@angular/core';

export const loggerServiceProvider = makeEnvironmentProviders([LoggerService]);
```
<!-- .element: class="big-code"-->

<br/><br/>

This way, Angular will throw an error if `loggerServiceProvider` is registered in a component's `providers` array, for example.

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->

# Injection outside of its context

Angular provides an `inject()` function that could previously only be used within an injection context.<br/><br/>

```typescript
import { inject, NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const httpClient = inject(HttpClient);
        return () => httpClient.get('/api/init');
      },
      multi: true
    }
  ]
})
export class AppModule {}
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Injection outside of its context

With Angular 14+, you can also use this function during the **construction** of a component.<br/><br/>

```typescript
import { inject, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
})
export class TodoDetailsComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
}
```

<!-- .element: class="big-code"-->
**Note:** In this example, there's no major advantage to using this syntax, but it lays the foundation for understanding composition with injection.

##==##

<!-- .slide: class="with-code inconsolata" -->
# Question: Is it possible to inject at runtime?

- Requires injecting the parent `Injector`.
- Cannot be asynchronous.

```typescript
import { Component, inject, Injector, runInInjectionContext } from '@angular/core';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
})
export class TodoDetailsComponent {
  readonly #injector = inject(Injector);

  addTodo(): void {
    runInInjectionContext(this.#injector, () => {
      const todoService = inject(TodoService);
      todoService.addTodo();
    });
  }
}
```
<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Composing with injection

The ability to use the `inject` function outside of its traditional context impacts our application design.<br/><br/>

- **Composition**: We can create reusable, injectable functions.<br/><br/>
- **Runtime Injection**: Direct injection is not available at runtime, but can be achieved with `runInInjectionContext`.

##==##

<!-- .slide: class="two-column-layout" -->
# An example of composition

##--##

<!-- .slide: class="with-code inconsolata" -->
<br/><br/>

```typescript
import { inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function getParam$<T>(paramName: string): Observable<T> {
  return inject(ActivatedRoute)
    .paramMap
    .pipe(
      map((params: ParamMap) => params.get(paramName) as T)
    );
}
```

<!-- .element: class="big-code" -->

##--##

<!-- .slide: class="with-code inconsolata" -->
<br/><br/>

```typescript
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { getParam$ } from './route-params';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
})
export class TodoDetailsComponent {
  todoId$: Observable<string> = getParam$<string>('id');
}
```

<!-- .element: class="big-code"-->
