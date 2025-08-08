import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'sfeir-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatToolbarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'SFEIR - LUXEMBOURG';
}
