import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import type { People } from '../../models/people.model';
import { Form } from './form';

const CANCEL_SPY = jest.fn();
const SAVE_SPY = jest.fn();
const PERSON = {
  firstname: 'John',
  lastname: 'Doe',
  entity: 'Company',
  email: 'john.doe@gmail.com',
  phone: '0123456789',
  manager: 'Jane Doe',
  photo: 'john-doe.jpg',
} as People;

describe('FormComponent', () => {
  let fixture: ComponentFixture<Form>;
  let component: Form;
  let reload: any;

  beforeEach(async () => {
    const { fixture: componentFixture, rerender } = await render(Form, {
      imports: [CommonModule, FormsModule],
      declarations: [Form],
      schemas: [NO_ERRORS_SCHEMA],
      on: {
        cancel: CANCEL_SPY,
        save: SAVE_SPY,
      },
    });
    fixture = componentFixture;
    component = fixture.componentInstance;
    reload = rerender;
  });
  describe('#UI', () => {
    it('should create an instance of FormComponent', () => {
      expect(component).toBeInstanceOf(Form);
    });
    it('should create an input for the firstname', () => {
      const input = screen.getByPlaceholderText('First name');
      expect(input).toBeTruthy();
    });
    it('should create an input for the lastname', () => {
      const input = screen.getByPlaceholderText('Last name');
      expect(input).toBeTruthy();
    });
    it('should create an input for the email', () => {
      const input = screen.getByPlaceholderText('email');
      expect(input).toBeTruthy();
    });
    it('should create an input for the phone', () => {
      const input = screen.getByPlaceholderText('phone');
      expect(input).toBeTruthy();
    });
    it('should disable the submit button', () => {
      TestBed.tick();
      const submitButton = screen.getByText<HTMLButtonElement>('Save');
      expect(submitButton).toBeTruthy();
    });
    test('should correctly bind the input', async () => {
      await reload({ inputs: { person: PERSON }, partialUpdate: true });
      TestBed.tick();
      const firstnameInput = screen.getByPlaceholderText<HTMLInputElement>('First name');
      const lastnameInput = screen.getByPlaceholderText<HTMLInputElement>('Last name');
      const emailInput = screen.getByPlaceholderText<HTMLInputElement>('email');
      const phoneInput = screen.getByPlaceholderText<HTMLInputElement>('phone');
      expect(firstnameInput.value).toEqual('John');
      expect(lastnameInput.value).toEqual('Doe');
      expect(emailInput.value).toEqual('john.doe@gmail.com');
      expect(phoneInput.value).toEqual('0123456789');
    });
  });
  describe('#Functions', () => {
    it('should correctly bind the input', () => {
      const spy = jest.spyOn(component, 'submit');
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
      expect(spy).toHaveBeenCalled();
    });
    it('should call the submit method', () => {
      const spy = jest.spyOn(component, 'submit');
      const submitButton = screen.getByText('Save');
      fireEvent.submit(submitButton);
      expect(spy).toHaveBeenCalled();
    });
    it('should call the save event emitter', () => {
      component.submit();
      expect(SAVE_SPY).toHaveBeenCalled();
      expect(SAVE_SPY).toHaveBeenCalledWith(component.person());
    });
    it('should call the onCancel method', () => {
      const spy = jest.spyOn(component, 'onCancel');
      const cancelButton: HTMLButtonElement = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      expect(spy).toHaveBeenCalled();
    });
    it('should call the cancel event emitter', () => {
      component.onCancel();
      expect(CANCEL_SPY).toHaveBeenCalled();
    });
  });
});
