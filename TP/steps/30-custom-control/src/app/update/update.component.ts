import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../shared/people-service';

@Component({
  selector: 'sfeir-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  person: any;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _peopleService: PeopleService) {
    this.person = {
      address: {}
    };
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.data.subscribe(({ user }: { user: object }): object => (this.person = user));
  }

  submit(person: any) {
    this._peopleService.update(person).subscribe(() => this._router.navigate(['/people']));
  }

  cancel() {
    this._router.navigate(['/people']);
  }
}
