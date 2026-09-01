import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { PEOPLE_MOCK, UpsertPersonBody } from '@sfeir/types';
import { SignalForm } from '@sfeir/ui-solution/signal-form';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { People } from '../../../core/provider/people';
import { PersonDetails } from './person-details';

const PERSON = PEOPLE_MOCK[0];

const STUB_MOCK_PEOPLE_SERVICE = {
  updatePerson: vi.fn(() => of(void 0)),
} satisfies Partial<People>;

async function setup(options?: { people?: Partial<People> }) {
  TestBed.resetTestingModule();
  vi.clearAllMocks();
  const { fixture, debugElement } = await render(PersonDetails, {
    inputs: { person: PERSON },
    providers: [provideRouter([]), { provide: People, useValue: { ...STUB_MOCK_PEOPLE_SERVICE, ...options?.people } }],
  });
  const locationBackSpy = vi.spyOn(TestBed.inject(Location), 'back').mockImplementation(() => void 0);
  return { fixture, component: fixture.componentInstance, debugElement, locationBackSpy };
}

describe('PersonDetails', () => {
  let fixture: ComponentFixture<PersonDetails>;
  let component: PersonDetails;
  let debugElement: DebugElement;
  let locationBackSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    ({ fixture, component, debugElement, locationBackSpy } = await setup());
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of PersonDetails', () => {
      expect(component).toBeInstanceOf(PersonDetails);
    });
  });

  describe('Template', () => {
    it('should pass the resolved person input to the sfeir-signal-form', () => {
      const signalFormElement = debugElement.query(By.directive(SignalForm));
      expect(signalFormElement).toBeTruthy();
      expect(signalFormElement.componentInstance.person()).toEqual(PERSON);
    });
    it('should call goBack on the location when the cancelForm event is emitted', async () => {
      const spy = vi.spyOn(component, 'goBack');
      debugElement.query(By.directive(SignalForm)).triggerEventHandler('cancelForm');
      await fixture.whenStable();
      expect(spy).toHaveBeenCalledOnce();
      expect(locationBackSpy).toHaveBeenCalledOnce();
    });
    it('should update the person and navigate back when the submitForm event is emitted', async () => {
      const updatedBody: UpsertPersonBody = {
        photo: PERSON.photo,
        firstname: 'Updated',
        lastname: PERSON.lastname,
        email: PERSON.email,
        phone: PERSON.phone,
      };
      const spy = vi.spyOn(component, 'savePerson');
      debugElement.query(By.directive(SignalForm)).triggerEventHandler('submitForm', updatedBody);
      await fixture.whenStable();
      expect(spy).toHaveBeenCalledExactlyOnceWith(updatedBody);
      expect(STUB_MOCK_PEOPLE_SERVICE.updatePerson).toHaveBeenCalledExactlyOnceWith(PERSON.id, updatedBody);
      expect(locationBackSpy).toHaveBeenCalledOnce();
    });
  });
});
