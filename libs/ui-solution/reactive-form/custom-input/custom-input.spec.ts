import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { CustomInput } from './custom-input';

@Component({
  selector: 'sfeir-host',
  template: `<sfeir-input [errors]="control.errors" [placeholder]="'First name'" [type]="'text'" [formControl]="control" />`,
  imports: [ReactiveFormsModule, CustomInput],
})
class HostComponent {
  readonly control = new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] });
}

describe('CustomInput', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    const { fixture: fixtureFromRender } = await render(HostComponent);
    fixture = fixtureFromRender;
    host = fixture.componentInstance;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      const customInput = fixture.debugElement.query(node => node.componentInstance instanceof CustomInput).componentInstance;
      expect(customInput).toBeTruthy();
      expect(customInput).toBeInstanceOf(CustomInput);
    });
  });

  describe('Template', () => {
    it('should render an input with the given placeholder', () => {
      expect(screen.getByLabelText('First name')).toBeInTheDocument();
    });
    it('should render an input with the given type', () => {
      expect(screen.getByLabelText('First name')).toHaveAttribute('type', 'text');
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write the outer control value into the input (writeValue)', async () => {
      host.control.setValue('John');
      await fixture.whenStable();
      expect(screen.getByLabelText('First name')).toHaveValue('John');
    });
    it('should propagate input changes to the outer control (registerOnChange)', async () => {
      fireEvent.input(screen.getByLabelText('First name'), { target: { value: 'Jane' } });
      await fixture.whenStable();
      expect(host.control.value).toBe('Jane');
    });
    it('should mark the outer control as touched when the value changes (registerOnTouched)', async () => {
      expect(host.control.touched).toBe(false);
      fireEvent.input(screen.getByLabelText('First name'), { target: { value: 'Jane' } });
      await fixture.whenStable();
      expect(host.control.touched).toBe(true);
    });
    it('should mark the outer control as touched on blur (handleBlur)', async () => {
      expect(host.control.touched).toBe(false);
      fireEvent.blur(screen.getByLabelText('First name'));
      await fixture.whenStable();
      expect(host.control.touched).toBe(true);
    });
    it('should disable the inner control when the outer control is disabled (setDisabledState)', async () => {
      host.control.disable();
      await fixture.whenStable();
      expect(screen.getByLabelText('First name')).toBeDisabled();
    });
    it('should enable the inner control when the outer control is enabled (setDisabledState)', async () => {
      host.control.disable();
      await fixture.whenStable();
      host.control.enable();
      await fixture.whenStable();
      expect(screen.getByLabelText('First name')).not.toBeDisabled();
    });
  });

  describe('Errors', () => {
    it('should display the generic message for each error key once the control is touched', async () => {
      fireEvent.blur(screen.getByLabelText('First name'));
      await fixture.whenStable();
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
    it('should display the generic message for each error key once the control is dirty', async () => {
      fireEvent.input(screen.getByLabelText('First name'), { target: { value: 'J' } });
      await fixture.whenStable();
      expect(screen.getByText('This field must be at least 2 characters long')).toBeInTheDocument();
    });
    it('should not display an error message while the control is untouched and clean', () => {
      expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    });
  });
});
