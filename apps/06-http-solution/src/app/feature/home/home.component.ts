import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  personResource = httpResource<People>(() => `${environment.peopleEndpoint}/peoples/random`);

  getRandomPerson(): void {
    this.personResource.reload();
  }
}
