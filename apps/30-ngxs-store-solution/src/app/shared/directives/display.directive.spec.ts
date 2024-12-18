import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { DisplayDirective } from './display.directive';

@Component({ standalone: false, template: `<span *sfeirDisplay="person.isManager">Hello Sfeir</span>` })
class HostDirectiveComponent {
  person = { isManager: true };
}

describe('SfeirDisplayDirective', () => {
  let componentFixture: ComponentFixture<HostDirectiveComponent>;
  let component: HostDirectiveComponent;
  let container: Element;

  beforeEach(async () => {
    const { fixture, container: hostContainer } = await render(HostDirectiveComponent, { declarations: [DisplayDirective] });
    componentFixture = fixture;
    component = fixture.componentInstance;
    container = hostContainer;
  });

  test('should display the Helle Sfeir text', () => {
    const span = container.querySelector<HTMLElement>('span');
    expect(span.textContent).toBe('Hello Sfeir');
  });
  test('should not display the Helle Sfeir text', () => {
    component.person = { isManager: false };
    componentFixture.detectChanges();
    const span = container.querySelector<HTMLElement>('span');
    expect(span).toBeFalsy();
  });
});
