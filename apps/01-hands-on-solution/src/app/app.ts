import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  imports: [MatToolbarModule, MatCardModule],
  selector: 'sfeir-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly _name = 'SFEIR_SCHOOL';
}
