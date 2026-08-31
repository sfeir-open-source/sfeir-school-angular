import { Component, signal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { fireEvent, render, screen } from '@testing-library/angular';
import { CustomInput } from './custom-input';

@Component({
  selector: 'sfeir-host',
  template: `<sfeir-input [formField]="field" [placeholder]="'First name'" [type]="'text'" />`,
  imports: [FormField, CustomInput],
})
class HostComponent {
  readonly value = signal('');
  readonly field = form(this.value, path => {
    required(path, { message: 'Field is required' });
    minLength(path, 2, { message: 'Field must be at least 2 characters long' });
  });
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
      expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    });
    it('should render an input with the given type', () => {
      expect(screen.getByPlaceholderText('First name')).toHaveAttribute('type', 'text');
    });
  });

  describe('Errors', () => {
    it('should not display an error message while the field is untouched', () => {
      expect(screen.queryByText('Field is required')).not.toBeInTheDocument();
    });
    it('should display the required error once the field is touched and empty', async () => {
      fireEvent.blur(screen.getByPlaceholderText('First name'));
      await fixture.whenStable();
      expect(screen.getByText('Field is required')).toBeInTheDocument();
    });
    it('should display the minLength error once the field is touched and too short', async () => {
      fireEvent.input(screen.getByPlaceholderText('First name'), { target: { value: 'J' } });
      fireEvent.blur(screen.getByPlaceholderText('First name'));
      await fixture.whenStable();
      expect(screen.getByText('Field must be at least 2 characters long')).toBeInTheDocument();
    });
    it('should not display an error message once the field becomes valid', async () => {
      fireEvent.input(screen.getByPlaceholderText('First name'), { target: { value: 'Jo' } });
      fireEvent.blur(screen.getByPlaceholderText('First name'));
      await fixture.whenStable();
      expect(screen.queryByText('Field is required')).not.toBeInTheDocument();
    });
    it('should not display an error message while the field is dirty but not yet touched', () => {
      fireEvent.input(screen.getByPlaceholderText('First name'), { target: { value: '' } });
      expect(screen.queryByText('Field is required')).not.toBeInTheDocument();
    });
  });

  describe('touch output', () => {
    it('should mark the field as touched on blur', async () => {
      expect(host.field().touched()).toBe(false);
      fireEvent.blur(screen.getByPlaceholderText('First name'));
      await fixture.whenStable();
      expect(host.field().touched()).toBe(true);
    });
  });

  describe('_errorMatcher', () => {
    it('should report an error state once invalid and touched', async () => {
      fireEvent.blur(screen.getByPlaceholderText('First name'));
      await fixture.whenStable();
      const customInput = fixture.debugElement.query(node => node.componentInstance instanceof CustomInput).componentInstance as CustomInput;
      expect(customInput['_errorMatcher']().isErrorState()).toBe(true);
    });
    it('should not report an error state while untouched even if invalid', () => {
      const customInput = fixture.debugElement.query(node => node.componentInstance instanceof CustomInput).componentInstance as CustomInput;
      expect(customInput['_errorMatcher']().isErrorState()).toBe(false);
    });
    it('should not report an error state once valid and touched', async () => {
      fireEvent.input(screen.getByPlaceholderText('First name'), { target: { value: 'Jo' } });
      fireEvent.blur(screen.getByPlaceholderText('First name'));
      await fixture.whenStable();
      const customInput = fixture.debugElement.query(node => node.componentInstance instanceof CustomInput).componentInstance as CustomInput;
      expect(customInput['_errorMatcher']().isErrorState()).toBe(false);
    });
  });
});
