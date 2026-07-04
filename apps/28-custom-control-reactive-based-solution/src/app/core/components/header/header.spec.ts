import { Component } from '@angular/core';
import { render } from '@testing-library/angular';
import { Header } from './header';

@Component({
  template: `
    <ng-template #header>Hello Sfeir</ng-template>
    <sfeir-header [headerTemplate]="header" />
  `,
  imports: [Header],
})
export class ContainerHeaderComponent {}

describe('HeaderComponent', () => {
  let component: ContainerHeaderComponent;
  let container: Element;

  beforeEach(async () => {
    const { fixture, container: hostContainer } = await render(ContainerHeaderComponent, { declarations: [Header] });
    component = fixture.componentInstance;
    container = hostContainer;
  });
  test('should create an instance of the container component', () => {
    expect(component).toBeInstanceOf(ContainerHeaderComponent);
  });
  test('should display the hello sfeir', () => {
    const sfeirHeader: HTMLElement = container.querySelector('sfeir-header');
    expect(sfeirHeader.textContent.trim()).toEqual('Hello Sfeir');
  });
});
