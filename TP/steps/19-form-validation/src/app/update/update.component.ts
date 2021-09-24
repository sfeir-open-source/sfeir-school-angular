import { map, mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../shared/people-service';
import { People } from '../people.model';

@Component({
  selector: 'sfeir-update',
  templateUrl: 'update.component.html',
  styleUrls: ['update.component.css']
})
export class UpdateComponent implements OnInit {
  person: People;

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
    this.route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this.peopleService.fetchOne(id))
      )
      .subscribe((person: any) => (this.person = person));
  }

  submit(person: People) {
    this.peopleService.update(person).subscribe(async () => {
      await this.router.navigate(['/people']);
    });
  }

  async cancel() {
    await this.router.navigate(['/people']);
  }
}
