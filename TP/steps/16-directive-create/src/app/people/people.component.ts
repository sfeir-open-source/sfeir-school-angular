import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PeopleService } from '../shared/people-service';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  people;
  view = 'card';

  constructor(public dialog: MatDialog, private _peopleService: PeopleService) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._peopleService.fetch().subscribe(people => (this.people = people));
  }

  delete(person: any) {
    this._peopleService.delete(person.id).subscribe(people => (this.people = people));
  }

  switchView() {
    this.view = this.view === 'card' ? 'list' : 'card';
  }
}
