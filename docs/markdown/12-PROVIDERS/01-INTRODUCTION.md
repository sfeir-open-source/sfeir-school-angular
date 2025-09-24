<!-- .slide: class="with-code inconsolata" -->

# What is a Service?

- An exported class
- An <b>@Injectable</b> decorator

```typescript
// The modern way to create a singleton service
@Injectable({
  providedIn: 'root', // Registers the service at the application root
})
export class TodoService {
  private name = 'Hello';

  getName() {
    return this.name;
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- Using `providedIn: 'root'` makes the service available throughout the application and allows it to be tree-shakable, meaning it will be removed from the final bundle if not used.
- This is the recommended way to provide singleton services since Angular 6.

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Using Your Service Globally

```typescript
// todo.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private name = 'Hello';

  getName() {
    return this.name;
  }
}
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/>

```typescript
// app.module.ts
import { TodoService, AppComponent } from './shared/';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  providers: [], // No need to provide the service here, it's already provided in the root
})
export class AppModule {}
```

<!-- .element: class="medium-code" -->

<br>

```typescript
// main.ts
// No need to provide the service here, it's already provided in the root;
bootstrapApplication(AppComponent, { providers: [] });
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Using a Service Locally

```typescript
// todo.service.ts
@Injectable()
export class TodoService {
  get name(): string {
    return 'SFEIR';
  }
}
```

<!-- .element: class="big-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/>

```typescript
// app.component.ts
@Component({
  providers: [TodoService], // Provides a new instance for this component and its children
})
export class AppComponent {
  private readonly todoService = inject(TodoService);

  constructor() {
    console.log(this.todoService.name); // SFEIR;
  }
}
```

<!-- .element: class="big-code" -->

##++##
