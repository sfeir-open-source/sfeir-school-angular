import { Component, OnInit } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  person$: Observable<People> = EMPTY;

  constructor(private readonly peopleService: PeopleService) {}

  ngOnInit(): void {
    this.person$ = this.peopleService.getPeople().pipe(map(([firstPerson]) => firstPerson));
  }

  getRandomPerson(): void {
    this.person$ = this.peopleService.getRandomPeople();
  }
}
