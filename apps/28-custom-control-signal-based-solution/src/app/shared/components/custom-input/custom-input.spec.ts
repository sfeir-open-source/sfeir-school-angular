import { Component, signal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { FormField, FormRoot, form, required, schema } from '@angular/forms/signals';
import { fireEvent, render, screen } from '@testing-library/angular';
import { SfeirCustomInput } from './custom-input';

type TestModel = { name: string };

@Component({
  imports: [SfeirCustomInput, FormField, FormRoot],
  template: `
    <form [formRoot]="testForm">
      <sfeir-custom-input [formField]="testForm.name" inputPlaceholder="test" inputType="text" />
    </form>
  `,
})
class HostComponent {
  model = signal<TestModel>({ name: '' });
  testForm = form(
    this.model,
    schema<TestModel>(path => {
      required(path.name, { message: 'This field is required' });
    }),
  );
}

describe('SfeirCustomInput', () => {
  let componentFixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(async () => {
    const { fixture } = await render(HostComponent, {
      imports: [HostComponent],
    });
    componentFixture = fixture;
    component = fixture.componentInstance;
  });

  test('should create an instance of the host component', () => {
    expect(component).toBeInstanceOf(HostComponent);
  });

  test('should render an input with the provided placeholder', () => {
    expect(screen.getByPlaceholderText('test')).toBeTruthy();
  });

  test('should update the form model when the user types', async () => {
    const input = screen.getByPlaceholderText<HTMLInputElement>('test');
    fireEvent.input(input, { target: { value: 'SFEIR' } });
    await componentFixture.whenStable();
    componentFixture.detectChanges();
    expect(component.model().name).toBe('SFEIR');
  });

  test('should reflect the model value in the input', async () => {
    component.model.set({ name: 'SFEIR' });
    componentFixture.detectChanges();
    await componentFixture.whenStable();
    expect(screen.getByPlaceholderText<HTMLInputElement>('test').value).toBe('SFEIR');
  });

  test('should mark the field as touched when the input loses focus', async () => {
    const input = screen.getByPlaceholderText('test');
    fireEvent.focus(input);
    fireEvent.blur(input);
    await componentFixture.whenStable();
    componentFixture.detectChanges();
    expect(component.testForm.name().touched()).toBe(true);
  });

  test('should display validation errors when the field is invalid and touched', async () => {
    const input = screen.getByPlaceholderText('test');
    fireEvent.focus(input);
    fireEvent.blur(input);
    await componentFixture.whenStable();
    componentFixture.detectChanges();
    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  test('should not display validation errors before the field is touched', () => {
    expect(screen.queryByText('This field is required')).toBeNull();
  });
});
