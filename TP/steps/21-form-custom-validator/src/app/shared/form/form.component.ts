import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { People } from '../../people.model';

@Component({
  selector: 'sfeir-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() model: People = {
    address: { city: '', postalCode: 0, street: '' },
    birthDate: '',
    email: '',
    entity: '',
    entryDate: '',
    firstname: '',
    gender: '',
    geo: { lat: 0, lng: 0 },
    id: '',
    isManager: false,
    lastname: '',
    links: { github: '', linkedin: '', slack: '', twitter: '' },
    manager: '',
    managerId: '',
    phone: '',
    photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
    skills: []
  };
  isUpdateMode: boolean;

  @Output('cancel') cancelEvent: EventEmitter<any>;
  @Output('submit') submitEvent: EventEmitter<any>;

  constructor() {
    this.submitEvent = new EventEmitter();
    this.cancelEvent = new EventEmitter();
    this.form = this.buildForm();
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
    if (record?.model?.currentValue) {
      this.model = record.model.currentValue;
      this.isUpdateMode = Boolean(this.model);
      this.form.patchValue(this.model);
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
   * @returns {FormGroup}
   *
   * @private
   */
  private buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.required),
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
}
