import { NgOptimizedImage } from '@angular/common';
import { Component, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UpsertPersonBody } from '@sfeir/types';
import { CustomInput } from './custom-input/custom-input';
import { PersonForm } from './person-form';

@Component({
  selector: 'sfeir-reactive-form',
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
  imports: [ReactiveFormsModule, MatButtonModule, NgOptimizedImage, CustomInput],
})
export class ReactiveForm {
  protected readonly _personForm = new PersonForm();

  public readonly cancelForm = output<void>();
  public readonly submitForm = output<UpsertPersonBody>();

  submit(body: UpsertPersonBody): void {
    this.submitForm.emit(body);
  }

  cancel(): void {
    this.cancelForm.emit();
  }
}
