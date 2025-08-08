import { NgOptimizedImage } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { type Person, PersonForm } from './people-form';

@Component({
  selector: 'sfeir-form',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  imports: [NgOptimizedImage, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class Form {
  person = input<Person>({ photo: 'https://randomuser.me/api/portraits/lego/6.jpg' } as Person);
  cancel = output<void>();
  save = output<Person>();

  peopleForm = new PersonForm();

  constructor() {
    effect(() => {
      const person = this.person();
      if (person) {
        this.peopleForm.patchValue(person, { emitEvent: false });
      }
    });
  }

  submit(): void {
    this.save.emit(this.peopleForm.getRawValue());
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
