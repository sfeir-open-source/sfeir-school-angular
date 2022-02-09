import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sfeir-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {
  @Input() person: any;
  @Output('cancel') cancelEvent: EventEmitter<any> = new EventEmitter();
  @Output('submit') submitEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (!this.person) {
      this.person = {};
    }
  }

  cancel() {
    this.cancelEvent.emit();
  }

  add() {
    this.submitEvent.emit(this.person);
  }
}
