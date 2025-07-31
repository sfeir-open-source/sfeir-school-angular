import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { filter, merge, Subject, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { AppStore } from '../../core/store/app-store';
import { CardComponent } from '../../shared/components/card/card.component';
import { Badge } from '../../shared/directives/badge';
import { People } from '../../shared/models/people.model';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';
import { SearchBar } from './components/search/search-bar';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  imports: [CardComponent, MatListModule, NgOptimizedImage, MatButtonModule, MatIconModule, Badge, SearchBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent {
  private readonly peopleService = inject(PeopleService);
  private readonly matDialog = inject(MatDialog);
  private readonly appStore = inject(AppStore);

  private readonly triggerDeletePeople$ = new Subject<string>();
  private readonly triggerAddPeople$ = new Subject<void>();

  private readonly retrievePeople$ = this.peopleService.getPeople();
  private readonly deletePeople$ = this.triggerDeletePeople$.pipe(switchMap(id => this.peopleService.deletePeople(id)));
  private readonly addPeople$ = this.triggerAddPeople$.pipe(
    switchMap(() =>
      this.matDialog
        .open(AddPersonDialogComponent, {
          width: '50%',
          height: 'fit-content',
        })
        .afterClosed()
        .pipe(
          filter(Boolean),
          switchMap(personForm => this.peopleService.addNewPerson(personForm)),
          switchMap(() => this.retrievePeople$),
        ),
    ),
  );

  people = toSignal(this.appStore.selectPeoples$, { requireSync: true });
  search = toSignal(this.appStore.selectSearch$, { requireSync: true });
  view = signal('card');

  constructor() {
    merge(this.retrievePeople$, this.deletePeople$, this.addPeople$).pipe(takeUntilDestroyed()).subscribe();
  }

  deletePerson({ id }: People): void {
    this.triggerDeletePeople$.next(id);
  }

  changeView(): void {
    this.view.update(view => (view === 'card' ? 'list' : 'card'));
  }

  showDialog() {
    this.triggerAddPeople$.next();
  }

  filterPeopleBySearch(search: string) {
    this.appStore.setSearch(search);
  }
}
