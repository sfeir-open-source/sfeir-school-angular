import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'sfeir-header',
  imports: [NgTemplateOutlet],
  template: ` <ng-template [ngTemplateOutlet]="headerTemplate()" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  headerTemplate = input.required<TemplateRef<undefined>>();
}
