import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './core/components/header/header';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterLink, MatToolbarModule, Header],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
