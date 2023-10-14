import { Component, EventEmitter, Input, Output } from '@angular/core';
import { People } from '../../models/people.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DisplayDirective } from '../../directives/display.directive';
import { NaPipe } from '../../pipes/na.pipe';
import { RouterLink } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  selector: 'sfeir-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule, DisplayDirective, NaPipe, RouterLink, NgOptimizedImage, DatePipe],
})
export class CardComponent {
  @Input() person!: People;
  @Output() personDelete: EventEmitter<People> = new EventEmitter();

  deletePerson(person: People): void {
    this.personDelete.emit(person);
  }
}
