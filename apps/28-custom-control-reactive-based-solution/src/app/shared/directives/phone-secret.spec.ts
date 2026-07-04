import { Component } from '@angular/core';
import { PhoneSecret } from './phone-secret';
import { ComponentFixture } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';

@Component({
  imports: [PhoneSecret],
  template: ` <input *sfeirPhoneSecret="let type" [type]="type" /> `,
})
class WrapperComponent {}

describe('PhoneSecret', () => {
  let fixture: ComponentFixture<WrapperComponent>;
  let component: WrapperComponent;
  beforeEach(async () => {
    const { fixture: componentFixture } = await render(WrapperComponent);
    fixture = componentFixture;
    component = fixture.componentInstance;
  });

  it('should create the warpper component', () => {
    expect(component).toBeTruthy();
  });
  it('should create an instance of the wrapper component', () => {
    expect(component).toBeInstanceOf(WrapperComponent);
  });
  it('should create an input with the type text', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('text');
  });
  it('should display the visibility icon', () => {
    const icon = screen.getByText('visibility');
    expect(icon).toBeTruthy();
  });
  it('should change the type to password', async () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const input = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('password');
  });
  it('should change the icon to disabled_visibility', async () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const icon = screen.getByText('disabled_visible');
    expect(icon).toBeTruthy();
  });
});
