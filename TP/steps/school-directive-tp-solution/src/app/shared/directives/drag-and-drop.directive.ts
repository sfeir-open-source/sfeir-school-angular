import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[sfeirDragAndDrop]'
})
export class DragAndDropDirective implements OnInit {
  // tslint:disable-next-line:no-output-rename
  @Output('ondrop') ondrop$: EventEmitter<Array<File>> = new EventEmitter<Array<File>>();

  @HostBinding('class.drag-over') dragOver: boolean;

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'drop-zone');
  }

  @HostListener('dragleave', ['$event'])
  onDragleave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
    const filesAray: Array<File> = [];
    const {
      dataTransfer: { files }
    } = event;

    Object.keys(files).forEach((key: string) => {
      filesAray.push(files.item(+key));
    });

    this.ondrop$.emit(filesAray);
  }
}
