import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sfeir-badge]'
})
export class SfeirBadgeDirective implements OnInit {
  @Input() person: any;

  /**
   * Component constructor
   */
  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    if (this.person && this.person.isManager) {
      this.renderer2.setProperty(
        this.elementRef.nativeElement,
        'innerHTML',
        '<i class="material-icons">supervisor_account</i>'
      );
    }
  }
}
