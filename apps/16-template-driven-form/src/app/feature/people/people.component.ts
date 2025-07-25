import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, Subject, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { MatListModule } from '@angular/material/list';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Badge } from '../../shared/directives/badge';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  imports: [CardComponent, MatListModule, NgOptimizedImage, MatButtonModule, MatIconModule, Badge],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent {
  private readonly peopleService = inject(PeopleService);
  private readonly matDialog = inject(MatDialog);

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
        .afterClosed(),
    ),
  );

  private peopleFlow$ = merge(this.retrievePeople$, this.deletePeople$);

  people = toSignal(this.peopleFlow$, { initialValue: [] });
  view = signal('card');

  deletePerson({ id }: People): void {
    this.triggerDeletePeople$.next(id);
  }

  changeView(): void {
    this.view.update(view => (view === 'card' ? 'list' : 'card'));
  }

  showDialog() {
    this.triggerAddPeople$.next();
  }
}
