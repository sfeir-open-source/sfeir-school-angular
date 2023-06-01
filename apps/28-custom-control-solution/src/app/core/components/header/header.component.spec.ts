import { Component } from '@angular/core';
import { render } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

@Component({
  template: `
    <ng-template #header>Hello Sfeir</ng-template>
  <sfeir-header [headerTemplate]="header" />
  `,
})
export class ContainerHeaderComponent {}

describe('HeaderComponent', () => {
  let component: ContainerHeaderComponent;
  let container: Element;

  beforeEach(async () => {
    const { fixture, container: hostContainer } = await render(ContainerHeaderComponent, { declarations: [HeaderComponent] });
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
