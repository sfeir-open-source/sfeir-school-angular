import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  people;

  constructor(private readonly http: HttpClient) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.http.get('http://localhost:3000/api/people').subscribe(people => (this.people = people));
  }
}
