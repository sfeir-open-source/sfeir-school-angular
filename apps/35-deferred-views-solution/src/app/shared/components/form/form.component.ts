import { Component, effect, input, output } from '@angular/core';
import { People, PeopleForm } from '../../models/people.model';
import { PersonForm } from './form';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent, MatFormFieldModule, MatButtonModule, NgOptimizedImage],
  selector: 'sfeir-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  person = input<People | undefined>();
  cancel = output<void>();
  save = output<PeopleForm>();
  personForm = new PersonForm();

  #updatePersonFormEffect = effect(() => {
    const person = this.person();
    if (person) {
      this.personForm.patchValue(person);
    }
  });

  onSave(): void {
    this.save.emit(this.personForm.getRawValue());
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
