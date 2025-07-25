import { Component, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PeopleForm } from '../../models/people.model';

@Component({
  selector: 'sfeir-form',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  imports: [NgOptimizedImage, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class Form {
  cancel = output<void>();
  save = output<PeopleForm>();

  submit(personForm: PeopleForm): void {
    this.save.emit(personForm);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
