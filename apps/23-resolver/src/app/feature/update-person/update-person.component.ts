import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People, PeopleForm } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss'],
})
export class UpdatePersonComponent implements OnInit {
  person$: Observable<People> = EMPTY;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly peopleService: PeopleService,
  ) {}

  ngOnInit(): void {
    this.person$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.peopleService.getPersonDetails(id)),
    );
  }

  updatePerson(person: PeopleForm): void {
    this.peopleService.updatePerson(person).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
