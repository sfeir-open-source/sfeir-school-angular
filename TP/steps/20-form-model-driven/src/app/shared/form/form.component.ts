import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'sfeir-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() model: any;
  isUpdateMode: boolean;

  @Output('cancel') cancelEvent: EventEmitter<any>;
  @Output('submit') submitEvent: EventEmitter<any>;

  constructor() {
    this.submitEvent = new EventEmitter();
    this.cancelEvent = new EventEmitter();
    this.model = { address: {} };
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}

  /**
   * Function to handle component update
   *
   * @param record
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue) {
      this.model = record.model.currentValue;
      this.isUpdateMode = Boolean(this.model);
    }
  }
  cancel() {
    this.cancelEvent.emit();
  }

  submit() {
    this.submitEvent.emit(this.model);
  }
}
