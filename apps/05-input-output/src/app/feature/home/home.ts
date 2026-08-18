import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PEOPLE_MOCK, type Person } from '@sfeir/types';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgOptimizedImage],
})
export class Home {
  public readonly person = signal<Person>(PEOPLE_MOCK[0]);

  handleRefresh(): void {
    const randomIndex = Math.floor(Math.random() * PEOPLE_MOCK.length);
    this.person.set(PEOPLE_MOCK[randomIndex]);
  }
}
