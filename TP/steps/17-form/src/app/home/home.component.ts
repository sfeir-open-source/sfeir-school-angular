import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../shared/people-service';
import { People } from '../people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  person: People;

  constructor(private readonly peopleService: PeopleService) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.peopleService.fetch().subscribe(people => (this.person = people[0]));
  }

  /**
   * Returns random people
   */
  random() {
    this.peopleService.fetchRandom().subscribe(person => (this.person = person));
  }
}
