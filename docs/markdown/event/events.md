<!-- .slide: -->

# Les évènements

-   Nom de l'évènement entre ()<br>
-   Fait référence à une méthode de la classe<br>
-   Pour récupérer les détails de l'event <b>\$event</b><br><br>


```typescript
// my-component.component.ts
export class MyComponent {
    values = '';

    constructor() {}
    
    updateValue(clickEvent: MouseEvent): void {
      this.values += clickEvent.target.value + ' | ';
    }
}
```

<br>
<!-- .element: class="medium-code" -->

```html
<!-- my-component.component.html -->
<input type="text" (click)="updateValue($event)"
```

<!-- .element: class="medium-code" -->
