import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Home } from './feature/home/home';

@Component({
  imports: [MatToolbarModule, MatCardModule, Home],
  selector: 'sfeir-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
