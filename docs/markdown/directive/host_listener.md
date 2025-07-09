<!-- .slide: class="transition-bg-sfeir-2" -->

# Host Listener

##==##

<!-- .slide-->
# Host Listener: Definition

- Allows listening to a DOM event and calling a callback <br/><br/>
- @HostListener() decorator

##==##

<!-- .slide: class="inconsolata with-code" -->
# Host Listener: Example

```typescript
import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[blDragAndDrop]' })
export class DragAndDropDirective {
  @Output() onFileUpload$: EventEmitter<File | null> = new EventEmitter();

  constructor() { }

  @HostListener('drop', [ '$event' ])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      const fileToUpload = event.dataTransfer.files.item(0);
      this.onFileUpload$.emit(fileToUpload);
    }
  }
}
```
<!-- .element: class="big-code" -->

##==##

# Host Listener / Host Binding: a second syntax

<br/>

- A second syntax is possible <br/><br/>
- Mainly used by component libraries <br/><br/>
- Do not mix the two syntaxes

##==##

<!-- .slide: class="inconsolata with-code" -->
# A more understandable example

```typescript
@Directive({
  selector: "[appAddIcon]",
  host: {
    "[class.test]": "isGood",
    "(click)": "onClick($event)"
  }
})
export class AddIconDirective implements OnInit {
  isGood: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isGood = false;
  }

  onClick(event: Event) {
    console.log(event);
  }
}
```
<!-- .element: class="small-code" -->
