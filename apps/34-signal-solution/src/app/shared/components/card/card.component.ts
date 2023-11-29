import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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
  @Input({ alias: 'person' }) set _person(person: People | undefined) {
    person && this.person.set(person);
  }

  @Output() personDelete: EventEmitter<People> = new EventEmitter();

  person = signal<People>({} as People);

  deletePerson(person: People): void {
    this.personDelete.emit(person);
  }
}
