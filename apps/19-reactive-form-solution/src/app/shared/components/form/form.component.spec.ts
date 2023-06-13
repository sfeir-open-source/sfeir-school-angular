import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { People } from '../../models/people.model';
import { FormComponent } from './form.component';

const CANCEL_SPY = jest.fn();
const SAVE_SPY = jest.fn();
const PERSON = { lastname: 'SFEIR', firstname: 'SFEIR', email: 'sfeir.s@sfeir.com', phone: '0123456789', photo: 'person.jpg' } as People;

describe('FormComponent', () => {
  let componentFixture: ComponentFixture<FormComponent>;
  let component: FormComponent;
  let reload: any;
  beforeEach(async () => {
    const { fixture, rerender } = await render(FormComponent, {
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [FormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        person: null,
        cancel: {
          emit: CANCEL_SPY,
        } as any,
        save: {
          emit: SAVE_SPY,
        } as any,
      },
    });
    componentFixture = fixture;
    component = fixture.componentInstance;
    reload = rerender;
  });
  describe('#UI', () => {
    test('should disable the submit button', fakeAsync(async () => {
      await componentFixture.whenStable();
      componentFixture.detectChanges();
      const submitButton = screen.getByText<HTMLButtonElement>('Save');
      expect(submitButton.disabled).toBeTruthy();
    }));
    test('should create an instance of FormComponent', () => {
      expect(component).toBeInstanceOf(FormComponent);
    });
    test('should create an input for the firstname', () => {
      const input = screen.getByPlaceholderText('First name');
      expect(input).toBeTruthy();
    });
    test('should create an input for the lastname', () => {
      const input = screen.getByPlaceholderText('Last name');
      expect(input).toBeTruthy();
    });
    test('should create an input for the email', () => {
      const input = screen.getByPlaceholderText('email');
      expect(input).toBeTruthy();
    });
    test('should create an input for the phone', () => {
      const input = screen.getByPlaceholderText('phone');
      expect(input).toBeTruthy();
    });
    test('should correctly bind the input', async () => {
      const spy = jest.spyOn(component.personForm, 'patchValue');
      await reload({ componentProperties: { person: PERSON } });
      const firstnameInput = screen.getByPlaceholderText<HTMLInputElement>('First name');
      const lastnameInput = screen.getByPlaceholderText<HTMLInputElement>('Last name');
      const emailInput = screen.getByPlaceholderText<HTMLInputElement>('email');
      const phoneInput = screen.getByPlaceholderText<HTMLInputElement>('phone');
      expect(spy).toHaveBeenCalledWith(PERSON);
      expect(firstnameInput.value).toEqual('SFEIR');
      expect(lastnameInput.value).toEqual('SFEIR');
      expect(emailInput.value).toEqual('sfeir.s@sfeir.com');
      expect(phoneInput.value).toEqual('0123456789');
    });
  });
  describe('#Functions', () => {
    test('should correctly bind the input', () => {
      const spy = jest.spyOn(component, 'onSave');
      const personForm = screen.getByTestId('person-form');
      const firstnameInput: HTMLInputElement = screen.getByPlaceholderText('First name');
      const lastnameInput: HTMLInputElement = screen.getByPlaceholderText('Last name');
      const emailInput: HTMLInputElement = screen.getByPlaceholderText('email');
      const phoneInput: HTMLInputElement = screen.getByPlaceholderText('phone');
      const ngSubmitEvent = new CustomEvent('ngSubmit');
      fireEvent.input(firstnameInput, { target: { value: 'SFEIR' } });
      fireEvent.input(lastnameInput, { target: { value: 'SFEIR' } });
      fireEvent.input(emailInput, { target: { value: 's.sfeir@sfeir.com' } });
      fireEvent.input(phoneInput, { target: { value: '0123456789' } });
      fireEvent(personForm, ngSubmitEvent);
      const submitButton = screen.getByText<HTMLButtonElement>('Save');
      expect(submitButton.disabled).toBeFalsy();
      expect(spy).toHaveBeenCalled();
      expect(component.personForm.value).toEqual({
        id: null,
        firstname: 'SFEIR',
        lastname: 'SFEIR',
        email: 's.sfeir@sfeir.com',
        phone: '0123456789',
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
      });
    });
    test('should call the onSave method', () => {
      const spy = jest.spyOn(component, 'onSave');
      const submitButton = screen.getByText('Save');
      fireEvent.submit(submitButton);
      expect(spy).toHaveBeenCalled();
    });
    test('should call the save event emitter', () => {
      expect(SAVE_SPY).toHaveBeenCalled();
    });
    test('should call the onCancel method', () => {
      const spy = jest.spyOn(component, 'onCancel');
      const cancelButton: HTMLButtonElement = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      expect(spy).toHaveBeenCalled();
    });
    test('should call the cancel event emitter', () => {
      component.onCancel();
      expect(CANCEL_SPY).toHaveBeenCalled();
    });
  });
});
