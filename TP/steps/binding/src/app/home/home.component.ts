import { Component, OnInit } from '@angular/core';
import { People } from '../people.model';

@Component({
  selector: 'sfeir-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  name: string;
  people: People;

  constructor() {
    this.name = 'Angular';
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}
}
