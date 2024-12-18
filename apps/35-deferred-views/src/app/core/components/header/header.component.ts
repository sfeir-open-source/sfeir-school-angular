import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'sfeir-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgTemplateOutlet],
})
export class HeaderComponent {
  headerTemplate = input.required<TemplateRef<MatToolbar>>();
}
