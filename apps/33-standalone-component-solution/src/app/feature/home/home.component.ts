import { Component, inject, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  private readonly peopleService: PeopleService = inject(PeopleService);

  person$: Observable<People>;

  ngOnInit(): void {
    this.person$ = this.peopleService.getPeople().pipe(map(([firstPerson]) => firstPerson));
  }

  getRandomPerson(): void {
    this.person$ = this.peopleService.getRandomPeople();
  }
}
