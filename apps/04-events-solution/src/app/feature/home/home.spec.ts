import { Signal } from '@angular/core';
import { Person } from '@sfeir/types';
import { fireEvent, render, screen } from '@testing-library/angular';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let container: HTMLElement;

  beforeEach(async () => {
    const { fixture, container: containerFromRender } = await render(Home);
    container = containerFromRender;
    component = fixture.componentInstance;
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
    it('should have the element mat-card', () => {
      const matCardElement = container.getElementsByTagName('mat-card');
      expect(matCardElement.length).toBe(1);
    });
    it('should display the photo of the person', () => {
      const photoElement = screen.getByAltText('person-photo');
      expect(photoElement).toBeInTheDocument();
      expect(photoElement).toHaveAttribute('src', personDisplayed().photo);
    });
    it('should display the name of the person', () => {
      const matCardTitleElement = container.getElementsByTagName('mat-card-title');
      expect(matCardTitleElement.length).toBe(1);
      expect(matCardTitleElement[0].textContent).toBe(`${personDisplayed().firstname} ${personDisplayed().lastname}`);
    });
    it('should display the entity of the person', () => {
      const matCardSubtitleElement = container.getElementsByTagName('mat-card-subtitle');
      expect(matCardSubtitleElement.length).toBe(3);
      expect(matCardSubtitleElement[0].textContent).toContain(personDisplayed().entity);
    });
    it('should display the email of the person', () => {
      const matCardSubtitleElement = container.getElementsByTagName('mat-card-subtitle');
      expect(matCardSubtitleElement[1].textContent).toContain(personDisplayed().email);
    });
    it('should display the phone of the person', () => {
      const matCardSubtitleElement = container.getElementsByTagName('mat-card-subtitle');
      expect(matCardSubtitleElement[2].textContent).toContain(personDisplayed().phone);
    });
    it('should display the manager of the person', () => {
      const contacteInfoElements = container.querySelectorAll('div.contact-info');
      expect(contacteInfoElements.length).toBe(2);
      const managerElement = contacteInfoElements[0];
      expect(managerElement.textContent).toContain(personDisplayed().manager);
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
