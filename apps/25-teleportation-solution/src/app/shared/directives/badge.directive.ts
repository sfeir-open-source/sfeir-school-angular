import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sfeirBadge]',
})
export class BadgeDirective implements OnInit {
  @Input('sfeirBadge') isManager: boolean;

  constructor(private readonly element: ElementRef<HTMLElement>, private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.isManager) {
      this.renderer.setProperty(this.element.nativeElement, 'innerHTML', '<i class="material-icons">supervisor_account</i>');
    }
  }
}
