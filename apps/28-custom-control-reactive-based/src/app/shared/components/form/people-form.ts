import { FormControl, FormGroup, Validators } from '@angular/forms';

type Controls = {
  id: FormControl<string>;
  photo: FormControl<string>;
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
};

export class PersonForm extends FormGroup<Controls> {
  constructor() {
    super({
      id: new FormControl('', { nonNullable: true }),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg', { nonNullable: true }),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, PersonForm.sfeirEmailValidator]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/\d{10}/)]),
    });
  }

  static sfeirEmailValidator(control: FormControl<string>) {
    const email = control.value;
    const sfeirPattern = /^\w+\.\w@sfeir.com$/;
    return sfeirPattern.test(email) ? null : { sfeirEmail: true };
  }
}

export type Person = ReturnType<PersonForm['getRawValue']>;
