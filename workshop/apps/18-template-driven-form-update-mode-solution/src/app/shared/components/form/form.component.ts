import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { People, PeopleForm } from '../../models/people.model';

@Component({
  selector: 'sfeir-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() person: People;
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<PeopleForm> = new EventEmitter();

  ngOnInit(): void {
    this.person ||= { photo: 'https://randomuser.me/api/portraits/lego/6.jpg' } as People;
  }

  onSave(): void {
    this.save.emit(this.person);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
