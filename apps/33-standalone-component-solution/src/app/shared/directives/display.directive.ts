import { NgIfContext } from '@angular/common';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[sfeirDisplay]',
})
export class DisplayDirective {
  @Input('sfeirDisplay') set condition(condition: boolean) {
    condition ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
  }
  constructor(private readonly templateRef: TemplateRef<NgIfContext>, private readonly viewContainerRef: ViewContainerRef) {}
}
