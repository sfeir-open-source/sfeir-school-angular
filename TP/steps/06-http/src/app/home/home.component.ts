import { Component, OnInit } from '@angular/core';
import { PEOPLE } from '../_static/people';
import { People } from '../people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  person: People;

  constructor() {
    this.person = PEOPLE[0];
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}

  /**
   * Returns random people
   */
  random() {
    this.person = PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
  }
}
