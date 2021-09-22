import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from '../people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  person: People;

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.httpClient.get<People[]>('http://localhost:3000/api/people').subscribe(people => {
      const [firstPerson] = people;
      this.person = firstPerson;
    });
  }

  /**
   * Returns random people
   */
  random() {
    this.httpClient.get<People>('http://localhost:3000/api/people/random').subscribe(person => {
      this.person = person;
    });
  }
}
