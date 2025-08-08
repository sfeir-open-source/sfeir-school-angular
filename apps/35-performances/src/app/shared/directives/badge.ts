import { Directive, effect, ElementRef, inject, input, Renderer2, signal } from '@angular/core';

@Directive({
  selector: '[sfeirBadge]',
  host: {
    '[style.color]': 'badgeColor()',
    '(mouseover)': 'onMouseOver()',
    '(mouseout)': 'onMouseOut()',
  },
})
export class Badge {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer2 = inject(Renderer2);

  badgeColor = signal('black');

  isManager = input.required<boolean>({ alias: 'sfeirBadge' });

  constructor() {
    effect(() => {
      const isManager = this.isManager();
      this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', isManager ? '<i class="material-icons">supervisor_account</i>' : '');
    });
  }

  onMouseOver() {
    this.badgeColor.set('red');
  }

  onMouseOut() {
    this.badgeColor.set('black');
  }
}
