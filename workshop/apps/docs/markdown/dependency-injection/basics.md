<!-- .slide: class="with-code inconsolata" -->
# Principe: Injection de dépendances

- Pattern de développement pour qu’une classe <b>se fasse fournir</b> d’autres classes ou objets (appelés dépendances) de manière <b>externe</b> plutôt que de les instancier par elle-même.
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
# L'injection en Angular (TypeScript)

- Dans Angular, les dépendances déclarées dans une classe spécifique sont mises à disposition lors de <b>l'instanciation</b> de cette classe. <br></br>
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
