import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, filter, shareReplay, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { setSearch } from '../../core/store/action';
import { selectPeople, selectSearch } from '../../core/store/selector';
import { AppStore } from '../../core/store/state';
import { People } from '../../shared/models/people.model';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BadgeDirective } from '../../shared/directives/badge.directive';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatListModule, MatButtonModule, AddPersonDialogComponent, SearchComponent, CardComponent, BadgeDirective],
})
export class PeopleComponent implements OnInit {
  private readonly peopleService = inject(PeopleService);
  private readonly matDialogService = inject(MatDialog);
  private readonly store: Store<AppStore> = inject(Store);

  people$ = this.store.select(selectPeople).pipe(shareReplay(1));
  search$ = this.store.select(selectSearch);
  view$: BehaviorSubject<'card' | 'list'> = new BehaviorSubject('card');

  ngOnInit(): void {
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
