import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People } from '../../shared/models/people.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export default class HomeComponent {
  private readonly peopleService: PeopleService = inject(PeopleService);

  person$: Observable<People> = this.peopleService.getPeople().pipe(map(([firstPerson]) => firstPerson));

  getRandomPerson(): void {
    this.person$ = this.peopleService.getRandomPeople();
  }
}
