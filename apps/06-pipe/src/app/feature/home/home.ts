import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PEOPLE_MOCK, type Person } from '@sfeir/types';
import { Card } from '@sfeir/ui/card';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatButtonModule, Card],
})
export class Home {
  public readonly person = signal<Person>(PEOPLE_MOCK[0]);

  handleRefresh(): void {
    const randomIndex = Math.floor(Math.random() * PEOPLE_MOCK.length);
    this.person.set(PEOPLE_MOCK[randomIndex]);
  }
}
