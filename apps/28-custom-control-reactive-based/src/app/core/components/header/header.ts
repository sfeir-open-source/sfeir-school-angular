import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'sfeir-header',
  imports: [NgTemplateOutlet],
  template: ` <ng-template [ngTemplateOutlet]="headerTemplate()" /> `,
})
export class Header {
  headerTemplate = input.required<TemplateRef<undefined>>();
}
