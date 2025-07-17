import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './feature/home/home.component';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatToolbarModule, HomeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
