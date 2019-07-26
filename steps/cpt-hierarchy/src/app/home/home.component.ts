import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sfeir-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  name: string;

  constructor() {
    this.name = 'Angular';
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}
}
