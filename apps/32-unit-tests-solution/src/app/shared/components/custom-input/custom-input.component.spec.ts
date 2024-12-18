import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render } from '@testing-library/angular';
import { CustomInputComponent } from './custom-input.component';

@Component({
  standalone: false,
  template: ` <sfeir-custom-input [formControl]="control">Lose focus</sfeir-custom-input>`,
})
class HostComponent {
  control = new FormControl();
}

describe('CustomInputComponent', () => {
  let componentFixture: ComponentFixture<HostComponent>;
  let component: HostComponent;
  let container: Element;

  beforeEach(async () => {
    const { fixture, container: hostContainer } = await render(HostComponent, {
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, CommonModule],
      declarations: [CustomInputComponent],
    });
    componentFixture = fixture;
    component = fixture.componentInstance;
    container = hostContainer;
  });

  test('should create an instance of the hostComponent', () => {
    expect(component).toBeInstanceOf(HostComponent);
  });
  test('should not display the message lose focus', () => {
    expect(container.textContent).not.toContain('Lose focus');
  });
  test('should update the parent control', () => {
    const input = container.querySelector('input');
    fireEvent.input(input, { target: { value: 'test' } });
    expect(component.control.value).toBe('test');
  });
  test('should update the input value', () => {
    component.control.patchValue('SFEIR');
    const input = container.querySelector('input');
    expect(input.value).toBe('SFEIR');
  });
  test('should display the message lose focus', () => {
    const input = container.querySelector('input');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(container.textContent).toContain('Lose focus');
    expect(component.control.touched).toBe(true);
  });
  test('should make the parent control dirty when user input something', () => {
    const input = container.querySelector('input');
    fireEvent.input(input, { target: { value: 'test' } });
    expect(component.control.dirty).toBe(true);
  });
  test('should make the parent control touched when user lose the focus', () => {
    const input = container.querySelector('input');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(component.control.touched).toBe(true);
  });
  test('should unsubscribe to listener', () => {
    component.control.patchValue('SFEIR');
    const input = container.querySelector('input');
    expect(input.value).toBe('SFEIR');
    componentFixture.destroy();
    fireEvent.input(input, { target: { value: 'test' } });
    expect(component.control.value).toBe('SFEIR');
  });
});
