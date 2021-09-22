import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { People } from '../people.model';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  people: People[] = [];

  constructor(private readonly http: HttpClient) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.http.get<People[]>('http://localhost:3000/api/people/').subscribe(people => (this.people = people));
  }
}
