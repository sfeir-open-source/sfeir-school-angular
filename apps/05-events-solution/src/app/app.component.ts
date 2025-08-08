import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeComponent } from './feature/home/home.component';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatToolbar, HomeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
