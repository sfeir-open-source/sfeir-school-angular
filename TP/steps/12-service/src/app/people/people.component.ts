import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  people;

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.httpClient.get<any>('http://localhost:9000/api/people').subscribe(people => {
      this.people = people;
    });
  }

  delete(person: any) {
    this.httpClient.delete(`http://localhost:9000/api/people/${person.id}`).subscribe(people => {
      this.people = people;
    });
  }
}
