import { FormControl, FormGroup, UntypedFormControl, ValidationErrors, Validators } from '@angular/forms';
import { PeopleForm } from '../../models/people.model';

export interface PersonFormGroup {
  id: FormControl<string | null>;
  photo: FormControl<string>;
  firstname: FormControl<string | null>;
  lastname: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}

export class PersonForm extends FormGroup<PersonFormGroup> {
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

  static sfeirEmailValidator(c: UntypedFormControl): ValidationErrors {
    const regex = /^\w+.\w@sfeir.com$/;
    return regex.test(c.value) ? null : { sfeirEmail: true };
  }
}
