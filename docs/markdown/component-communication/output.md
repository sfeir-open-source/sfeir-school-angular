<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: @Output

- In the child component (`child.component.ts`)

```typescript
import { Component, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-child'
})
export class ChildComponent {
    @Output() childEvent: EventEmitter<string>;
    constructor() {
        this.childEvent = new EventEmitter<string>();
    }
    raiseEvent() {
        this.childEvent.emit('event from child');
    }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: @Output

-   In the parent component's HTML template (`parent.component.html`) <br/><br/>

```html
<section><app-child (childEvent)="onChildEvent($event)"></app-child></section>
```

<!-- .element: class="big-code" -->
<br/>

-   In the parent component (`parent.component.ts`) <br/><br/>

```typescript
onChildEvent(value: string): void {
  console.info(value); // event from child
}
```

<!-- .element: class="big-code" -->
