<!-- .slide: class="with-code inconsolata" -->

# Communication parent - enfant: @Output

- Dans le composant enfant (`child.component.ts`)

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

# Communication parent - enfant: @Output

-   Dans le template HTML du composant parent (`parent.component.html`) <br><br>

```html
<section><app-child (childEvent)="onChildEvent($event)"></app-child></section>
```

<!-- .element: class="big-code" -->
<br>

-   Dans le composant parent (`parent.component.ts`) <br><br>

```typescript
onChildEvent(value: string): void {
  console.info(value); // event from child
}
```

<!-- .element: class="big-code" -->
