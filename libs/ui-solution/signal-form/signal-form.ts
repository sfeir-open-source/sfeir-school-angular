import { NgOptimizedImage } from '@angular/common';
import { Component, input, linkedSignal, output } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { Person, UpsertPersonBody } from '@sfeir/types';
import { CustomInput } from './custom-input/custom-input';
import { createPersonForm } from './person-form';

@Component({
  selector: 'sfeir-signal-form',
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.scss',
  imports: [MatButtonModule, FormField, FormRoot, NgOptimizedImage, CustomInput],
})
export class SignalForm {
  public readonly person = input<Person | undefined>();
  public readonly submitForm = output<UpsertPersonBody>();
  public readonly cancelForm = output<void>();
  private readonly _model = linkedSignal(() => ({
    firstname: this.person()?.firstname ?? '',
    lastname: this.person()?.lastname ?? '',
    email: this.person()?.email ?? '',
    phone: this.person()?.phone ?? '',
    photo: this.person()?.photo ?? 'https://randomuser.me/api/portraits/lego/6.jpg',
  }));
  protected readonly _form = createPersonForm(this._model, field => this.submitForm.emit(field().value()));

  cancel(): void {
    this.cancelForm.emit();
  }
}
