import { Component, EventEmitter, Output } from '@angular/core';
import { PeopleForm } from '../../models/people.model';

@Component({
  selector: 'sfeir-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<PeopleForm> = new EventEmitter();

  onSave(person: PeopleForm): void {
    this.save.emit(person);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
