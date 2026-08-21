import { Component, output } from '@angular/core';
import { UpsertPersonBody } from '@sfeir/types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sfeir-template-form',
  templateUrl: './template-form.html',
  styleUrl: './template-form.scss',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, NgOptimizedImage],
})
export class TemplateForm {
  public readonly cancelForm = output<void>();
  public readonly submitForm = output<UpsertPersonBody>();

  cancel(): void {
    this.cancelForm.emit();
  }

  submit(data: UpsertPersonBody): void {
    this.submitForm.emit(data);
  }
}
