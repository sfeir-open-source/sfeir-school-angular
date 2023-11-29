import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CardComponent, MatButtonModule, AsyncPipe],
})
export class HomeComponent {
  readonly #peopleService: PeopleService = inject(PeopleService);

  person$: Observable<People> = this.#peopleService.getPeople().pipe(map(([firstPerson]) => firstPerson));

  getRandomPerson(): void {
    this.person$ = this.#peopleService.getRandomPeople();
  }
}
