<!-- .slide: class="with-code inconsolata" -->
# Communication parent - enfant: @Input
- Enfant - Composant <br>

```typescript
import { Component, Input} from '@angular/core';
@Component({
   selector: "app-child"
})
export class ChildComponent {
   @Input() name: string;
}
```
<!-- .element: class="big-code" -->
<br>

- Parent - template <br>

```html
<section>
    <app-child [name]="person.name"></app-child>
</section>
```
<!-- .element: class="big-code" -->
