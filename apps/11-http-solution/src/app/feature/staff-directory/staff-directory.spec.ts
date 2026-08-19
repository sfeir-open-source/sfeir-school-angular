import { fireEvent, render, screen } from '@testing-library/angular';
import { StaffDirectory } from './staff-directory';
import { PEOPLE_MOCK, Person } from '@sfeir/types';
import { People } from '../../core/provider/people';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Card } from '@sfeir/ui-solution/card';
import { Loader } from '@sfeir/ui-solution/loader';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatList } from '@angular/material/list';
import { of, Subject } from 'rxjs';

const STUB_MOCK_PEOPLE_SERVICE = {
  getPeople: vi.fn(() => of(PEOPLE_MOCK)),
  removePerson: vi.fn(() => of(PEOPLE_MOCK.toSpliced(0, 1))),
} satisfies Partial<People>;

describe('StaffDirectory', () => {
  let fixture: ComponentFixture<StaffDirectory>;
  let component: StaffDirectory;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const { fixture: fixtureFromRender, debugElement: debugElementFromRender } = await render(StaffDirectory, {
      providers: [{ provide: People, useValue: STUB_MOCK_PEOPLE_SERVICE }],
    });
    fixture = fixtureFromRender;
    component = fixture.componentInstance;
    debugElement = debugElementFromRender;
  });
  describe('Instance', () => {
    it('should create the staff directory component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of the staff directory component', () => {
      expect(component).toBeInstanceOf(StaffDirectory);
    });
  });
  describe('Template', () => {
    it('should display all the persons', () => {
      const cardComponents = debugElement.queryAll(By.directive(Card));
      expect(cardComponents.length).toBe(PEOPLE_MOCK.length);
    });
    it('should call the handleDeletePerson', async () => {
      const firstPerson = PEOPLE_MOCK[0];
      const spy = vi.spyOn(component, 'handleDelete');
      let cardComponents = debugElement.queryAll(By.directive(Card));
      cardComponents[0].triggerEventHandler('delete', firstPerson.id);
      await fixture.whenStable();
      expect(spy).toHaveBeenCalledExactlyOnceWith(firstPerson.id);
      expect(STUB_MOCK_PEOPLE_SERVICE.removePerson).toHaveBeenCalledExactlyOnceWith(firstPerson.id);
      cardComponents = debugElement.queryAll(By.directive(Card));
      expect(cardComponents.length).toBe(PEOPLE_MOCK.length - 1);
    });
    it('should toggle the view', () => {
      const spy = vi.spyOn(component, 'handleChangeView');
      const button = screen.getByTestId('view-button');
      fireEvent.click(button);
      expect(spy).toHaveBeenCalledOnce();
      expect(component.view()).toBe('list');
    });
    it('should show the list view', async () => {
      const button = screen.getByTestId('view-button');
      fireEvent.click(button);
      await fixture.whenStable();
      const listView = debugElement.query(By.directive(MatList));
      expect(listView).not.toBeNull();
    });
    it('should display the loader while the people list is loading', async () => {
      TestBed.resetTestingModule();
      const pendingGetPeople = new Subject<Person[]>();
      const { debugElement: loadingDebugElement } = await render(StaffDirectory, {
        providers: [
          {
            provide: People,
            useValue: { getPeople: vi.fn(() => pendingGetPeople), removePerson: vi.fn() },
          },
        ],
      });
      expect(loadingDebugElement.query(By.directive(Loader))).not.toBeNull();
      expect(loadingDebugElement.queryAll(By.directive(Card)).length).toBe(0);
    });
  });
});
