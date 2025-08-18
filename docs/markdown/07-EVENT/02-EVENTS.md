<!-- .slide: class="with-code inconsolata"-->

# Events

- Event name in parentheses ()<br/>
- Refers to a method of the class<br/>
- To get the event details **$event**<br/><br/>

```typescript
@Component({
  selector: 'sfeir-app',
  template: ` <input type="text" (keyup)="updateValue($event)" />
    <p>Value: {{ value() }}</p>`,
})
export class App {
  value = signal('');

  updateValue(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
```

<!-- .element: class="medium-code"-->
