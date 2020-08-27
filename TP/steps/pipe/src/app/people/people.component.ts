import { Component, OnInit } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { PeopleService } from '../shared/people-service';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  people;

  constructor(private readonly _peopleService: PeopleService) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._peopleService.fetch().subscribe(people => (this.people = people));
  }

  delete(person: any) {
    this._peopleService.delete(person.id).subscribe(people => (this.people = people));
  }

  add(person: any) {
    this._peopleService
      .update(person)
      .pipe(mergeMap(() => this._peopleService.fetch()))
      .subscribe((people: any[]) => {
        this.people = people;
      });
  }
}
