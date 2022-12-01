<!-- .slide: class="with-code inconsolata" -->

# Qu'est ce qu'un Service
- Une classe exportée
- Un décorateur <b>@Injectable</b>

```typescript
@Injectable()
export class TodoService {
  constructor() {
    this.name = 'Hello';
  }
  getName() {
    return this.name;
  }
}
```

<!-- .element: class="big-code" -->

Notes:

-   Ici on enregistre directement dans notre module AppModule (penser à l'import sinon il y aura une erreur)
-   Angular 9 propose le providedIn: any qui enregistre un service par module lazy loader (attention dans ce cas plusieurs instances)

##==##

<!-- .slide: class="two-column-layout" -->

# Utiliser son service (en global)

##--##

```typescript
// todo.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {
  name: string;

  constructor() {
      this.name = 'Hello';
  }
  getName() {
      return this.name;
  }
}
```

<!-- .element: class="medium-code" -->


##--##

```typescript
// app.module.ts
import { TodoService, AppComponent } from './shared/';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  providers: [TodoService],
})
export class AppModule {}
```

<!-- .element: class="medium-code" -->


<br>

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { TodoService } from './shared/';

@Component({ ... })
export class AppComponent {
  constructor(private readonly todoService: TodoService) {
    this.name = this.todoService.getName();
  }
}
```

<!-- .element: class="medium-code" -->


##==##

<!-- .slide: class="two-column-layout" -->

# Utiliser son service en local

##--##

<!-- .slide: class="with-code inconsolata" -->

```typescript
// todo.service.ts
@Injectable()
export class TodoService {
  constructor() {}

  get name(): string {
    return 'SFEIR';
  }
}
```

<!-- .element: class="big-code" -->

##--##

<!-- .slide: class="with-code inconsolata" -->

```typescript
// app.component.ts
@Component({
  providers: [TodoService],
})
export class AppComponent {
  constructor(private readonly todoService: TodoService) {
    console.info(todoService.name); // SFEIR
  }
}
```

<!-- .element: class="big-code" -->
      