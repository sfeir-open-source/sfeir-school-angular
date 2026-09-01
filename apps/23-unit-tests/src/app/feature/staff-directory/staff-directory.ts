import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { UiView, UpsertPersonBody } from '@sfeir/types';
import { Card } from '@sfeir/ui/card';
import { King } from '@sfeir/ui/king';
import { List } from '@sfeir/ui/list';
import { Loader } from '@sfeir/ui/loader';
import { merge, Subject } from 'rxjs';
import { exhaustMap, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { People } from '../../core/provider/people';
import { DialogPerson } from './dialog-person/dialog-person';

@Component({
  selector: 'sfeir-staff-directory',
  templateUrl: './staff-directory.html',
  styleUrl: './staff-directory.scss',
  imports: [Card, MatButtonModule, MatListModule, NgOptimizedImage, King, Loader, MatDialogModule, List],
})
export class StaffDirectory {
  private readonly _peopleService = inject(People);
  private readonly _matDialog = inject(MatDialog);

  private readonly _triggerUpsertPerson = new Subject<void>();
  private readonly _triggerDeletePerson = new Subject<string>();

  private readonly _getPersonsFlow = this._peopleService.getPeople().pipe(finalize(() => this._isLoading.set(false)));

  protected readonly _isLoading = signal(true);
  private readonly _deletePersonFlow = this._triggerDeletePerson.asObservable().pipe(
    tap(() => this._isLoading.set(true)),
    switchMap(id => this._peopleService.removePerson(id).pipe(finalize(() => this._isLoading.set(false)))),
  );
  private readonly _upsertPersonFlow = this._triggerUpsertPerson.asObservable().pipe(
    exhaustMap(() =>
      this._matDialog
        .open<DialogPerson, undefined, UpsertPersonBody | undefined>(DialogPerson, {
          width: '50%',
          height: 'fit-content',
        })
        .afterClosed()
        .pipe(
          filter(Boolean),
          tap(() => this._isLoading.set(true)),
          switchMap(body => this._peopleService.addPerson(body).pipe(switchMap(() => this._getPersonsFlow))),
        ),
    ),
  );

  private readonly _personsFlow = merge(this._getPersonsFlow, this._deletePersonFlow, this._upsertPersonFlow);

  protected readonly _people = toSignal(this._personsFlow, { requireSync: false, initialValue: [] });

  public readonly view = signal<UiView>('card');

  handleDelete(id: string): void {
    this._triggerDeletePerson.next(id);
  }

  handleChangeView(): void {
    this.view.update(currentView => (currentView === 'card' ? 'list' : 'card'));
  }

  handleOpenAddDialog(): void {
    this._triggerUpsertPerson.next();
  }
}
