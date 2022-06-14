import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pluck } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People, PeopleForm } from '../../shared/models/people.model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'sfeir-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class UpdatePersonComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly peopleService = inject(PeopleService);

  person$: Observable<People>;

  ngOnInit(): void {
    this.person$ = this.route.data.pipe(pluck('personDetails'));
  }

  updatePerson(person: PeopleForm): void {
    this.peopleService.updatePerson(person).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
