import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'sfeir-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  private _form: FormGroup;
  @Input() model: any;
  isUpdateMode: boolean;
  @Output('cancel') cancelEvent: EventEmitter<any>;
  @Output('submit') submitEvent: EventEmitter<any>;

  constructor() {
    this.submitEvent = new EventEmitter();
    this.cancelEvent = new EventEmitter();
    this.model = { address: {} };
    this._form = this.buildForm();
  }
  /**
   * OnInit implementation
   */
  ngOnInit() {}

  /**
   * Function to handle component update
   *
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue) {
      this.model = record.model.currentValue;
      this.isUpdateMode = Boolean(this.model);
      this._form.patchValue(this.model);
    }
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this.cancelEvent.emit();
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(person: any) {
    this.submitEvent.emit(person);
  }

  /**
   * Function to build our form
   *
   *
   */
  private buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.compose([Validators.required, CustomValidators.sfeirEmail])),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
      address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        postalCode: new FormControl('')
      }),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('\\d{10}')])),
      isManager: new FormControl('')
    });
  }

  get form(): FormGroup {
    return this._form;
  }
}
