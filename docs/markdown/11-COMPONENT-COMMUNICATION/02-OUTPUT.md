<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: output signal function

- In the child component (`child.component.ts`)

```typescript
@Component({
  selector: 'app-child',
})
export class ChildComponent {
  childEvent = output<string>();

  raiseEvent() {
    this.childEvent.emit('event from child');
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: output signal function

- In the parent component's HTML template (`parent.component.html`) <br/><br/>

```html
<section>
  <app-child (childEvent)="refreshList($event)" />
</section>
```

<!-- .element: class="big-code" -->
<br/>

- In the parent component (`parent.component.ts`) <br/><br/>

```typescript
refreshList(value: string): void {
  console.info(value); // event from child
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: @Output decorator

- In the child component (`child.component.ts`)

```typescript
@Component({
  selector: 'app-child',
})
export class ChildComponent {
  @Output() childEvent = new EventEmitter<string>();

  raiseEvent() {
    this.childEvent.emit('event from child');
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Parent-child communication: @Output decorator

- In the parent component's HTML template (`parent.component.html`) <br/><br/>

```html
<section>
  <app-child (childEvent)="refreshList($event)" />
</section>
```

<!-- .element: class="big-code" -->
<br/>

- In the parent component (`parent.component.ts`) <br/><br/>

```typescript
refreshList(value: string): void {
  console.info(value); // event from child
}
```

<!-- .element: class="big-code" -->

##==##

# Rxjs Interoperability with output function

<br/><br/>

- **outputToObservable** converts an output() to an observable. <br/><br/>
- **outputFromObservable** converts an observable to an output().
