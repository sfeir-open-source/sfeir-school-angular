import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  person$: Observable<People> = EMPTY;

  constructor(private readonly httpCLient: HttpClient) {}

  ngOnInit(): void {
    this.person$ = this.httpCLient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`).pipe(map(([firstPerson]) => firstPerson));
  }

  getRandomPerson(): void {
    this.person$ = this.httpCLient.get<People>(`${environment.peopleEndpoint}/peoples/random`);
  }
}
