import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createPeopleForm, type Person } from './people-form';
import { vi } from 'vitest';

const DEFAULT_PERSON: Person = {
  id: '',
  photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
};

describe('Form', () => {
  let personModel: ReturnType<typeof signal<Person>>;
  let form: ReturnType<typeof createPeopleForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    TestBed.runInInjectionContext(() => {
      personModel = signal({ ...DEFAULT_PERSON });
      form = createPeopleForm(personModel, vi.fn());
    });
  });

  test('should create a people form', () => {
    expect(form).toBeTruthy();
  });

  test('should have the following fields: id, photo, firstname, lastname, email, phone', () => {
    const fields = ['id', 'photo', 'firstname', 'lastname', 'email', 'phone'];
    expect(Object.keys(form().value())).toEqual(fields);
  });

  test('should have a default value for the field photo', () => {
    expect(form.photo().value()).toEqual('https://randomuser.me/api/portraits/lego/6.jpg');
  });

  test('should the firstname field be required and have a minimum length of 2', () => {
    expect(form.firstname().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'required' })]));
    personModel.update(person => ({ ...person, firstname: 'a' }));
    expect(form.firstname().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'minLength' })]));
  });

  test('should the lastname field be required and have a minimum length of 2', () => {
    expect(form.lastname().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'required' })]));
    personModel.update(person => ({ ...person, lastname: 'a' }));
    expect(form.lastname().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'minLength' })]));
  });

  test('should the email field be invalid when the value is not a valid sfeir email', () => {
    expect(form.email().errors()).toEqual([]);
    personModel.update(person => ({ ...person, email: 'a' }));
    expect(form.email().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'pattern' })]));
  });

  test('should the phone field have a pattern of 10 digits', () => {
    expect(form.phone().errors()).toEqual([]);
    personModel.update(person => ({ ...person, phone: '123456789' }));
    expect(form.phone().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'pattern' })]));
    personModel.update(person => ({ ...person, phone: '0123456789' }));
    expect(form.phone().errors()).toEqual([]);
  });
});
