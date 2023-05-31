import { UpdatePersonComponent } from './update-person.component';
import { of } from 'rxjs';
import { People } from '../../shared/models/people.model';
import { fireEvent, render } from '@testing-library/angular';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../../core/providers/people.service';

const PARAM_MAP = new Map<string, string>([['id', '1']]);

const LOCATION = {
  back: jest.fn(),
};

const PERSON: People = { id: '1', lastname: 'SFEIR', firstname: 'SFEIR' } as People;

const ROUTE = {
  data: of({ personDetails: PERSON }),
};

const PEOPLE_SERVICE = {
  getPersonDetails: jest.fn(),
  updatePerson: jest.fn(() => of(void 0)),
};

describe('UpdatePersonComponent', () => {
  let component: UpdatePersonComponent;
  let container: Element;
  let reload: any;

  beforeEach(async () => {
    const {
      fixture,
      container: hostContainer,
      rerender,
    } = await render(UpdatePersonComponent, {
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: ROUTE },
        { provide: Location, useValue: LOCATION },
        { provide: PeopleService, useValue: PEOPLE_SERVICE },
      ],
    });
    component = fixture.componentInstance;
    container = hostContainer;
    reload = rerender;
  });

  describe('#bascis', () => {
    it('should create an instance of UpdatePersonComponent', () => {
      expect(component).toBeInstanceOf(UpdatePersonComponent);
    });
  });
  describe('#ui', () => {
    beforeAll(() => {
      jest.spyOn(PEOPLE_SERVICE, 'getPersonDetails').mockReturnValue(of(PERSON));
    });
    it('should display the person form', async () => {
      jest.spyOn(PEOPLE_SERVICE, 'getPersonDetails').mockReturnValue(of(PERSON));
      await reload();
      const sfeirForm = container.querySelector('sfeir-form');
      expect(sfeirForm).not.toBeNull();
    });
    it('should call the methode updatePerson', () => {
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
