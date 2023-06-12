import { PersonForm } from './form';

describe('Form', () => {
  let form: PersonForm;

  beforeEach(() => {
    form = new PersonForm();
  });

  test('should create an instance of PersonForm', () => {
    expect(form).toBeInstanceOf(PersonForm);
  });
  test('should have the following controls: id, photo, firstname, lastname, email, phone', () => {
    const controls = ['id', 'photo', 'firstname', 'lastname', 'email', 'phone'];
    expect(Object.keys(form.controls)).toEqual(controls);
  });
  test('should have a default value for the control photo', () => {
    expect(form.controls.photo.value).toEqual('https://randomuser.me/api/portraits/lego/6.jpg');
  });
  test('should the firstname control be required and have a minimum length of 2', () => {
    expect(form.controls.firstname.errors).toEqual({ required: true });
    form.controls.firstname.patchValue('a');
    expect(form.controls.firstname.errors).toEqual({ minlength: { requiredLength: 2, actualLength: 1 } });
  });
  test('should the lastname control be required and have a minimum length of 2', () => {
    expect(form.controls.lastname.errors).toEqual({ required: true });
    form.controls.lastname.patchValue('a');
    expect(form.controls.lastname.errors).toEqual({ minlength: { requiredLength: 2, actualLength: 1 } });
  });
  test('should the email controls be required and have the validator sfeirEmail', () => {
    expect(form.controls.email.errors).toEqual({ required: true });
    form.controls.email.patchValue('a');
    expect(form.controls.email.errors).toEqual({ sfeirEmail: true });
  });
  test('should the phone be required and have a pattern of 10 digits', () => {
    expect(form.controls.phone.errors).toEqual({ required: true });
    form.controls.phone.patchValue('123456789');
    expect(form.controls.phone.errors).toEqual({ pattern: { requiredPattern: '/\\d{10}/', actualValue: '123456789' } });
  });
  test('should the form with data if provided', () => {
    const data = {
      id: '1',
      photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
      firstname: 'John',
      lastname: 'Doe',
      email: 'doe.j@sfeir.com',
      phone: '0123456789',
    };
    form = new PersonForm(data);
    expect(form.value).toEqual(data);
  });
});
