import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgOptimizedImage],
})
export class PeopleComponent {
  private readonly httpClient = inject(HttpClient);

  people = toSignal(this.httpClient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`), { initialValue: [] });
}
