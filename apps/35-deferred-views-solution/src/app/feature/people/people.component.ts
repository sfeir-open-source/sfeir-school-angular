import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { defer, filter, switchMap } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeDirective } from '../../shared/directives/badge.directive';
import { People } from '../../shared/models/people.model';
import { SearchComponent } from './components/search/search.component';
import { PEOPLE_STORE } from '../../core/store/signal.store';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage, MatListModule, MatButtonModule, SearchComponent, CardComponent, BadgeDirective],
})
export class PeopleComponent implements OnInit {
  readonly #matDialogService = inject(MatDialog);
  readonly #peopleStore = inject(PEOPLE_STORE);

  view = signal<'card' | 'list'>('card');
  search = this.#peopleStore.search.asReadonly();
  peopleFiltered = this.#peopleStore.peopleFiltered;

  ngOnInit(): void {
    this.#peopleStore.getPeople().subscribe();
  }

  deletePerson(person: People): void {
    this.#peopleStore.deletePerson(person.id).subscribe();
  }

  changeView(): void {
    this.view.update(currentView => (currentView === 'card' ? 'list' : 'card'));
  }

  showDialog(): void {
    defer(() => import('./components/add-person-dialog/add-person-dialog.component'))
      .pipe(
        switchMap(({ AddPersonDialogComponent }) =>
          this.#matDialogService
            .open(AddPersonDialogComponent, {
              width: '30%',
              height: 'fit-content',
            })
            .afterClosed(),
        ),
        filter(personForm => !!personForm),
        switchMap(personForm => this.#peopleStore.addNewPerson(personForm)),
        switchMap(() => this.#peopleStore.getPeople()),
      )
      .subscribe();
  }

  setSearch(search: string): void {
    this.#peopleStore.setSearch(search);
  }
}
