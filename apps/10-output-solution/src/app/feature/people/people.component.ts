import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  standalone: false,
})
export class PeopleComponent implements OnInit {
  people$: Observable<Array<People>> = EMPTY;

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.people$ = this.httpClient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`);
  }

  deletePerson(person: People): void {
    this.people$ = this.httpClient.delete<Array<People>>(`${environment.peopleEndpoint}/peoples/${person.id}`);
  }
}
