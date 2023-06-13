import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { PeopleForm } from '../../models/people.model';
import { FormComponent } from './form.component';

const CANCEL_SPY = jest.fn();
const SAVE_SPY = jest.fn();

describe('FormComponent', () => {
  let componentFixture: ComponentFixture<FormComponent>;
  let component: FormComponent;
  beforeEach(async () => {
    const { fixture } = await render(FormComponent, {
      imports: [CommonModule, FormsModule],
      declarations: [FormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
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
  });
  describe('#UI', () => {
    it('should disable the submit button', fakeAsync(async () => {
      await componentFixture.whenStable();
      componentFixture.detectChanges();
      const submitButton = screen.getByText<HTMLButtonElement>('Save');
      expect(submitButton.disabled).toBeTruthy();
    }));
    it('should create an instance of FormComponent', () => {
      expect(component).toBeInstanceOf(FormComponent);
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
  });
  describe('#Functions', () => {
    it('should correctly bind the input', () => {
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
      expect(spy).toHaveBeenCalledWith({
        firstname: 'SFEIR',
        lastname: 'SFEIR',
        email: 's.sfeir@sfeir.com',
        phone: '0123456789',
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
      });
    });
    it('should call the onSave method', () => {
      const spy = jest.spyOn(component, 'onSave');
      const submitButton = screen.getByText('Save');
      fireEvent.submit(submitButton);
      expect(spy).toHaveBeenCalled();
    });
    it('should call the save event emitter', () => {
      const personForm = { firstname: 'SFEIR', lastname: 'SFEIR' } as PeopleForm;
      component.onSave(personForm);
      expect(SAVE_SPY).toHaveBeenCalled();
      expect(SAVE_SPY).toHaveBeenCalledWith(personForm);
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
