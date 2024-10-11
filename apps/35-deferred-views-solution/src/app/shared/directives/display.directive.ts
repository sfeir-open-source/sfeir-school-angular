import { NgIfContext } from '@angular/common';
import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[sfeirDisplay]',
})
export class DisplayDirective {
  condition = input.required<boolean>({ alias: 'sfeirDisplay' });

  #displayEffect = effect(() => {
    const condition = this.condition();
    condition ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
  });

  constructor(
    private readonly templateRef: TemplateRef<NgIfContext>,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}
}
