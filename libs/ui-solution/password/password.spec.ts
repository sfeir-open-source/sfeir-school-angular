import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { Secret } from './password';

@Component({
  selector: 'sfeir-host',
  template: `<span *sfeirSecret="let type">{{ type }}</span>`,
  imports: [Secret],
})
class HostComponent {}

describe('Secret', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    const { fixture: fixtureFromRender } = await render(HostComponent);
    fixture = fixtureFromRender;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(fixture.componentInstance).toBeTruthy();
      expect(fixture.componentInstance).toBeInstanceOf(HostComponent);
    });
  });

  describe('Template', () => {
    it('should render the projected content with the context defaulting to password', () => {
      expect(screen.getByText('password')).toBeInTheDocument();
      expect(screen.getByText('visibility')).toBeInTheDocument();
    });

    it('should expose text and switch the icon once the toggle button is clicked', async () => {
      fireEvent.click(screen.getByRole('button'));
      await fixture.whenStable();
      expect(screen.getByText('text')).toBeInTheDocument();
      expect(screen.getByText('visibility_off')).toBeInTheDocument();
    });

    it('should switch back to password and the icon once the toggle button is clicked again', async () => {
      fireEvent.click(screen.getByRole('button'));
      await fixture.whenStable();
      fireEvent.click(screen.getByRole('button'));
      await fixture.whenStable();
      expect(screen.getByText('password')).toBeInTheDocument();
      expect(screen.getByText('visibility')).toBeInTheDocument();
    });
  });
});
