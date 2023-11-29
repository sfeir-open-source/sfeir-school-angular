import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, shareReplay, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { setSearch } from '../../core/store/action';
import { selectPeople, selectSearch } from '../../core/store/selector';
import { AppStore } from '../../core/store/state';
import { BadgeDirective } from '../../shared/directives/badge.directive';
import { People } from '../../shared/models/people.model';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    MatListModule,
    MatButtonModule,
    AddPersonDialogComponent,
    SearchComponent,
    CardComponent,
    BadgeDirective,
    CardComponent,
    SearchComponent,
  ],
})
export class PeopleComponent implements OnInit {
  readonly #peopleService = inject(PeopleService);
  readonly #matDialogService = inject(MatDialog);
  readonly #store: Store<AppStore> = inject(Store);

  people$ = this.#store.select(selectPeople).pipe(shareReplay(1));
  search$ = this.#store.select(selectSearch);
  view$: BehaviorSubject<'card' | 'list'> = new BehaviorSubject('card');

  ngOnInit(): void {
    this.#peopleService.getPeople().subscribe();
  }

  deletePerson(person: People): void {
    this.#peopleService.deletePeople(person.id).subscribe();
  }

  changeView(currentView: string): void {
    this.view$.next(currentView === 'card' ? 'list' : 'card');
  }

  showDialog(): void {
    this.#matDialogService
      .open(AddPersonDialogComponent, { width: '30%', height: 'fit-content' })
      .afterClosed()
      .pipe(
        filter(personForm => !!personForm),
        switchMap(personForm => this.#peopleService.addNewPerson(personForm)),
        switchMap(() => this.#peopleService.getPeople()),
      )
      .subscribe();
  }

  setSearch(search: string): void {
    this.#store.dispatch(setSearch({ search }));
  }
}
