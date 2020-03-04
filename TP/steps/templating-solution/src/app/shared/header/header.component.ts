import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'sfeir-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  @Input() template: TemplateRef<any>;
  constructor() {}
}
