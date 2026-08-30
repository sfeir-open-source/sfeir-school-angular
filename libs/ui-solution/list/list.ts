import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, input, TemplateRef } from '@angular/core';
import { MatListModule } from '@angular/material/list';

type ItemTemplateRefContext<T> = {
  $implicit: T;
};

@Component({
  selector: 'sfeir-list',
  templateUrl: './list.html',
  imports: [NgTemplateOutlet, MatListModule],
})
export class List<T extends { id: unknown }> {
  public readonly data = input.required<T[]>();
  public readonly itemTemplate = contentChild.required<TemplateRef<ItemTemplateRefContext<T>>>(TemplateRef);
}
