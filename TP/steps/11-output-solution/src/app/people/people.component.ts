import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  people;

  constructor(private _http: HttpClient) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._http.get('http://localhost:9000/api/peoples').subscribe(people => (this.people = people));
  }

  delete(person: any) {
    this._http.delete(`http://localhost:9000/api/peoples/${person.id}`).subscribe(people => (this.people = people));
  }
}
