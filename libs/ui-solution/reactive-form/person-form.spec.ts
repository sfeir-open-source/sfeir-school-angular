import { FormControl } from '@angular/forms';
import { PersonForm, SfeirEmailValidator } from './person-form';

describe('PersonForm', () => {
  describe('Instance', () => {
    it('should create an instance of PersonForm', () => {
      expect(new PersonForm()).toBeInstanceOf(PersonForm);
    });
    it('should default the photo control to the placeholder photo', () => {
      expect(new PersonForm().controls.photo.value).toBe('https://randomuser.me/api/portraits/lego/6.jpg');
    });
    it('should default the other controls to an empty string', () => {
      const form = new PersonForm();
      expect(form.controls.firstname.value).toBe('');
      expect(form.controls.lastname.value).toBe('');
      expect(form.controls.email.value).toBe('');
      expect(form.controls.phone.value).toBe('');
    });
    it('should be invalid when empty', () => {
      expect(new PersonForm().valid).toBe(false);
    });
    it('should be valid when filled with correct values', () => {
      const form = new PersonForm();
      form.setValue({
        firstname: 'John',
        lastname: 'Doe',
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        email: 'john.d@sfeir.com',
        phone: '0102030405',
      });
      expect(form.valid).toBe(true);
    });
  });

  describe('Logic', () => {
    it('should require the firstname to be at least 2 characters long', () => {
      const form = new PersonForm();
      form.controls.firstname.setValue('J');
      expect(form.controls.firstname.errors).toEqual({ minlength: expect.any(Object) });
    });
    it('should require the lastname to be at least 2 characters long', () => {
      const form = new PersonForm();
      form.controls.lastname.setValue('D');
      expect(form.controls.lastname.errors).toEqual({ minlength: expect.any(Object) });
    });
    it('should require the phone to match a 10-digit pattern', () => {
      const form = new PersonForm();
      form.controls.phone.setValue('123');
      expect(form.controls.phone.errors).toEqual({ pattern: expect.any(Object) });
    });
    it('should accept a phone number with exactly 10 digits', () => {
      const form = new PersonForm();
      form.controls.phone.setValue('0102030405');
      expect(form.controls.phone.errors).toBeNull();
    });
    it('should not validate the photo control when it is cleared', () => {
      const form = new PersonForm();
      form.controls.photo.setValue('');
      expect(form.controls.photo.errors).toBeNull();
    });
  });

  describe('SfeirEmailValidator', () => {
    it('should return null when the value is empty', () => {
      expect(SfeirEmailValidator(new FormControl('', { nonNullable: true }))).toBeNull();
    });
    it('should return null when the email matches the Sfeir email pattern', () => {
      expect(SfeirEmailValidator(new FormControl('john.d@sfeir.com', { nonNullable: true }))).toBeNull();
    });
    it('should return a sfeirEmail error when the email has more than one character after the dot', () => {
      expect(SfeirEmailValidator(new FormControl('john.doe@sfeir.com', { nonNullable: true }))).toEqual({ sfeirEmail: true });
    });
    it('should return a sfeirEmail error when the domain is not sfeir.com', () => {
      expect(SfeirEmailValidator(new FormControl('john.d@gmail.com', { nonNullable: true }))).toEqual({ sfeirEmail: true });
    });
    it('should return null when the control is not a FormControl instance', () => {
      expect(SfeirEmailValidator({ value: 'invalid-email' } as never)).toBeNull();
    });
  });
});
