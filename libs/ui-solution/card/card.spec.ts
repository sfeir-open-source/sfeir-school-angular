import { inputBinding, outputBinding, Signal } from '@angular/core';
import { PEOPLE_MOCK, Person } from '@sfeir/types';
import { fireEvent, render, screen } from '@testing-library/angular';
import { Card } from './card';

const person = PEOPLE_MOCK[0];

const deleteEvent = vi.fn();
describe('Card', () => {
  let component: Card;
  let container: HTMLElement;

  beforeEach(async () => {
    const { fixture, container: containerFromRender } = await render(Card, {
      bindings: [inputBinding('person', () => person), outputBinding('delete', deleteEvent)],
    });
    component = fixture.componentInstance;
    container = containerFromRender;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of the Card component', () => {
      expect(component).toBeInstanceOf(Card);
    });
    it('should set the person input correctly', () => {
      expect(component.person()).toEqual(person);
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
      expect(contacteInfoElements.length).toBe(3);
      const managerElement = contacteInfoElements[1];
      expect(managerElement.textContent).toContain(personDisplayed().manager);
    });
    it('should display the birth date of the person', () => {
      const contactInfoElements = container.querySelectorAll('div.contact-info');
      expect(contactInfoElements.length).toBe(3);
      const birthDateElement = contactInfoElements[0];
      expect(birthDateElement.textContent).toContain('birthDate: 02/01/1974');
    });
    it('should call the method handleDelete when the button delete is clicked', () => {
      const spy = vi.spyOn(component, 'handleDelete');
      const deleteButton = screen.getByTitle('Delete');
      fireEvent.click(deleteButton);
      expect(spy).toHaveBeenCalledExactlyOnceWith(personDisplayed().id);
      expect(deleteEvent).toHaveBeenCalledExactlyOnceWith(personDisplayed().id);
    });
  });
});
