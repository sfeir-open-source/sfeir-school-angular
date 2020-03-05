<!-- .slide: class="transition-white sfeir-bg-pink" -->
# Host Listener

##==## 

<!-- .slide: class="sfeir-basic-slide" -->
# Host Listener: définition
<br><br>
- Permet d'écouter un event du DOM et d'appeler un callback
- Décorateur @HostListener()

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
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
