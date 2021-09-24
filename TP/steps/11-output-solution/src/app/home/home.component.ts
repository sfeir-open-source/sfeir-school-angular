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

  constructor(private readonly httpCLient: HttpClient) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.httpCLient.get<People[]>('http://localhost:3000/api/people').subscribe(people => {
      this.person = people[0];
    });
  }

  /**
   * Returns random people
   */
  random() {
    this.httpCLient.get<People>('http://localhost:3000/api/people/random').subscribe(person => {
      this.person = person;
    });
  }
}
