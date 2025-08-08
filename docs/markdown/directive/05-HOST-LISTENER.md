<!-- .slide: class="transition-bg-sfeir-2" -->

# Host Listener

##==##

# Host Listener: Definition

- Allows listening to a DOM event and calling a callback <br/><br/>
- **@HostListener()** decorator <br/><br/>
- **host property** component | directive annotation + **event to listen** <br/><br/>

##==##

<!-- .slide: class="inconsolata with-code" -->

# Host Listener: Example

```typescript
@Directive({ selector: '[blDragAndDrop]' })
export class DragAndDropDirective {
  onFileUpload = output<File | null>();

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      const fileToUpload = event.dataTransfer.files.item(0);
      this.onFileUpload.emit(fileToUpload);
    }
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="inconsolata with-code" -->

# Host property + event property: Example

```typescript
@Directive({
  selector: '[blDragAndDrop]',
  host: {
    '(drop)': 'onDrop($event)',
  },
})
export class DragAndDropDirective {
  onFileUpload = output<File | null>();

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      const fileToUpload = event.dataTransfer.files.item(0);
      this.onFileUpload.emit(fileToUpload);
    }
  }
}
```

<!-- .element: class="medium-code" -->
