import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PEOPLE } from '../../mocks/people.mock';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  person = signal(PEOPLE[0]);

  getRandomPerson(): void {
    this.person.set(PEOPLE[Math.floor(Math.random() * PEOPLE.length)]);
  }
}
