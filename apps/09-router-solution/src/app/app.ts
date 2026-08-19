import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [MatToolbarModule, MatCardModule, RouterOutlet],
  selector: 'sfeir-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
