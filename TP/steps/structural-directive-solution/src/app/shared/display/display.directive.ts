import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgIfContext } from '@angular/common';

// tslint:disable-next-line: directive-selector
@Directive({ selector: '[ngDisplay]' })
export class NgDisplayDirective<T = unknown> {
  constructor(
    private readonly templateRef: TemplateRef<NgIfContext<T>>,
    private readonly viewContainer: ViewContainerRef
  ) {}

  @Input() set ngDisplay(condition: T) {
    if (!!condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
