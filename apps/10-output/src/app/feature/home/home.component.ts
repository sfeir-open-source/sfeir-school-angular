import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { httpResource } from '@angular/common/http';
import { People } from '../../shared/models/people.model';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatButtonModule, MatIconModule, CardComponent],
})
export class HomeComponent {
  personResource = httpResource<People>(() => `${environment.peopleEndpoint}/peoples/random`);

  getRandomPerson(): void {
    this.personResource.reload();
  }
}
