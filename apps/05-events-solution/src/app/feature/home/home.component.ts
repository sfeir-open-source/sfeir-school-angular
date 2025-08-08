import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PEOPLE } from '../../mocks/people.mock';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  person = signal(PEOPLE[0]);

  getRandomPerson(): void {
    this.person.set(PEOPLE[Math.floor(Math.random() * PEOPLE.length)]);
  }
}
