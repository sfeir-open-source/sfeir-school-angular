import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatCardModule, MatToolbarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'SFEIR';
}
