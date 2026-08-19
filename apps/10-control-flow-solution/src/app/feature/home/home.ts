import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { type Person } from '@sfeir/types';
import { Card } from '@sfeir/ui-solution/card';
import { People } from '../../core/provider/people';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatButtonModule, Card],
})
export class Home {
  private readonly _peopleService = inject(People);
  public readonly person = signal<Person>(this._peopleService.getFirstPerson());

  handleRefresh(): void {
    this.person.set(this._peopleService.getRandomPerson());
  }
}
