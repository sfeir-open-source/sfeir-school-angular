import { Component, DebugElement, signal, viewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, render } from '@testing-library/angular';
import { Badge } from './badge';

@Component({
  template: `<span [sfeirBadge]="isManager()"></span>`,
  imports: [Badge],
})
export class HostDirectiveComponent {
  isManager = signal(false);
  badgeDirective = viewChild.required(Badge);
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

    afterEach(() => {
      fixture?.destroy();
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
  describe('person is a manager', () => {
    beforeEach(async () => {
      const { fixture: componentFixture, container: hostElement } = await render(HostDirectiveComponent, {});
      fixture = componentFixture;
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      container = hostElement;
      component.isManager.set(true);
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture?.destroy();
    });

    it('should display the icon', () => {
      const icon = container.querySelector('i.material-icons');
      expect(icon).toBeTruthy();
    });
    it('should display the icon in black', () => {
      const span = container.querySelector('span');
      expect(span.style.color).toBe('black');
    });
    it('should change the color from black to red on mouseover', async () => {
      let span = container.querySelector<HTMLElement>('span');
      expect(span.style.color).toBe('black');
      fireEvent.mouseOver(span);
      await fixture.whenStable();
      fixture.detectChanges();
      span = container.querySelector<HTMLElement>('span');
      expect(span.style.color).toBe('red');
      fireEvent.mouseOut(span);
      await fixture.whenStable();
      fixture.detectChanges();
      span = container.querySelector<HTMLElement>('span');
      expect(span.style.color).toBe('black');
    });
  });
});
