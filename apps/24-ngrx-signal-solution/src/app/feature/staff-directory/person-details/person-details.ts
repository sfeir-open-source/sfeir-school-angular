import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Person, UpsertPersonBody } from '@sfeir/types';
import { SignalForm } from '@sfeir/ui-solution/signal-form';
import { People } from '../../../core/provider/people';

@Component({
  selector: 'sfeir-person-details',
  templateUrl: './person-details.html',
  styleUrl: './person-details.scss',
  imports: [SignalForm],
})
export class PersonDetails {
  private readonly _people = inject(People);
  private readonly _location = inject(Location);
  public readonly person = input.required<Person>();

  savePerson(update: UpsertPersonBody): void {
    this._people.updatePerson(this.person().id, update).subscribe(() => this._location.back());
  }

  goBack(): void {
    this._location.back();
  }
}
