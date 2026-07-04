import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatButtonModule, MatIconModule, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly peopleService = inject(PeopleService);
  personResource = this.peopleService.getRandomPeople();

  getRandomPerson(): void {
    this.personResource.reload();
  }
}
