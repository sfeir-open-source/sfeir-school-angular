import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  name = 'Sfeir Luxembourg';
}
