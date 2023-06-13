import { Component, DebugElement, Input } from '@angular/core';
import { fireEvent, render } from '@testing-library/angular';
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
        componentInputs: { person: { isManager: false } },
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
    let badgeDirective: BadgeDirective;
    beforeEach(async () => {
      const { fixture, container: hostElement } = await render(HostDirectiveComponent, {
        imports: [CommonModule],
        declarations: [HostDirectiveComponent, BadgeDirective],
        componentInputs: { person: { isManager: true } },
      });
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      container = hostElement;
      badgeDirective = debugElement.query(By.directive(BadgeDirective)).injector.get(BadgeDirective);
    });
    it('should not display the icon', () => {
      const icon = container.querySelector('i.material-icons');
      expect(icon).toBeTruthy();
    });
    it('should display the icon in black', () => {
      const span = container.querySelector<HTMLElement>('span');
      expect(span.style.color).toBe('black');
    });
    it('should display the icon in red if event mouseover is triggered', () => {
      const spy = jest.spyOn(badgeDirective, 'onMouseOver');
      let span = container.querySelector<HTMLElement>('span');
      fireEvent.mouseOver(span);
      span = container.querySelector<HTMLElement>('span');
      expect(spy).toHaveBeenCalled();
      expect(span.style.color).toBe('red');
    });
    it('should change the color red into black', () => {
      const spy = jest.spyOn(badgeDirective, 'onMouseOut');
      let span = container.querySelector<HTMLElement>('span');
      fireEvent.mouseOver(span);
      span = container.querySelector<HTMLElement>('span');
      expect(span.style.color).toBe('red');
      fireEvent.mouseOut(span);
      span = container.querySelector<HTMLElement>('span');
      expect(spy).toHaveBeenCalled();
      expect(span.style.color).toBe('black');
    });
  });
});

@Component({
  template: `<span [sfeirBadge]="person.isManager"></span>`,
})
export class HostDirectiveComponent {
  @Input() person!: { isManager: boolean };
}
