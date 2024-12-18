import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'sfeir-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent {
  @Input({ required: true }) headerTemplate: TemplateRef<void>;
}
