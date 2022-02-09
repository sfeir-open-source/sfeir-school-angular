import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'sfeir-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {
  @Input() person: any;
  @Output('cancel') cancelEvent: EventEmitter<any> = new EventEmitter();
  @Output('submit') submitEvent: EventEmitter<any> = new EventEmitter();
  personForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.personForm = new FormGroup({
      id: new FormControl(null),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, CustomValidators.sfeirEmail]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/\d{10}/)])
    });
    if (this.person) {
      this.personForm.patchValue(this.person);
    }
  }

  cancel() {
    this.cancelEvent.emit();
  }

  add() {
    this.submitEvent.emit(this.personForm.value);
  }
}
