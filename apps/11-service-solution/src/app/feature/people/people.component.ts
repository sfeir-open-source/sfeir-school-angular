import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people$: Observable<Array<People>> = EMPTY;

  constructor(private readonly peopleService: PeopleService) {}

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople();
  }

  deletePerson(person: People): void {
    this.people$ = this.peopleService.deletePeople(person.id);
  }
}
