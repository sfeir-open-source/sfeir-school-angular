import { Component, DebugElement, Input } from '@angular/core';
import { render } from '@testing-library/angular';
import { CommonModule } from '@angular/common';
import { BadgeDirective } from './badge.directive';
import { By } from '@angular/platform-browser';

describe('BadgeDirective', () => {
  let debugElement: DebugElement;
  let component: HostDirectiveComponent;
  let container: Element;

  describe('person is not a manager', () => {
    beforeEach(async () => {
      const { fixture, container: hostElement } = await render(HostDirectiveComponent, {
        imports: [CommonModule],
        declarations: [HostDirectiveComponent, BadgeDirective],
        inputs: { person: { isManager: false } },
      });
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      container = hostElement;
    });

    it('should create an instance of HostDirectiveComponent', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of BadgeDirective', () => {
      const directive = debugElement.query(By.directive(BadgeDirective));
      expect(directive).toBeTruthy();
    });
    it('should not display the icon', () => {
      const icon = container.querySelector('i.material-icons');
      expect(icon).toBeFalsy();
    });
  });
  describe('person is a manager', () => {
    beforeEach(async () => {
      const { fixture, container: hostElement } = await render(HostDirectiveComponent, {
        imports: [CommonModule],
        declarations: [HostDirectiveComponent, BadgeDirective],
        inputs: { person: { isManager: true } },
      });
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      container = hostElement;
    });
    it('should not display the icon', () => {
      const icon = container.querySelector('i.material-icons');
      expect(icon).toBeTruthy();
    });
  });
});

@Component({
  template: `<span [sfeirBadge]="person.isManager"></span>`,
  standalone: false,
})
export class HostDirectiveComponent {
  @Input() person!: { isManager: boolean };
}
