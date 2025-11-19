import { CommonModule, Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { type ComponentFixture } from '@angular/core/testing';
import { fireEvent, render } from '@testing-library/angular';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { PeopleService } from '../../core/providers/people.service';
import { People } from '../../shared/models/people.model';
import { UpdatePerson } from './update-person';

const PERSON: People = { id: '1', lastname: 'SFEIR', firstname: 'SFEIR', photo: 'https://randomuser.me/api/portraits/lego/6.jpg' } as People;

const PEOPLE_SERVICE = {
  updatePerson: vi.fn(() => of(void 0)),
};

describe('UpdatePersonComponent', () => {
  let fixture: ComponentFixture<UpdatePerson>;
  let component: UpdatePerson;
  let container: Element;
  let reload: any;
  beforeEach(async () => {
    const {
      fixture: componentFixture,
      container: hostContainer,
      rerender,
    } = await render(UpdatePerson, {
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
      inputs: {
        person: null,
      },
      providers: [{ provide: PeopleService, useValue: PEOPLE_SERVICE }, Location],
    });
    fixture = componentFixture;
    component = fixture.componentInstance;
    container = hostContainer;
    reload = rerender;
  });

  describe('#basics', () => {
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
      await reload({ inputs: { person: PERSON } });
    });
    it('should display the person form', () => {
      const sfeirForm = container.querySelector('sfeir-form');
      expect(sfeirForm).not.toBeNull();
    });
    it('should call the method updatePerson', () => {
      const sfeirForm = container.querySelector('sfeir-form');
      const updatePersonSpy = vi.spyOn(component, 'updatePerson');
      const customEvent = new CustomEvent('save');
      fireEvent(sfeirForm, customEvent);
      expect(updatePersonSpy).toHaveBeenCalled();
    });
    it('should call the method goBack', () => {
      const sfeirForm = container.querySelector('sfeir-form');
      const goBackSpy = vi.spyOn(component, 'goBack');
      const customEvent = new CustomEvent('cancel');
      fireEvent(sfeirForm, customEvent);
      expect(goBackSpy).toHaveBeenCalled();
    });
  });
  describe('#functions', () => {
    it('should call the method updatePerson of PeopleService', () => {
      const updatePersonSpy = vi.spyOn(PEOPLE_SERVICE, 'updatePerson');
      const goBAckSpy = vi.spyOn(component, 'goBack');
      component.updatePerson(PERSON);
      expect(updatePersonSpy).toHaveBeenCalledWith(PERSON);
      expect(goBAckSpy).toHaveBeenCalled();
    });
  });
});
