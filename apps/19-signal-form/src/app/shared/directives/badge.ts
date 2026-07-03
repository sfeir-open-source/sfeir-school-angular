import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sfeirBadge]',
})
export class Badge {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer2 = inject(Renderer2);

  isManager = input.required<boolean>({ alias: 'sfeirBadge' });

  constructor() {
    effect(() => {
      const isManager = this.isManager();
      this.renderer2.setProperty(this.elementRef.nativeElement, 'innerHTML', isManager ? '<i class="material-icons">supervisor_account</i>' : '');
    });
  }
}
