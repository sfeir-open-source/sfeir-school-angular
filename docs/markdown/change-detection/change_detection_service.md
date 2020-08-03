<!-- .slide -->
# Le service ChangeDetectorRef
<br><br>

- Permet d'avoir un contrôle complet sur la statégie de détection<br><br>
- 4 méthodes
    - detectChanges (détecte un changement)
    - markForCheck (détecte une mutation d'état pratique pour les observables)
    - detach (permet de ne plus observer une variable)
    - reattach (permet d'écouter à nouveau les changements)

##==##

<!-- .slide: class="two-column-layout" -->
# Exemple: detectChanges
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
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-child',
  template: './food-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input() data: string[];
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }
  refresh(): void {
    this.changeDetectorRef.detectChanges();
  }
}
``` 
<!-- .element: class="medium-code" -->

##==##
<!-- .slide: class="two-column-layout" -->
# Exemple: markForCheck
##--##
<!-- .slide: class="with-code inconsolata" -->
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  foods = new BehaviorSubject(['Bacon', 'Letuce', 'Tomatoes']);
  addFood(food) {
    this.foods.next(food);
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
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
@Component({
  selector: 'app-child',
  template: './food-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit {
  @Input() data: BehaviourSubject<string>;
  foods: string[] = [];
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.data.subscribe((food: string[]) => {
      this.foods = [...this.foods, ...food];
      this.cd.markForCheck();
    })
  }
}
``` 
<!-- .element: class="medium-code" -->
