<!-- .slide: class="sfeir-basic-slide with-code" -->
# Principe
<br>
Pour une classe il y a 3 façons de gérer une dépendance:
<ul>
    <li>L'instancier avec le mot clé <strong>new</strong></li>
    <li>La récupérer de façon définie (variable globale, singleton)</li>
    <li><strong>Se la faire fournir</strong></li>
</ul>
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

<!-- .slide: class="sfeir-basic-slide with-code" -->
# L'injection en Angular (typescript)
<br>
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
