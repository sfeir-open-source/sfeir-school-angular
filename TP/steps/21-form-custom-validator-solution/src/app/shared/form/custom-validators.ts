import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  /**
   * Function to control email with custom validator
   *
   * @param control
   *
   * @returns {{sfeirEmail: boolean}}
   */
  static sfeirEmail(control: FormControl): ValidationErrors | null {
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
