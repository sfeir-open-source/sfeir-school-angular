import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'sfeir-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class HeaderComponent {
  @Input() headerTemplate: TemplateRef<MatToolbar>;
}
