import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../shared/people-service';

@Component({
  selector: 'sfeir-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  person: any = {};

  constructor(private readonly peopleService: PeopleService) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.peopleService.fetch().subscribe(people => {
      const [firstPerson] = people;
      this.person = firstPerson;
    });
  }

  /**
   * Returns random people
   */
  random() {
    this.peopleService.fetchRandom().subscribe(person => {
      this.person = person;
    });
  }
}
