import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, shareReplay } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people$: Observable<Array<People>> = EMPTY;
  view$: BehaviorSubject<'card' | 'list'> = new BehaviorSubject('card');

  constructor(private readonly peopleService: PeopleService) {}

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople().pipe(shareReplay(1));
  }

  deletePerson(person: People): void {
    this.people$ = this.peopleService.deletePeople(person.id).pipe(shareReplay(1));
  }

  changeView(currentView: string): void {
    this.view$.next(currentView === 'card' ? 'list' : 'card');
  }
}
