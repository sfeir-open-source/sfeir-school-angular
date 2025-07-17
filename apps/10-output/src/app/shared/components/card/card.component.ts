import { Component, input } from '@angular/core';
import { People } from '../../models/people.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'sfeir-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgOptimizedImage],
})
export class CardComponent {
  person = input.required<People>();
}
