import { outputBinding } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { UpsertPersonBody } from '@sfeir/types';
import { SignalForm } from './signal-form';

const DEFAULT_PHOTO = 'https://randomuser.me/api/portraits/lego/6.jpg';

const submitEvent = vi.fn();
const cancelEvent = vi.fn();

describe('SignalForm', () => {
  let fixture: ComponentFixture<SignalForm>;
  let component: SignalForm;

  beforeEach(async () => {
    submitEvent.mockClear();
    cancelEvent.mockClear();
    const { fixture: fixtureFromRender } = await render(SignalForm, {
      bindings: [outputBinding('submitForm', submitEvent), outputBinding('cancelForm', cancelEvent)],
    });
    fixture = fixtureFromRender;
    component = fixture.componentInstance;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of the SignalForm component', () => {
      expect(component).toBeInstanceOf(SignalForm);
    });
  });

  describe('Template', () => {
    it('should default the photo to the placeholder photo', () => {
      const photo = screen.getByAltText('person-photo') as HTMLImageElement;
      expect(photo.src).toBe(DEFAULT_PHOTO);
    });
    it('should disable the Save button when the form is invalid', async () => {
      await fixture.whenStable();
      const saveButton = screen.getByText('Save').closest('button');
      expect(saveButton).toBeDisabled();
    });
    it('should enable the Save button and emit submitForm with the form value when filled correctly', async () => {
      fireEvent.input(screen.getByPlaceholderText('First name'), { target: { value: 'John' } });
      fireEvent.input(screen.getByPlaceholderText('Last name'), { target: { value: 'Doe' } });
      fireEvent.input(screen.getByPlaceholderText('email'), { target: { value: 'john.d@sfeir.com' } });
      fireEvent.input(screen.getByPlaceholderText('phone'), { target: { value: '0102030405' } });
      await fixture.whenStable();

      const saveButton = screen.getByText('Save').closest('button') as HTMLButtonElement;
      expect(saveButton).not.toBeDisabled();

      fireEvent.click(saveButton);
      await fixture.whenStable();

      expect(submitEvent).toHaveBeenCalledExactlyOnceWith({
        photo: DEFAULT_PHOTO,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.d@sfeir.com',
        phone: '0102030405',
      } satisfies UpsertPersonBody);
    });
    it('should display the required error for the firstname when it is touched and empty', async () => {
      const firstNameInput = screen.getByPlaceholderText('First name');
      fireEvent.blur(firstNameInput);
      await fixture.whenStable();
      expect(screen.getByText('Field is required')).toBeInTheDocument();
    });
    it('should display the minLength error for the firstname when it is too short', async () => {
      const firstNameInput = screen.getByPlaceholderText('First name');
      fireEvent.input(firstNameInput, { target: { value: 'J' } });
      fireEvent.blur(firstNameInput);
      await fixture.whenStable();
      expect(screen.getByText('Field must be at least 3 characters long')).toBeInTheDocument();
    });
    it('should display the sfeirEmail error for the email when it does not match the Sfeir email pattern', async () => {
      const emailInput = screen.getByPlaceholderText('email');
      fireEvent.input(emailInput, { target: { value: 'john.doe@gmail.com' } });
      fireEvent.blur(emailInput);
      await fixture.whenStable();
      expect(screen.getByText('Invalid SFEIR email')).toBeInTheDocument();
    });
    it('should not display an email error when the email matches the Sfeir email pattern', async () => {
      const emailInput = screen.getByPlaceholderText('email');
      fireEvent.input(emailInput, { target: { value: 'john.d@sfeir.com' } });
      fireEvent.blur(emailInput);
      await fixture.whenStable();
      expect(screen.queryByText('Invalid SFEIR email')).not.toBeInTheDocument();
      expect(screen.queryByText('Field is required')).not.toBeInTheDocument();
    });
    it('should display the pattern error for the phone when it is invalid', async () => {
      const phoneInput = screen.getByPlaceholderText('phone');
      fireEvent.input(phoneInput, { target: { value: '123' } });
      fireEvent.blur(phoneInput);
      await fixture.whenStable();
      expect(screen.getByText('Field must be a 10 digit number')).toBeInTheDocument();
    });
    it('should emit cancelForm and not submitForm when the Cancel button is clicked', () => {
      fireEvent.click(screen.getByText('Cancel'));
      expect(cancelEvent).toHaveBeenCalledOnce();
      expect(submitEvent).not.toHaveBeenCalled();
    });
  });
});
