import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sfeir-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {
  @Output('cancel') cancel$: EventEmitter<any>;
  @Output('personAdd') add$: EventEmitter<any>;

  constructor() {
    this.add$ = new EventEmitter();
    this.cancel$ = new EventEmitter();
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {}

  cancel() {
    this.cancel$.emit();
  }

  add(person: any) {
    this.add$.emit(person);
  }
}
