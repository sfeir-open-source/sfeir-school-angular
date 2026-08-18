import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import type { Person } from '@sfeir/types';
import { King } from '@sfeir/ui-solution/king';
import { Na } from '@sfeir/ui-solution/na';

@Component({
  selector: 'sfeir-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  imports: [NgOptimizedImage, MatCardModule, MatButtonModule, MatIconModule, Na, DatePipe, King],
})
export class Card {
  public readonly person = input.required<Person>();
  public readonly delete = output<string>();

  handleDelete(id: string): void {
    this.delete.emit(id);
  }
}
