<!-- .slide: class="with-code inconsolata" -->
# Principe
<br>
Pour une classe il y a 3 façons de gérer une dépendance:

- L'instancier avec le mot clé <b>new</b>
- La récupérer de façon définie (variable global, singleton)
- <b>Se la faire forunir</b> <br><br>

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
# L'injection en Angular (typescript)
<br><br>

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
