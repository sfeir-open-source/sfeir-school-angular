import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { People } from '../../people.model';

@Component({
  selector: 'sfeir-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
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
    }
  }
  cancel() {
    this.cancelEvent.emit();
  }

  submit() {
    this.submitEvent.emit(this.model);
  }
}
