import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatList } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { Card } from '@sfeir/ui-solution/card';
import { Loader } from '@sfeir/ui-solution/loader';
import { PEOPLE_MOCK, Person, UpsertPersonBody } from '@sfeir/types';
import { fireEvent, render, screen } from '@testing-library/angular';
import { Subject, of } from 'rxjs';
import { People } from '../../core/provider/people';
import { DialogPerson } from './dialog-person/dialog-person';
import { StaffDirectory } from './staff-directory';
import { StaffDirectoryStore } from './staff-directory-store';

const STUB_MOCK_PEOPLE_SERVICE = {
  getPeople: vi.fn(() => of(PEOPLE_MOCK)),
  removePerson: vi.fn(() => of(PEOPLE_MOCK.toSpliced(0, 1))),
  addPerson: vi.fn(() => of(void 0)),
} satisfies Partial<People>;

const NEW_PERSON_BODY: UpsertPersonBody = {
  photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@sfeir.com',
  phone: '0102030405',
};

async function setup(options?: { people?: Partial<People>; matDialogOpen?: ReturnType<typeof vi.fn> }) {
  TestBed.resetTestingModule();
  const { fixture, debugElement } = await render(StaffDirectory, {
    providers: [StaffDirectoryStore, { provide: People, useValue: { ...STUB_MOCK_PEOPLE_SERVICE, ...options?.people } }],
    ...(options?.matDialogOpen && { componentProviders: [{ provide: MatDialog, useValue: { open: options.matDialogOpen } }] }),
  });
  const store = debugElement.injector.get(StaffDirectoryStore);
  return { fixture, component: fixture.componentInstance, debugElement, store };
}

describe('StaffDirectory', () => {
  let fixture: ComponentFixture<StaffDirectory>;
  let component: StaffDirectory;
  let debugElement: DebugElement;
  let store: InstanceType<typeof StaffDirectoryStore>;

  beforeEach(async () => {
    ({ fixture, component, debugElement, store } = await setup());
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

    it('should delete a person and update the store when the card emits a delete event', async () => {
      const firstPerson = PEOPLE_MOCK[0];
      let cardComponents = debugElement.queryAll(By.directive(Card));
      cardComponents[0].triggerEventHandler('delete', firstPerson.id);
      await fixture.whenStable();

      expect(STUB_MOCK_PEOPLE_SERVICE.removePerson).toHaveBeenCalledExactlyOnceWith(firstPerson.id);
      expect(store.people()).toEqual(PEOPLE_MOCK.toSpliced(0, 1));
      cardComponents = debugElement.queryAll(By.directive(Card));
      expect(cardComponents.length).toBe(PEOPLE_MOCK.length - 1);
    });

    it('should toggle the view when the view button is clicked', () => {
      const button = screen.getByTestId('view-button');
      fireEvent.click(button);
      expect(store.view()).toBe('list');
    });

    it('should show the list view', async () => {
      const button = screen.getByTestId('view-button');
      fireEvent.click(button);
      await fixture.whenStable();
      const listView = debugElement.query(By.directive(MatList));
      expect(listView).not.toBeNull();
    });

    it('should teleport each person into a mat-list-item via the projected ng-template', async () => {
      const button = screen.getByTestId('view-button');
      fireEvent.click(button);
      await fixture.whenStable();
      const listItems = debugElement.queryAll(By.css('mat-list-item'));
      expect(listItems.length).toBe(PEOPLE_MOCK.length);
      expect(listItems[0].nativeElement.textContent).toContain(`${PEOPLE_MOCK[0].firstname} ${PEOPLE_MOCK[0].lastname}`);
      expect(listItems[0].nativeElement.textContent).toContain(PEOPLE_MOCK[0].email);
    });

    it('should display the loader while the people list is loading', async () => {
      const pendingGetPeople = new Subject<Person[]>();
      const { debugElement: loadingDebugElement, store: loadingStore } = await setup({ people: { getPeople: vi.fn(() => pendingGetPeople) } });
      expect(loadingStore.isLoading()).toBe(true);
      expect(loadingDebugElement.query(By.directive(Loader))).not.toBeNull();
      expect(loadingDebugElement.queryAll(By.directive(Card)).length).toBe(0);
    });

    it('should open the DialogPerson when the add button is clicked', async () => {
      const matDialogOpen = vi.fn(() => ({ afterClosed: () => new Subject<UpsertPersonBody | undefined>().asObservable() }));
      const { debugElement: addDebugElement } = await setup({ matDialogOpen });
      const button = addDebugElement.query(By.css('[data-testid="button-modal"]')).nativeElement as HTMLElement;
      fireEvent.click(button);
      expect(matDialogOpen).toHaveBeenCalledExactlyOnceWith(DialogPerson);
    });

    it('should add the person and refresh the list when the dialog is closed with a person', async () => {
      const getPeopleSubject = new Subject<Person[]>();
      const afterClosedSubject = new Subject<UpsertPersonBody | undefined>();
      const addPerson = vi.fn(() => of(void 0));
      const { fixture: addFixture, debugElement: addDebugElement } = await setup({
        people: { getPeople: vi.fn(() => getPeopleSubject), addPerson },
        matDialogOpen: vi.fn(() => ({ afterClosed: () => afterClosedSubject.asObservable() })),
      });
      getPeopleSubject.next(PEOPLE_MOCK);
      await addFixture.whenStable();

      fireEvent.click(screen.getByTestId('button-modal'));
      afterClosedSubject.next(NEW_PERSON_BODY);
      await addFixture.whenStable();
      expect(addPerson).toHaveBeenCalledExactlyOnceWith(NEW_PERSON_BODY);

      const refreshedPeople = [...PEOPLE_MOCK, { ...PEOPLE_MOCK[0], id: 'new-person-id' }];
      getPeopleSubject.next(refreshedPeople);
      await addFixture.whenStable();
      expect(addDebugElement.queryAll(By.directive(Card)).length).toBe(refreshedPeople.length);
    });

    it('should not add a person when the dialog is closed without a person', async () => {
      const afterClosedSubject = new Subject<UpsertPersonBody | undefined>();
      const addPerson = vi.fn(() => of(void 0));
      await setup({ people: { addPerson }, matDialogOpen: vi.fn(() => ({ afterClosed: () => afterClosedSubject.asObservable() })) });
      fireEvent.click(screen.getByTestId('button-modal'));
      afterClosedSubject.next(undefined);
      await new Promise(resolve => setTimeout(resolve));
      expect(addPerson).not.toHaveBeenCalled();
    });
  });
});
