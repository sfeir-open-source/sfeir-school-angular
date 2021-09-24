import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { People } from '../../people.model';

@Component({
  selector: 'sfeir-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {
  @Output('cancel') cancelEvent: EventEmitter<any>;
  @Output('personAdd') add: EventEmitter<People>;

  constructor() {
    this.add = new EventEmitter();
    this.cancelEvent = new EventEmitter();
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}

  cancel() {
    this.cancelEvent.emit();
  }

  addPerson(person: People) {
    this.add.emit(person);
  }
}
