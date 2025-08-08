import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { People } from '../../models/people.model';

@Component({
  selector: 'sfeir-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  person = input.required<People>();
  personDelete = output<People>();

  deletePerson(person: People): void {
    this.personDelete.emit(person);
  }
}
