<!-- .slide -->
# The Basics

<br/><br/>

-   Angular triggers a change detection on all components (from parent to all children)<br/><br/>
-   A change detection is triggered every time something changes in the app (user event)<br/><br/>
-   Efficient but for more complex applications, there is a risk of slowdowns.

##==##

<!-- .slide: class="full-center" -->
# Change Detection Strategy: OnPush
Only triggers a change when the reference of a variable changes
<!-- .element: class="important" -->

##==##

<!-- .slide: class="two-column with-code inconsolata" -->
# Examples

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

```html
<input #newFood type="text" placeholder="Enter a new food" />
<button (click)="addFood(newFood.value)">Add food</button>
<app-child [data]="foods"></app-child>
```
<!-- .element: class="medium-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

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

<!-- .slide: class="two-column with-code inconsolata" -->
# Examples

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

<br/>

```html
<input #newFood type="text" placeholder="Enter a new food" />
<button (click)="addFood(newFood.value)">Add food</button>
<app-child [data]="foods"></app-child>
```
<!-- .element: class="medium-code" -->

##--##
<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-child',
  template: './food-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() data: string[];
}
```
<!-- .element: class="medium-code" -->

Notes:

-   In this example, the child component uses `ChangeDetectionStrategy.OnPush`.
-   If we used `this.foods.push(food)`, the view would not update because the array reference does not change.
-   By creating a new array with `this.foods = [...this.foods, food]`, we change the input reference, which triggers change detection.
