import { WritableSignal } from '@angular/core';
import { apply, form, minLength, pattern, required, schema } from '@angular/forms/signals';

export type Person = {
  id: string;
  photo: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};

export const namesSchema = schema<string>(names => {
  required(names, { message: 'This field is required' });
  minLength(names, 2, { message: 'This field must be at least 2 characters long' });
});

const schemaPerson = schema<Person>(person => {
  required(person.photo);
  apply(person.firstname, namesSchema);
  apply(person.lastname, namesSchema);
  pattern(person.email, /^\w+\.\w@sfeir.com$/, { message: 'This field must be a valid sfeir email address' });
  pattern(person.phone, /\d{10}/, { message: 'This field must be a valid phone number' });
});

export const createPeopleForm = (person: WritableSignal<Person>, callBackSubmit: () => void) =>
  form(person, schemaPerson, { submission: { action: async () => callBackSubmit() } });
