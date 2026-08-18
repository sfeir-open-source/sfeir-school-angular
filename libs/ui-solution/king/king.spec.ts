import { Component, signal, viewChild } from '@angular/core';
import { King } from './king';
import { render, screen } from '@testing-library/angular';
import { ComponentFixture } from '@angular/core/testing';

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
    const { fixture: fixtureFromRender, container: containerFromRender } = await render(HostKing);
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
  });
});
