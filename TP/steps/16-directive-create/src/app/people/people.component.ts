import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../shared/people-service';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  people;
  view = 'card';

  constructor(private readonly peopleService: PeopleService) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.peopleService.fetch().subscribe(people => (this.people = people));
  }

  delete(person: any) {
    this.peopleService.delete(person.id).subscribe(people => (this.people = people));
  }

  switchView() {
    this.view = this.view === 'card' ? 'list' : 'card';
  }
}
