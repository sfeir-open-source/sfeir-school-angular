import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class FormComponent implements OnChanges {
  @Input() person: People;
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<PeopleForm> = new EventEmitter();
  personForm = new PersonForm();

  ngOnChanges(changes: SimpleChanges): void {
    const { person } = changes;
    if (person.currentValue !== person.previousValue) {
      this.personForm.patchValue(this.person);
    }
  }

  onSave(): void {
    this.save.emit(this.personForm.getRawValue());
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
