import { DebugElement, Signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '@sfeir/types';
import { Card } from '@sfeir/ui-solution/card';
import { fireEvent, render, screen } from '@testing-library/angular';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let container: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const { fixture, container: containerFromRender, debugElement: debugElementFromRender } = await render(Home);
    container = containerFromRender;
    component = fixture.componentInstance;
    debugElement = debugElementFromRender;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of Home', () => {
      expect(component).toBeInstanceOf(Home);
    });
  });
  describe('Template', () => {
    let personDisplayed: Signal<Person>;
    beforeEach(() => {
      personDisplayed = component.person;
    });
    it('should display the sfeir card component', () => {
      const sfeirCardElement = container.getElementsByTagName('sfeir-card');
      expect(sfeirCardElement.length).toBe(1);
    });
    it('should pass the person to the sfeir card component input', () => {
      const sfeirCardElement = debugElement.query(By.directive(Card));
      expect(sfeirCardElement).toBeTruthy();
      expect(sfeirCardElement.componentInstance.person()).toEqual(personDisplayed());
    });
    it('should call the method handleRefresh when the delete event is emitted', () => {
      const spy = vi.spyOn(component, 'handleRefresh');
      debugElement.query(By.directive(Card)).triggerEventHandler('delete', personDisplayed().id);
      expect(spy).toHaveBeenCalledOnce();
    });
    it('should call the method handleRefresh when the button random is clicked', () => {
      const spy = vi.spyOn(component, 'handleRefresh');
      const refreshButton = screen.getByTestId('refresh-button');
      fireEvent.click(refreshButton);
      expect(spy).toHaveBeenCalledOnce();
    });
    it('should display the new person when the button random is clicked', () => {
      const refreshButton = screen.getByTestId('refresh-button');
      fireEvent.click(refreshButton);
      expect(personDisplayed().photo).toBe(component.person().photo);
      expect(personDisplayed().firstname).toBe(component.person().firstname);
      expect(personDisplayed().lastname).toBe(component.person().lastname);
    });
  });
});
