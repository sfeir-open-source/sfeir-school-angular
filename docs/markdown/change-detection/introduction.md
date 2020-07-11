<!-- .slide -->
# Les Fondements

<br><br>
- Angular lance un changement de détection sur tous les composants (du parents à tous les enfants)<br><br>
- Lancement d'un changement de détection à chaque fois que quelque chose change dans l'app (user event)<br><br>
- Performant mais pour des applications plus complexes, risque de lague.
<br>

##==##

<!-- .slide: class="full-center" -->
# Change Detection Strategy: OnPush
Ne lance un changement de détection uniquement lorsque la référence d'une variable change
<!-- .element: class=ïmportant" -->

##==##

<!-- .slide: class="two-column-layout" -->
# Des exemples
##--##
<!-- .slide: class="with-code inconsolata" -->
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  foods = ['Bacon', 'Lettuce', 'Tomatoes'];
  addFood(food) {
    this.foods.push(food);
  }
}
```
<!-- .element: class="medium-code" -->

<br><br>

```html
<input #newFood type="text" placeholder="Enter a new food">
<button (click)="addFood(newFood.value)">Add food</button>
<app-child [data]="foods"></app-child>
```
<!-- .element: class="medium-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->
```typescript
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
  template: './food-details.component.html'
})
export class ChildComponent {
  @Input() data: string[];
}
``` 
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="two-column-layout" -->
# Des exemples
##--##
<!-- .slide: class="with-code inconsolata" -->
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  foods = ['Bacon', 'Lettuce', 'Tomatoes'];
  addFood(food) {
    this.foods = [...this.foods, food];
    // this.foods.push(food);
  }
}
```
<!-- .element: class="medium-code" -->

<br><br>

```html
<input #newFood type="text" placeholder="Enter a new food">
<button (click)="addFood(newFood.value)">Add food</button>
<app-child [data]="foods"></app-child>
```
<!-- .element: class="medium-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->
```typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-child',
  template: './food-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input() data: string[];
}
``` 
<!-- .element: class="medium-code" -->




Notes:
- Dans cette exemple, on ne verra aucun changement, puisque la référence ne change pas ! 
- Si l'on souhaite chnager de reférence, penser à la destructuration => this.foods = [...this.foods, food];

