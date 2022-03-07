import { Component, Input, TemplateRef } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'sfeir-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() headerTemplate: TemplateRef<MatToolbar>;
}
