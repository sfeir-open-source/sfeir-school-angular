import { FormControl } from '@angular/forms';

export class CustomValidators {
  /**
   * Function to control email with custom validator
   *
   */
  static sfeirEmail(control: FormControl) {
    // email regex
    const regex = /^\w+\.\w@sfeir\.com$/;

    // returns control
    return regex.test(control.value)
      ? null
      : {
          sfeirEmail: true
        };
  }
}
