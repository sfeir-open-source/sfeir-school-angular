import { Component } from '@angular/core';
import { HomeComponent } from './feature/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatToolbarModule, HomeComponent],
})
export class AppComponent {}
