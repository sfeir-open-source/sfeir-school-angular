<!-- .slide -->

# The ChangeDetectorRef service

- Allows complete control over the detection strategy<br><br>
- 4 methods
  - detectChanges (detects a change)
  - markForCheck (detects a state mutation, useful for observables)
  - detach (stops observing a variable)
  - reattach (resumes listening for changes)

##==##

<!-- .slide: class="with-code inconsolata" -->

# Example: detectChanges

```typescript
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-child',
  template: './food-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  @Input() data: string[];
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  refresh(): void {
    this.changeDetectorRef.detectChanges();
  }
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

# Example: markForCheck

```typescript
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  foods$ = new BehaviorSubject(['Bacon', 'Lettuce', 'Tomatoes']);
  addFood(food: string) {
    const newFoods = [...this.foods$.value, food];
    this.foods$.next(newFoods);
  }
}
```

<!-- .element: class="medium-code" -->

```html
<input #newFood type="text" placeholder="Enter a new food" />
<button (click)="addFood(newFood.value)">Add food</button>
<app-child [data]="foods$"></app-child>
```

<!-- .element: class="medium-code" -->

##--##

<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```typescript
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-child',
  template: './food-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit {
  @Input() data: BehaviorSubject<string[]>;
  foods: string[] = [];
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.data.subscribe((foods: string[]) => {
      this.foods = foods;
      this.changeDetectorRef.markForCheck();
    });
  }
}
```

<!-- .element: class="medium-code" -->
