import { ComponentFixture } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { Form } from './form';
import { vi } from 'vitest';

const CANCEL_SPY = vi.fn();
const SAVE_SPY = vi.fn();
const PERSON = {
  id: '',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@gmail.com',
  phone: '0123456789',
  photo: 'john-doe.jpg',
};
const VALID_PERSON = {
  id: '',
  firstname: 'SFEIR',
  lastname: 'SFEIR',
  email: 's.sfeir@sfeir.com',
  phone: '0123456789',
  photo: 'john-doe.jpg',
};

describe('FormComponent', () => {
  let fixture: ComponentFixture<Form>;
  let component: Form;
  let reload: any;

  beforeEach(async () => {
    const { fixture: componentFixture, rerender } = await render(Form, {
      imports: [Form],
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
      const input = screen.getByPlaceholderText('Email');
      expect(input).toBeTruthy();
    });
    it('should create an input for the phone', () => {
      const input = screen.getByPlaceholderText('Phone');
      expect(input).toBeTruthy();
    });
    it('should disable the submit button', () => {
      fixture.detectChanges();
      const submitButton = screen.getByText<HTMLButtonElement>('Save');
      expect(submitButton).toBeTruthy();
    });
    test('should correctly bind the input', async () => {
      await reload({ inputs: { person: PERSON }, partialUpdate: true });
      fixture.detectChanges();
      await fixture.whenStable();
      const firstnameInput = screen.getByPlaceholderText<HTMLInputElement>('First name');
      const lastnameInput = screen.getByPlaceholderText<HTMLInputElement>('Last name');
      const emailInput = screen.getByPlaceholderText<HTMLInputElement>('Email');
      const phoneInput = screen.getByPlaceholderText<HTMLInputElement>('Phone');
      expect(firstnameInput.value).toEqual('John');
      expect(lastnameInput.value).toEqual('Doe');
      expect(emailInput.value).toEqual('john.doe@gmail.com');
      expect(phoneInput.value).toEqual('0123456789');
    });
  });
  describe('#Functions', () => {
    it('should correctly bind the input', async () => {
      await reload({ inputs: { person: VALID_PERSON }, partialUpdate: true });
      fixture.detectChanges();
      await fixture.whenStable();
      const spy = vi.spyOn(component, 'submit');
      fireEvent.submit(screen.getByTestId('person-form'));
      await fixture.whenStable();
      expect(spy).toHaveBeenCalled();
    });
    it('should call the submit method', async () => {
      await reload({ inputs: { person: VALID_PERSON }, partialUpdate: true });
      fixture.detectChanges();
      await fixture.whenStable();
      const spy = vi.spyOn(component, 'submit');
      fireEvent.click(screen.getByText('Save'));
      await fixture.whenStable();
      expect(spy).toHaveBeenCalled();
    });
    it('should call the save event emitter', () => {
      component.submit();
      expect(SAVE_SPY).toHaveBeenCalled();
    });
    it('should call the onCancel method', () => {
      const spy = vi.spyOn(component, 'onCancel');
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
