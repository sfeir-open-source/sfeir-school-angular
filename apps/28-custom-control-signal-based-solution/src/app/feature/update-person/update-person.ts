import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { PeopleService } from '../../core/providers/people.service';
import { Form } from '../../shared/components/form/form';
import { People, type PeopleForm } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-update-person',
  templateUrl: './update-person.html',
  styleUrl: './update-person.scss',
  imports: [Form],
})
export class UpdatePerson {
  private readonly peopleService = inject(PeopleService);
  private readonly location = inject(Location);

  person = input.required<People>();

  updatePerson(person: PeopleForm): void {
    this.peopleService.updatePerson(person).subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
