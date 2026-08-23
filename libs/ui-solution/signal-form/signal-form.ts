import { NgOptimizedImage } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpsertPersonBody } from '@sfeir/types';
import { createPersonForm } from './person-form';

@Component({
  selector: 'sfeir-signal-form',
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.scss',
  imports: [MatButtonModule, FormField, FormRoot, MatFormFieldModule, MatInputModule, NgOptimizedImage],
})
export class SignalForm {
  public readonly submitForm = output<UpsertPersonBody>();
  public readonly cancelForm = output<void>();
  private readonly _model = signal<UpsertPersonBody>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
  });

  protected readonly _form = createPersonForm(this._model, field => this.submitForm.emit(field().value()));

  cancel(): void {
    this.cancelForm.emit();
  }
}
