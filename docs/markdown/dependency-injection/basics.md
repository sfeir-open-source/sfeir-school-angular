<!-- .slide: class="with-code inconsolata" -->
# Principle: Dependency Injection

- Development pattern where a class is <b>provided</b> with other classes or objects (called dependencies) from an <b>external</b> source rather than instantiating them itself.
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

- In Angular, dependencies declared in a specific class are made available upon <b>instantiation</b> of that class. <br></br>
```typescript
import { EngineService, TiresService, DoorsService } from './shared';
 @Component({...})
 class Car {
   constructor(
       public engine: EngineService,
       public tires: TiresService,
       public doors: DoorsService
   ) {}
}
```
<!-- .element: class="big-code" -->
