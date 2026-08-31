import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import { King } from './king';

@Component({
  selector: 'sfeir-king',
  template: `<span [sfeirKing]="isManager()"></span>`,
  imports: [King],
})
class HostKing {
  public readonly isManager = signal<boolean>(false);
  public readonly sfeirKingDirective = viewChild.required(King);
}

describe('King', () => {
  let fixture: ComponentFixture<HostKing>;
  let component: HostKing;

  beforeEach(async () => {
    const { fixture: fixtureFromRender } = await render(HostKing);
    fixture = fixtureFromRender;
    component = fixture.componentInstance;
  });

  describe('Instance', () => {
    it('should create the component King', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of King', () => {
      expect(component).toBeInstanceOf(HostKing);
    });
    it('should create an instance of the KingDirective', () => {
      expect(component.sfeirKingDirective()).toBeInstanceOf(King);
    });
  });
  describe('Logic', () => {
    it('should alternate between showing the icon or not', async () => {
      let icon = screen.queryByText('supervised_user_circle');
      expect(icon).toBeNull();
      component.isManager.set(true);
      await fixture.whenStable();
      icon = screen.getByText('supervised_user_circle');
      expect(icon).toBeVisible();
    });

    it('should have an inherit color by default', () => {
      const directive = component.sfeirKingDirective() as unknown as { _iconColor: () => string };
      expect(directive._iconColor()).toBe('inherit');
    });

    it('should turn the icon color red on mouseover', async () => {
      component.isManager.set(true);
      await fixture.whenStable();
      const hostElement = fixture.debugElement.query(By.directive(King)).nativeElement as HTMLElement;
      const directive = component.sfeirKingDirective() as unknown as { _iconColor: () => string };

      hostElement.dispatchEvent(new MouseEvent('mouseover'));
      await fixture.whenStable();

      expect(directive._iconColor()).toBe('red');
      expect(hostElement.style.color).toBe('red');
    });

    it('should turn the icon color back to inherit on mouseout', async () => {
      component.isManager.set(true);
      await fixture.whenStable();
      const hostElement = fixture.debugElement.query(By.directive(King)).nativeElement as HTMLElement;
      const directive = component.sfeirKingDirective() as unknown as { _iconColor: () => string };

      hostElement.dispatchEvent(new MouseEvent('mouseover'));
      await fixture.whenStable();

      hostElement.dispatchEvent(new MouseEvent('mouseout'));
      await fixture.whenStable();

      expect(directive._iconColor()).toBe('inherit');
    });
  });
});
