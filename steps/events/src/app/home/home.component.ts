import { Component, OnInit } from '@angular/core';
import { PEOPLE } from '../_static/people';

@Component({
  selector: 'sfeir-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  public person: any;

  constructor() {
    this.person = PEOPLE[0];
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}
}
