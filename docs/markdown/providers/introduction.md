<!-- .slide: class="with-code inconsolata" -->
# Qu'est ce qu'un Service
- Une classe exportée
- une annotation <b>@Injectable</b><br><br>

```typescript
@Injectable({
	provideIn: AdminModule
})
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
- Ici on enregistre directement dans notre module AdminModule (penser à l'import sinon il y aura une erreur)
- Angular 9 propose le provideIn: any qui enregistre un service par module lazy loader (attention dans ce cas plusieurs instances)

##==##
<!-- .slide: class="two-column-layout" -->
# Utiliser son service (en global)
##--##
![h-600](assets/images/school/providers/service.png)
##--##
![h-600](assets/images/school/providers/service_register.png)
![h-400 center](assets/images/school/providers/service_injection.png)

##==##
<!-- .slide: class="two-column-layout" -->
# Utiliser son service en local
##--##
<!-- .slide: class="with-code inconsolata" -->
<br><br><br>

```typescript
@Injectable()
class TodoService {
  constructor() { }
  
  get Name(): string {
    return 'SFEIR';
  }
}
```
<!-- .element: class="big-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->
<br><br><br>

```typescript
@Component({
  ...
  providers: [TodoService]
})
export class AppComponent {
  constructor(private readonly todoService: TodoService) {
    console.info(todoService.name); // SFEIR
  }
}
```
<!-- .element: class="big-code" -->

