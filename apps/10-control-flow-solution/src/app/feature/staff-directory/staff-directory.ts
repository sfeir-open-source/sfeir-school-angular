import { Component, inject, signal } from '@angular/core';
import { People } from '../../core/provider/people';
import { Card } from '@sfeir/ui-solution/card';
import { UiView } from '@sfeir/types';
import { MatListModule } from '@angular/material/list';
import { NgOptimizedImage } from '@angular/common';
import { King } from '@sfeir/ui-solution/king';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sfeir-staff-directory',
  templateUrl: './staff-directory.html',
  styleUrl: './staff-directory.scss',
  imports: [Card, MatButtonModule, MatListModule, NgOptimizedImage, King],
})
export class StaffDirectory {
  private readonly _peopleService = inject(People);

  protected readonly _people = signal(this._peopleService.getPeople());
  public readonly view = signal<UiView>('card');

  handleDelete(id: string): void {
    this._people.set(this._peopleService.removePerson(id));
  }

  handleChangeView(): void {
    this.view.update(currentView => (currentView === 'card' ? 'list' : 'card'));
  }
}
