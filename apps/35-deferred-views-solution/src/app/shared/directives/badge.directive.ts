import { Directive, effect, ElementRef, HostBinding, HostListener, input, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[sfeirBadge]',
})
export class BadgeDirective {
  isManager = input<boolean>(false, { alias: 'sfeirBadge' });
  @HostBinding('style.color') private iconColor = 'black';

  constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  #isManagerEffect = effect(() => {
    const isManager = this.isManager();
    if (isManager) {
      this.renderer.setProperty(this.element.nativeElement, 'innerHTML', '<i class="material-icons">supervisor_account</i>');
    }
  });

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent): void {
    event.stopPropagation();
    this.iconColor = 'red';
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent): void {
    event.stopPropagation();
    this.iconColor = 'black';
  }
}
