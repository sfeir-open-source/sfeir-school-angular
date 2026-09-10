# First, the mental model

**Change detection** is how Angular decides _when_ to re-render a component and _what_ to update in the DOM.

<br/>

- Historically driven by **Zone.js** (the model in this first part) <br/><br/>
- Since **v21, Angular is zoneless by default** and change detection is driven by **signals** (next part) <br/><br/>
- Understanding the Zone.js/`OnPush` model still matters: you will meet it in every existing codebase

Notes:

- This chapter goes from the legacy Zone.js model → OnPush → the modern signal-based, zoneless default. Each step motivates the next.

##==##

# The legacy engine: Zone.js

- A library that intercepts and keeps track of asynchronous operations <br/><br/>
- Automatically triggers change detection when async operations complete <br/><br/>
- Shipped by default **before v21** <br/><br/>
- Responsible for the "magic" automatic UI updates

Notes:

- Zone.js is what enabled Angular to know when to run change detection without explicit calls.
- It patches browser APIs like setTimeout, Promise, XHR, etc.
- This is why the UI updated automatically after async operations — at the cost of checking a lot, often.

##==##

# The Basics

<br/><br/>

- Angular triggers a change detection on all components (from parent to all children)<br/><br/>
- A change detection is triggered every time something changes in the app (user event)<br/><br/>
- Efficient but for more complex applications, there is a risk of slowdowns.

##==##

# Change Detection Strategy: Default (waiting event)

![](assets/images/school/change-detection/cd_default.png)

<!-- .element: class="full-center" -->

##==##

# Change Detection Strategy: Default (dirty checking)

![](assets/images/school/change-detection/cd_default_dirty.png)

<!-- .element: class="full-center" -->

##==##

# Change Detection Strategy: Default (change detection)

![](assets/images/school/change-detection/cd_default_cd.png)

<!-- .element: class="full-center" -->

##==##

# Change Detection Strategy: OnPush

Only triggers a change when the reference of a variable changes or an observable emits a new value

<!-- .element: class="important full-center" -->

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Examples

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

```typescript
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-child',
  template: './food-details.component.html',
})
export class ChildComponent {
  @Input() data: string[];
}
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Examples

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

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

##++##

Notes:

- In this example, the child component uses `ChangeDetectionStrategy.OnPush`.
- If we used `this.foods.push(food)`, the view would not update because the array reference does not change.
- By creating a new array with `this.foods = [...this.foods, food]`, we change the input reference, which triggers change detection.

##==##

# Change Detection Strategy: On Push (waiting event)

![](assets/images/school/change-detection/cd_on-push.png)

<!-- .element: class="full-center" -->

##==##

# Change Detection Strategy: Default (dirty checking)

![](assets/images/school/change-detection/cd_on-push_dirty.png)

<!-- .element: class="full-center" -->

##==##

# Change Detection Strategy: Default (change detection)

![](assets/images/school/change-detection/cd_on-push_cd.png)

<!-- .element: class="full-center" -->
