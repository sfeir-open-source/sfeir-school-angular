# L'injection en Angular 14

Sans module la notion de moduleInjector n'existe plus <br/><br/>

- __Element Injector__ <br/><br/>
- __Environment Injector__

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# Environment Injector pour un ensemble de routes

Sans module, enregistrer un service uniquement pour une feature ne se fait plus de la même façon.<br/><br/>
C'est ici que la notion d'__environment injector__ prend tout son sens. <br/><br/>

```typescript
export const CHILD_ROUTES = [
  {
    path: '', component: UserComponent, providers: [UserService], children: [
      {path: 'admin', component: AdminComponent},
      {path: 'details', component: DetailsComponent}
    ]
  }
]
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# S'assurer qu'un provider soit injecté uniquement dans un environmentProvider

Cette fonctionnalité pratique permet de s'assurer qu'un provider soit injecté uniquement dans un environmentProvider <br/><br/>

```typescript
import {makeEnvironmentProviders} from '@angular/core'

export const loggerService = makeEnvironmentProviders(LoggerService);
```
<!-- .element: class="big-code"-->

<br/><br/>

Ainsi, Angular lèvera une erreur si loggerService est enregistré dans un composant par exemple

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->

# L'injection hors de son context

Angular fournit une fonction __inject__ que l'on ne pouvait utiliser que dans un context d'injection <br/><br/>

```typescript
import {NgModule} from '@angular/core';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const httpClient = inject(HttpClient);
        return () => httpClient.get()
      }
    }
  ]
})
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="sfeir-basic-slide with-code inconsolata"-->
# L'injection hors de son context

Avec Angular 14 on peut utiliser cette fonction également dans la __construction__ d'un composant <br/><br/>

```typescript
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.less']
})
export class TodoDetailsComponent {
  private readonly router: ActivatedRoute = inject(ActivatedRoute);
}
```

<!-- .element: class="big-code"-->
Notes:
Dans cette exemple il n'y a pas d'avantage à utiliser cette syntax mais il s'agit de faire poser une fondation pour expliquer comment va fonctionner la composition à l'aide de l'injection

##==##

<!-- .slide: class="with-code inconsolata" -->
# Question, est-il possible d'injecter au runtime ?

- Nécessite d'injecter l'Injector parent
- Ne peut pas être asynchrone

```typescript
import {Injector, runInInjectionContext} from '@angular/core';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.less']
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
# Composons avec l'injection

Le fait de pouvoir utiliser la fonction inject hors de son context a quelques impact dans le design de nos application <br/><br/>

- la composition <br/><br/>
- l'injection n'est pas disponible au runtime <br/><br/>

##==##

<!-- .slide: class="two-column-layout" -->
# Un exemple de composition

##--##

<!-- .slide: class="with-code inconsolata" -->
<br/><br/>

```typescript
export function getParams$<T>(paramName: string): Observable<T> {
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
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.less']
})
export class TodoDetailsComponent {
  todoId$: Observable<string> = getParams$<string>('id');
}
```

<!-- .element: class="big-code"-->
