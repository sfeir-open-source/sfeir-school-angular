import { AbstractControl, FormControl, FormGroup, isFormControl, ValidationErrors, Validators } from '@angular/forms';

type Controls = {
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  photo: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
};

const SFEIR_EMAIL_PATTERN = /^\w+\.\w@sfeir.com$/;

export function SfeirEmailValidator(control: AbstractControl<string>): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  if (!isFormControl(control)) {
    return null;
  }

  return SFEIR_EMAIL_PATTERN.test(value) ? null : { sfeirEmail: true };
}

export class PersonForm extends FormGroup<Controls> {
  constructor() {
    super({
      firstname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
      lastname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
      photo: new FormControl<string>('https://randomuser.me/api/portraits/lego/6.jpg', { nonNullable: true }),
      email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, SfeirEmailValidator] }),
      phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{10}$/)] }),
    });
  }
}
