import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, Observable, shareReplay, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { setSearch } from '../../core/store/action';
import { selectPeople, selectSearch } from '../../core/store/selector';
import { AppStore } from '../../core/store/state';
import { People } from '../../shared/models/people.model';
import { SharedModule } from '../../shared/shared.module';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  standalone: true,
  imports: [AddPersonDialogComponent, SearchComponent, SharedModule],
})
export class PeopleComponent implements OnInit {
  private readonly peopleService: PeopleService = inject(PeopleService);
  private readonly matDialogService: MatDialog = inject(MatDialog);
  private readonly store: Store<AppStore> = inject(Store);

  people$: Observable<Array<People>>;
  search$: Observable<string>;
  view$: BehaviorSubject<'card' | 'list'> = new BehaviorSubject('card');

  ngOnInit(): void {
    this.search$ = this.store.select(selectSearch);
    this.people$ = this.store.select(selectPeople).pipe(shareReplay(1));
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
        switchMap(() => this.peopleService.getPeople())
      )
      .subscribe();
  }

  setSearch(search: string): void {
    this.store.dispatch(setSearch({ search }));
  }
}
