import { Directive, ElementRef, Input, OnInit, Renderer2, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { People } from '../../people.model';

@Directive({
  selector: '[sfeir-badge]'
})
export class SfeirBadgeDirective implements OnInit {
  @Input() person: People;

  /**
   * Component constructor
   */
  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    if (this.person?.isManager) {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'innerHTML',
        this.sanitizer.sanitize(SecurityContext.HTML, '<i class="material-icons">supervisor_account</i>')
      );
    }
  }
}
