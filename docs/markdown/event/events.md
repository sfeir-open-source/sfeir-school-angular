<!-- .slide: class="with-code inconsolata"-->
# Les évènements

-   Nom de l'évènement entre ()<br/>
-   Fait référence à une méthode de la classe<br/>
-   Pour récupérer les détails de l'event <b>$event</b><br/><br/>

```typescript
// my-component.component.ts
export class MyComponent {
  values = '';
    
  updateValue(clickEvent: MouseEvent): void {
    this.values += event.target.value + ' | ';
  }
}
```
<!-- .element: class="medium-code" -->

<br/>

```html
<!-- my-component.component.html -->
<input type="text" (click)="updateValue($event)" />
```
<!-- .element: class="medium-code" -->
