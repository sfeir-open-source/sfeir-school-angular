import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UpsertPersonBody } from '@sfeir/types';
import { Loader } from '@sfeir/ui/loader';
import { SignalForm } from '@sfeir/ui/signal-form';
import { People } from '../../core/provider/people';

@Component({
  selector: 'sfeir-person-details',
  templateUrl: './person-details.html',
  styleUrl: './person-details.scss',
  imports: [SignalForm, Loader],
})
export class PersonDetails {
  private readonly _people = inject(People);
  private readonly _location = inject(Location);
  private readonly _router = inject(Router);
  public readonly id = input.required<string>();

  protected readonly _personResource = rxResource({
    params: this.id,
    stream: ({ params: id }) => this._people.getPerson(id),
  });

  goBack(): void {
    this._location.back();
  }

  savePerson(update: UpsertPersonBody): void {
    this._people.updatePerson(this.id(), update).subscribe(() => this._location.back());
  }
}
