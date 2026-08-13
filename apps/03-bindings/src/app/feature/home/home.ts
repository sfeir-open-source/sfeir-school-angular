import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'sfeir-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatCardModule],
})
export class Home {
  protected readonly _name = 'SFEIR_SCHOOL';
}
