import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [NgIf, CardComponent, MatButtonModule, AsyncPipe],
})
export class HomeComponent {
  private readonly peopleService: PeopleService = inject(PeopleService);

  person$: Observable<People> = this.peopleService.getPeople().pipe(map(([firstPerson]) => firstPerson));

  getRandomPerson(): void {
    this.person$ = this.peopleService.getRandomPeople();
  }
}
