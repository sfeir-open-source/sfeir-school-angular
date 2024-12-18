import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People, PeopleForm } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss'],
  standalone: false,
})
export class UpdatePersonComponent implements OnInit {
  person$: Observable<People> = EMPTY;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly peopleService: PeopleService,
  ) {}

  ngOnInit(): void {
    this.person$ = this.route.data.pipe(map(({ personDetails }) => personDetails));
  }

  updatePerson(person: PeopleForm): void {
    this.peopleService.updatePerson(person).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
