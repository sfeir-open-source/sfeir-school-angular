import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { FormComponent } from './form.component';

const CANCEL_SPY = jest.fn();
const SAVE_SPY = jest.fn();

describe('FormComponent', () => {
  let componentFixture: ComponentFixture<FormComponent>;
  let component: FormComponent;
  let container: Element;
  beforeEach(async () => {
    const { fixture, container: hostContainer } = await render(FormComponent, {
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [FormComponent, CustomInputComponent],
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
    container = hostContainer;
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
    test('should create 4 sfeir custom input', () => {
      const inputs = container.querySelectorAll('sfeir-custom-input');
      expect(inputs.length).toEqual(4);
    });
  });
  describe('#Functions', () => {
    test('should call the onSave method', () => {
      const spy = jest.spyOn(component, 'onSave');
      const submitButton = screen.getByText('Save');
      fireEvent.submit(submitButton);
      expect(spy).toHaveBeenCalled();
    });
    test('should call the save event emitter', () => {
      component.onSave();
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
