import { Component, signal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { DisplayDirective } from './display.directive';

@Component({ standalone: true, imports: [DisplayDirective], template: `<span *sfeirDisplay="person().isManager">Hello Sfeir</span>` })
class HostDirectiveComponent {
  person = signal({ isManager: true });
}

describe('SfeirDisplayDirective', () => {
  let componentFixture: ComponentFixture<HostDirectiveComponent>;
  let component: HostDirectiveComponent;
  let container: Element;

  beforeEach(async () => {
    const { fixture, container: hostContainer } = await render(HostDirectiveComponent);
    componentFixture = fixture;
    component = fixture.componentInstance;
    container = hostContainer;
  });

  test('should display the Helle Sfeir text', () => {
    const span = container.querySelector<HTMLElement>('span');
    expect(span.textContent).toBe('Hello Sfeir');
  });
  test('should not display the Helle Sfeir text', async () => {
    component.person.set({ isManager: false });
    componentFixture.autoDetectChanges();
    await componentFixture.whenStable();
    const span = container.querySelector<HTMLElement>('span');
    expect(span).toBeFalsy();
  });
});
