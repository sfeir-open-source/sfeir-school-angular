import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sfeir-badge]'
})
export class SfeirBadgeDirective implements OnInit {
  @Input() person: any;

  /**
   * Component constructor
   */
  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    if (this.person?.isManager) {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'innerHTML',
        '<i class="material-icons">supervisor_account</i>'
      );
    }
  }
}
