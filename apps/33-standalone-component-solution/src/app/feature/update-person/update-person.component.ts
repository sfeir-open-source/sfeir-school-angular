import { AsyncPipe, Location } from '@angular/common';
import { Component, inject, Input as RouterInput } from '@angular/core';
import { PeopleService } from '../../core/providers/people.service';
import { FormComponent } from '../../shared/components/form/form.component';
import { People, PeopleForm } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss'],
  standalone: true,
  imports: [AsyncPipe, FormComponent],
})
export class UpdatePersonComponent {
  @RouterInput({ required: true }) personDetails: People;

  readonly #location = inject(Location);
  readonly #peopleService = inject(PeopleService);

  updatePerson(person: PeopleForm): void {
    this.#peopleService.updatePerson(person).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.#location.back();
  }
}
