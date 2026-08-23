import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { submit } from '@angular/forms/signals';
import { UpsertPersonBody } from '@sfeir/types';
import { createPersonForm } from './person-form';

const DEFAULT_PHOTO = 'https://randomuser.me/api/portraits/lego/6.jpg';

const EMPTY_PERSON: UpsertPersonBody = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  photo: DEFAULT_PHOTO,
};

const buildForm = (model = EMPTY_PERSON, callback: (value: UpsertPersonBody) => void | Promise<void> = () => void 0) =>
  TestBed.runInInjectionContext(() => createPersonForm(signal(model), field => callback(field().value())));

describe('createPersonForm', () => {
  describe('Instance', () => {
    it('should be invalid when empty', () => {
      const form = buildForm();
      expect(form().invalid()).toBe(true);
    });
  });

  describe('firstname', () => {
    it('should require the firstname', () => {
      const form = buildForm();
      expect(form.firstname().invalid()).toBe(true);
      expect(form.firstname().errors()).toEqual([expect.objectContaining({ kind: 'required' })]);
    });
    it('should require the firstname to be at least 2 characters long', () => {
      const form = buildForm();
      form.firstname().value.set('J');
      expect(form.firstname().errors()).toEqual([expect.objectContaining({ kind: 'minLength' })]);
    });
    it('should become valid once the firstname has at least 2 characters', () => {
      const form = buildForm();
      form.firstname().value.set('Jo');
      expect(form.firstname().valid()).toBe(true);
      expect(form.firstname().errors()).toEqual([]);
    });
  });

  describe('lastname', () => {
    it('should require the lastname', () => {
      const form = buildForm();
      expect(form.lastname().invalid()).toBe(true);
      expect(form.lastname().errors()).toEqual([expect.objectContaining({ kind: 'required' })]);
    });
    it('should require the lastname to be at least 2 characters long', () => {
      const form = buildForm();
      form.lastname().value.set('D');
      expect(form.lastname().errors()).toEqual([expect.objectContaining({ kind: 'minLength' })]);
    });
    it('should become valid once the lastname has at least 2 characters', () => {
      const form = buildForm();
      form.lastname().value.set('Doe');
      expect(form.lastname().valid()).toBe(true);
    });
  });

  describe('email', () => {
    it('should require the email', () => {
      const form = buildForm();
      expect(form.email().errors()).toEqual([expect.objectContaining({ kind: 'required' })]);
    });
    it('should reject an email that does not match the Sfeir pattern', () => {
      const form = buildForm();
      form.email().value.set('john.doe@gmail.com');
      expect(form.email().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'sfeirEmail' })]));
    });
    it('should accept a valid Sfeir email', () => {
      const form = buildForm();
      form.email().value.set('john.d@sfeir.com');
      expect(form.email().valid()).toBe(true);
      expect(form.email().errors()).toEqual([]);
    });
  });

  describe('phone', () => {
    it('should require the phone', () => {
      const form = buildForm();
      expect(form.phone().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'required' })]));
    });
    it('should reject a phone number that is not 10 digits', () => {
      const form = buildForm();
      form.phone().value.set('123');
      expect(form.phone().errors()).toEqual(expect.arrayContaining([expect.objectContaining({ kind: 'pattern' })]));
    });
    it('should accept a phone number with exactly 10 digits', () => {
      const form = buildForm();
      form.phone().value.set('0102030405');
      expect(form.phone().valid()).toBe(true);
      expect(form.phone().errors()).toEqual([]);
    });
  });

  describe('submission', () => {
    const validPerson: UpsertPersonBody = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.d@sfeir.com',
      phone: '0102030405',
      photo: DEFAULT_PHOTO,
    };

    it('should call the submission callback with the form value when the form is valid', async () => {
      const callback = vi.fn();
      const form = buildForm(validPerson, callback);
      await TestBed.runInInjectionContext(() => submit(form));
      expect(callback).toHaveBeenCalledExactlyOnceWith(validPerson);
    });
    it('should not call the submission callback when the form is invalid', async () => {
      const callback = vi.fn();
      const form = buildForm(EMPTY_PERSON, callback);
      await TestBed.runInInjectionContext(() => submit(form));
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
