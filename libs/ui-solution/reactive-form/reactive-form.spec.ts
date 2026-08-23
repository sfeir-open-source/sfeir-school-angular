import { outputBinding } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { UpsertPersonBody } from '@sfeir/types';
import { ReactiveForm } from './reactive-form';

const DEFAULT_PHOTO = 'https://randomuser.me/api/portraits/lego/6.jpg';

const submitEvent = vi.fn();
const cancelEvent = vi.fn();

describe('ReactiveForm', () => {
  let fixture: ComponentFixture<ReactiveForm>;
  let component: ReactiveForm;

  beforeEach(async () => {
    submitEvent.mockClear();
    cancelEvent.mockClear();
    const { fixture: fixtureFromRender } = await render(ReactiveForm, {
      bindings: [outputBinding('submitForm', submitEvent), outputBinding('cancelForm', cancelEvent)],
    });
    fixture = fixtureFromRender;
    component = fixture.componentInstance;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of the ReactiveForm component', () => {
      expect(component).toBeInstanceOf(ReactiveForm);
    });
  });

  describe('Template', () => {
    it('should have the element form', () => {
      const formElement = screen.getByTestId('person-form');
      expect(formElement).toBeInTheDocument();
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
    it('should display the required error for the firstname when it is empty', async () => {
      const firstNameInput = screen.getByPlaceholderText('First name');
      fireEvent.blur(firstNameInput);
      await fixture.whenStable();
      expect(screen.getByText('First name is required')).toBeInTheDocument();
    });
    it('should display the minlength error for the firstname when it is too short', async () => {
      const firstNameInput = screen.getByPlaceholderText('First name');
      fireEvent.input(firstNameInput, { target: { value: 'J' } });
      fireEvent.blur(firstNameInput);
      await fixture.whenStable();
      expect(screen.getByText('First name must be at least 2 characters long')).toBeInTheDocument();
    });
    it('should display the required error for the lastname when it is empty', async () => {
      const lastNameInput = screen.getByPlaceholderText('Last name');
      fireEvent.blur(lastNameInput);
      await fixture.whenStable();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
    });
    it('should display the minlength error for the lastname when it is too short', async () => {
      const lastNameInput = screen.getByPlaceholderText('Last name');
      fireEvent.input(lastNameInput, { target: { value: 'D' } });
      fireEvent.blur(lastNameInput);
      await fixture.whenStable();
      expect(screen.getByText('Last name must be at least 2 characters long')).toBeInTheDocument();
    });
    it('should display the required error for the email when it is empty', async () => {
      const emailInput = screen.getByPlaceholderText('email');
      fireEvent.blur(emailInput);
      await fixture.whenStable();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    it('should display the sfeirEmail error for the email when it does not match the Sfeir email pattern', async () => {
      const emailInput = screen.getByPlaceholderText('email');
      fireEvent.input(emailInput, { target: { value: 'john.doe@gmail.com' } });
      fireEvent.blur(emailInput);
      await fixture.whenStable();
      expect(screen.getByText('Email must be a valid Sfeir email')).toBeInTheDocument();
    });
    it('should not display an email error when the email matches the Sfeir email pattern', async () => {
      const emailInput = screen.getByPlaceholderText('email');
      fireEvent.input(emailInput, { target: { value: 'john.d@sfeir.com' } });
      fireEvent.blur(emailInput);
      await fixture.whenStable();
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Email must be a valid Sfeir email')).not.toBeInTheDocument();
    });
    it('should display the pattern error for the phone when it is invalid', async () => {
      const phoneInput = screen.getByPlaceholderText('phone');
      fireEvent.input(phoneInput, { target: { value: '123' } });
      fireEvent.blur(phoneInput);
      await fixture.whenStable();
      expect(screen.getByText('Phone must be 10 digits long')).toBeInTheDocument();
    });
    it('should emit cancelForm and not submitForm when the Cancel button is clicked', () => {
      fireEvent.click(screen.getByText('Cancel'));
      expect(cancelEvent).toHaveBeenCalledOnce();
      expect(submitEvent).not.toHaveBeenCalled();
    });
  });
});
