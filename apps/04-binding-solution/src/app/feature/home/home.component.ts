import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PEOPLE } from '../../mocks/people.mock';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, NgOptimizedImage, MatIconModule, MatButtonModule],
})
export class HomeComponent {
  person = signal(PEOPLE[0]);
}
