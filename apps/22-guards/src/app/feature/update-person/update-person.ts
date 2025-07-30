import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PeopleService } from '../../core/providers/people.service';
import { Form } from '../../shared/components/form/form';
import type { PeopleForm } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-update-person',
  templateUrl: './update-person.html',
  styleUrl: './update-person.scss',
  imports: [Form],
})
export class UpdatePerson {
  private readonly peopleService = inject(PeopleService);
  private readonly location = inject(Location);

  id = input.required<string>();
  peopleResource = rxResource({
    params: this.id,
    stream: ({ params: personId }) => this.peopleService.getPersonDetails(personId),
  });

  updatePerson(person: PeopleForm): void {
    this.peopleService.updatePerson(person).subscribe(() => this.goBack());
  }

  goBack() {
    this.location.back();
  }
}
