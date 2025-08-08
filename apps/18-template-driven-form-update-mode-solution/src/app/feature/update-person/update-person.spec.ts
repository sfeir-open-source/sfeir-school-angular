import { CommonModule, Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { type ComponentFixture } from '@angular/core/testing';
import { fireEvent, render } from '@testing-library/angular';
import { of } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People } from '../../shared/models/people.model';
import { UpdatePerson } from './update-person';

const PERSON: People = { id: '1', lastname: 'SFEIR', firstname: 'SFEIR', photo: 'https://randomuser.me/api/portraits/lego/6.jpg' } as People;

const PEOPLE_SERVICE = {
  getPersonDetails: jest.fn(() => of(null as People | null)),
  updatePerson: jest.fn(() => of(void 0)),
};

describe('UpdatePersonComponent', () => {
  let fixture: ComponentFixture<UpdatePerson>;
  let component: UpdatePerson;
  let container: Element;

  beforeEach(async () => {
    const { fixture: componentFixture, container: hostContainer } = await render(UpdatePerson, {
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
      inputs: {
        id: '1',
      },
      providers: [{ provide: PeopleService, useValue: PEOPLE_SERVICE }, Location],
    });
    fixture = componentFixture;
    component = fixture.componentInstance;
    container = hostContainer;
  });

  describe('#basics', () => {
    beforeEach(async () => {
      jest.spyOn(PEOPLE_SERVICE, 'getPersonDetails').mockReturnValue(of(null));
      fixture.detectChanges();
      await fixture.whenStable();
    });
    it('should create an instance of UpdatePersonComponent', () => {
      expect(component).toBeInstanceOf(UpdatePerson);
    });
    it('should not display the person form', () => {
      const sfeirForm = container.querySelector('sfeir-form');
      expect(sfeirForm).toBeNull();
    });
  });
  describe('#ui', () => {
    beforeEach(async () => {
      jest.spyOn(PEOPLE_SERVICE, 'getPersonDetails').mockReturnValue(of(PERSON));
      component.peopleResource.reload();
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    });
    it('should display the person form', () => {
      const sfeirForm = container.querySelector('sfeir-form');
      expect(sfeirForm).not.toBeNull();
    });
    it('should call the method updatePerson', () => {
      const sfeirForm = container.querySelector('sfeir-form');
      const updatePersonSpy = jest.spyOn(component, 'updatePerson');
      const customEvent = new CustomEvent('save');
      fireEvent(sfeirForm, customEvent);
      expect(updatePersonSpy).toHaveBeenCalled();
    });
    it('should call the method goBack', () => {
      const sfeirForm = container.querySelector('sfeir-form');
      const goBackSpy = jest.spyOn(component, 'goBack');
      const customEvent = new CustomEvent('cancel');
      fireEvent(sfeirForm, customEvent);
      expect(goBackSpy).toHaveBeenCalled();
    });
  });
  describe('#functions', () => {
    it('should call the method updatePerson of PeopleService', () => {
      const updatePersonSpy = jest.spyOn(PEOPLE_SERVICE, 'updatePerson');
      const goBAckSpy = jest.spyOn(component, 'goBack');
      component.updatePerson(PERSON);
      expect(updatePersonSpy).toHaveBeenCalledWith(PERSON);
      expect(goBAckSpy).toHaveBeenCalled();
    });
  });
});
