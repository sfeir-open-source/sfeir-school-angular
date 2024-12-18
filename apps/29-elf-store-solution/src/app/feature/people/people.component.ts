import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, filter, Observable, shareReplay, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { AppStoreService } from '../../core/store/app.store';
import { People } from '../../shared/models/people.model';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  standalone: false,
})
export class PeopleComponent implements OnInit {
  people$: Observable<Array<People>> = EMPTY;
  search$: Observable<string> = EMPTY;
  view$: BehaviorSubject<'card' | 'list'> = new BehaviorSubject('card');

  constructor(
    private readonly peopleService: PeopleService,
    private readonly matDialogService: MatDialog,
    private readonly appStoreService: AppStoreService,
  ) {}

  ngOnInit(): void {
    this.people$ = this.appStoreService.selectPeople().pipe(shareReplay(1));
    this.search$ = this.appStoreService.selectSearch().pipe(shareReplay(1));

    this.peopleService.getPeople().subscribe();
  }

  deletePerson(person: People): void {
    this.peopleService.deletePeople(person.id).subscribe();
  }

  changeView(currentView: string): void {
    this.view$.next(currentView === 'card' ? 'list' : 'card');
  }

  showDialog(): void {
    this.matDialogService
      .open(AddPersonDialogComponent, { width: '30%', height: 'fit-content' })
      .afterClosed()
      .pipe(
        filter(personForm => !!personForm),
        switchMap(personForm => this.peopleService.addNewPerson(personForm)),
        switchMap(() => this.peopleService.getPeople()),
      )
      .subscribe();
  }

  setSearch(search: string): void {
    this.appStoreService.setSearch(search);
  }
}
