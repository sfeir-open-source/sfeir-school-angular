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
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly peopleService: PeopleService
  ) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.route.data.subscribe(({ user }: { user: object }): object => (this.person = user));
  }

  submit(person: any) {
    this.peopleService.update(person).subscribe(() => this.router.navigate(['/people']));
  }

  cancel() {
    this.router.navigate(['/people']);
  }
}
