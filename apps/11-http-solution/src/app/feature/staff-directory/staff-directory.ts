import { Component, inject, signal } from '@angular/core';
import { People } from '../../core/provider/people';
import { Card } from '@sfeir/ui-solution/card';
import { UiView } from '@sfeir/types';
import { MatListModule } from '@angular/material/list';
import { NgOptimizedImage } from '@angular/common';
import { King } from '@sfeir/ui-solution/king';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, merge, Subject, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Loader } from '@sfeir/ui-solution/loader';

@Component({
  selector: 'sfeir-staff-directory',
  templateUrl: './staff-directory.html',
  styleUrl: './staff-directory.scss',
  imports: [Card, MatButtonModule, MatListModule, NgOptimizedImage, King, Loader],
})
export class StaffDirectory {
  private readonly _peopleService = inject(People);

  private readonly _triggerGetPersons = new BehaviorSubject<void>(void 0);
  private readonly _triggerDeletePerson = new Subject<string>();

  private readonly _getPersonsFlow = this._triggerGetPersons.asObservable().pipe(switchMap(() => this._peopleService.getPeople()));
  private readonly _deletePersonFlow = this._triggerDeletePerson.asObservable().pipe(switchMap(id => this._peopleService.removePerson(id)));

  private readonly _personsFlow = merge(this._getPersonsFlow, this._deletePersonFlow);

  protected readonly _people = toSignal(this._personsFlow, { requireSync: false, initialValue: [] });

  public readonly view = signal<UiView>('card');

  handleDelete(id: string): void {
    this._triggerDeletePerson.next(id);
  }

  handleChangeView(): void {
    this.view.update(currentView => (currentView === 'card' ? 'list' : 'card'));
  }
}
