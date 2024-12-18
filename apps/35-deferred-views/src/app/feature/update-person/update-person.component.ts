import { Location } from '@angular/common';
import { Component, inject, input as routerInput } from '@angular/core';
import { PeopleService } from '../../core/providers/people.service';
import { FormComponent } from '../../shared/components/form/form.component';
import { People, PeopleForm } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss'],
  imports: [FormComponent],
})
export class UpdatePersonComponent {
  readonly #location = inject(Location);
  readonly #peopleService = inject(PeopleService);

  personDetails = routerInput.required<People | null>(null);

  updatePerson(person: PeopleForm): void {
    this.#peopleService.updatePerson(person).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.#location.back();
  }
}
