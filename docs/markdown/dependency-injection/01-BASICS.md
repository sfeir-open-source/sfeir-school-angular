<!-- .slide: class="with-code inconsolata" -->

# Principle: Dependency Injection

- Development pattern where a class is **provided** with other classes or objects (called dependencies) from an <b>external</b> source rather than instantiating them itself.
  <br></br>

```typescript
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

# Injection in Angular (TypeScript)

- In Angular, dependencies declared in a specific class are made available upon **instantiation** of that class. <br></br>

```typescript
import { EngineService, TiresService, DoorsService } from './shared';
 @Component({...})
 class Car {
   constructor(
       public engine: EngineService,
       private readonly tires: TiresService,
       private doors: DoorsService
   ) {}
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Injection in Angular: Modern way

<br/><br/>

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
})
export class App {
  private readonly engine = inject(EngineService);
  private tires = inject(TiresService);
  public doors = inject(DoorsService);
}
```

<!-- .element: class="big-code" -->
