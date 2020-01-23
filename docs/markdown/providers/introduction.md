<!-- .slide: class="sfeir-basic-slide with-code" -->
# Qu'est ce qu'un Service
<ul>
    <li>Une classe exporté</li><br>
    <li>Une annotation <strong>@Injectable</strong></li>
</ul>
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
Notes
- Ici on enregistre directement dans notre module AdminModule (penser à l'import sinon il y aura une erreur)
- Angular 9 propose le provideIn: any qui enregistre un service par module lazy loader (attention dans ce cas plusieurs instances)

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Utiliser son service (en global)
<div class="flew-row center">
    <img alt="h-600" src="assets/images/school/providers/service.png" />
    <img alt="h-600" src="assets/images/school/providers/service_register.png" />
</div>
<img alt="h-400 center" src="assets/images/school/providers/service_injection.png" />


##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Utiliser son service en local
<br>
```typescript
@Injectable()
class TodoService {
  constructor() { }
  
  get Name(): string {
    return 'SFEIR';
  }
}
```
<br>
```typescript
@Component({
  ...
  providers: [TodoService]
})
export class AppComponent { 
  constructor(private readonly todoService: TodoService) { 
    console.log(todoService.name); // SFEIR
  }
}
```

