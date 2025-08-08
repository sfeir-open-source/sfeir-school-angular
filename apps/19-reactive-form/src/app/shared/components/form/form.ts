import { NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeopleForm } from '../../models/people.model';

@Component({
  selector: 'sfeir-form',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  imports: [NgOptimizedImage, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class Form {
  person = input<PeopleForm>({ photo: 'https://randomuser.me/api/portraits/lego/6.jpg' } as PeopleForm);
  cancel = output<void>();
  save = output<PeopleForm>();

  submit(): void {
    this.save.emit(this.person());
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
