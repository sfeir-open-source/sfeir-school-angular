import { Component, DebugElement, signal } from '@angular/core';
import { render } from '@testing-library/angular';
import { By } from '@angular/platform-browser';
import { Badge } from './badge';
import { ComponentFixture } from '@angular/core/testing';

@Component({
  template: `<span [sfeirBadge]="isManager()"></span>`,
  imports: [Badge],
})
export class HostDirectiveComponent {
  isManager = signal(false);
}

describe('BadgeDirective', () => {
  let debugElement: DebugElement;
  let component: HostDirectiveComponent;
  let container: Element;
  let fixture: ComponentFixture<HostDirectiveComponent>;

  describe('person is not a manager', () => {
    beforeEach(async () => {
      const { fixture: componentFixture, container: hostElement } = await render(HostDirectiveComponent, {});
      fixture = componentFixture;
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      container = hostElement;
    });

    it('should create an instance of HostDirectiveComponent', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of BadgeDirective', () => {
      const directive = debugElement.query(By.directive(Badge));
      expect(directive).toBeTruthy();
    });
    it('should not display the icon', () => {
      const icon = container.querySelector('i.material-icons');
      expect(icon).toBeFalsy();
    });
    it('should display the icon', () => {
      component.isManager.set(true);
      fixture.detectChanges();
      const icon = container.querySelector('i.material-icons');
      expect(icon).toBeTruthy();
    });
  });
});
