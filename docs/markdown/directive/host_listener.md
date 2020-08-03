<!-- .slide: class="transition-bg-grey-1 underline" -->
# Host Listener

##==## 

<!-- .slide-->
# Host Listener: définition
<br><br>

- Permet d'écouter un event du DOM et d'appeler un callback <br><br>
- Décorateur @HostListener()

##==##

<!-- .slide: class="inconsolata with-code" -->
# Host Listener: exemple
<br><br>

```typescript
@Directive({ selector: '[blDragAndDrop]' })
export class DragAndDropDirective {
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
