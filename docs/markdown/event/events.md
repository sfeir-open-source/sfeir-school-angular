<!-- .slide: class="with-code inconsolata"-->
# Events

-   Event name in parentheses ()<br/>
-   Refers to a method of the class<br/>
-   To get the event details <b>$event</b><br/><br/>

```typescript
// my-component.component.ts
export class MyComponent {
  value = '';
    
  updateValue(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }
}
```
<!-- .element: class="medium-code" -->

<br/>

```html
<!-- my-component.component.html -->
<input type="text" (keyup)="updateValue($event)" />
<p>Value: {{ value }}</p>
```
<!-- .element: class="medium-code" -->
