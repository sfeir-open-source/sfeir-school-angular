import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PeopleForm } from '../../models/people.model';

export class PersonForm extends FormGroup {
  override value: PeopleForm;
  override controls: Record<keyof PeopleForm, FormControl>;

  constructor(data?: PeopleForm) {
    super({
      id: new FormControl(null),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, PersonForm.sfeirEmailValidator]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/\d{10}/)]),
    });

    !!data && this.patchValue(data);
  }

  static sfeirEmailValidator(c: FormControl): ValidationErrors {
    const regex = /^\w+.\w@sfeir.com$/;
    return regex.test(c.value) ? null : { sfeirEmail: true };
  }
}
