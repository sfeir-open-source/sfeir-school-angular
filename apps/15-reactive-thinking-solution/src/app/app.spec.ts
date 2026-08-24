import { render } from '@testing-library/angular';
import { App } from './app';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  template: `Hello form Home`,
})
class MOCKHome {}

describe('App', () => {
  let component: App;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    const { fixture } = await render(App, {
      providers: [
        provideRouter([
          { path: '', redirectTo: '/home', pathMatch: 'full' },
          { path: 'home', component: MOCKHome },
        ]),
      ],
    });
    component = fixture.componentInstance;
    harness = await RouterTestingHarness.create();
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of App', () => {
      expect(component).toBeInstanceOf(App);
    });
  });
  describe('Template', () => {
    beforeEach(async () => {
      await harness.navigateByUrl('');
    });
    it('should show the home component', () => {
      expect(harness.routeNativeElement?.textContent).toBe('Hello form Home');
    });
  });
});
