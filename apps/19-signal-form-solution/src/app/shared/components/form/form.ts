import { NgOptimizedImage } from '@angular/common';
import { Component, input, linkedSignal, output } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { createPeopleForm, type Person } from './people-form';

const DEFAULT_PERSON: Person = {
  id: '',
  photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
} satisfies Person;

@Component({
  selector: 'sfeir-form',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  imports: [NgOptimizedImage, MatFormFieldModule, MatInputModule, MatButtonModule, FormField, FormRoot],
})
export class Form {
  person = input<Person>(DEFAULT_PERSON);
  cancel = output<void>();
  save = output<Person>();

  defaultPersonForm = linkedSignal(this.person);

  peopleForm = createPeopleForm(this.defaultPersonForm, () => this.submit());

  submit(): void {
    this.save.emit(this.peopleForm().value());
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
