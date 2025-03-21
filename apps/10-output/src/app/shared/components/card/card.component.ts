import { Component, Input } from '@angular/core';
import { People } from '../../models/people.model';

@Component({
  selector: 'sfeir-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent {
  @Input() person!: People;
}
