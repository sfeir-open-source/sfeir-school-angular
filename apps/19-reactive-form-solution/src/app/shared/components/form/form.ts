import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PeopleForm } from '../../models/people.model';

export class PersonForm extends UntypedFormGroup {
  override value: PeopleForm;
  override controls: Record<keyof PeopleForm, UntypedFormControl>;

  constructor(data?: PeopleForm) {
    super({
      id: new UntypedFormControl(null),
      photo: new UntypedFormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
      firstname: new UntypedFormControl(null, [Validators.required, Validators.minLength(2)]),
      lastname: new UntypedFormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new UntypedFormControl(null, Validators.required),
      phone: new UntypedFormControl(null, [Validators.required, Validators.pattern(/\d{10}/)]),
    });

    !!data && this.patchValue(data);
  }
}
