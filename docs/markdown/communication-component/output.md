<!-- .slide: class="sfeir-basic-slide with-code" -->
# Communication parent - enfant: @Output
<br>
Dans le composant enfant: déclaration de l'output: EventEmitter
<br><br>
```typescript
import { Component, Output, EventEmitter } from '@angular/core';
@Component({
   selector: "app-child"
})
export class ChildComponent {
  @Output() childEvent: EventEmitter<string>;
  constructor() {
    this.childEvent = new EventEmitter<string>();
  }
  raiseEvent(){
    this.childEvent.emit("event from child");
  }
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Communication parent - enfant: @Ouput
<br>
<ul>
    <li>Parent - Template: binding de l'evenement enfant</li>
</ul>
```html
<section>
    <app-child (childEvent)="onChildEvent($event)"></app-child>
</section>
```
<!-- .element: class="big-code" -->
<br>
<ul>
    <li>Parent - Component: Implémentation de la méthode bindée sur l'evenement</li>
</ul>
```typescript
onChildEvent(myPassVariable: string): void {
  console.info(myPassVariable); // event from child 
}
```
<!-- .element: class="big-code" -->
