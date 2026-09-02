import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { patchState } from '@ngrx/signals';
import { PEOPLE_MOCK, Person, UpsertPersonBody } from '@sfeir/types';
import { Subject, config, of, throwError } from 'rxjs';
import { People } from '../../core/provider/people';
import { StaffDirectoryStore } from './staff-directory-store';
import { DialogPerson } from './dialog-person/dialog-person';

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

function setup(options?: { people?: Partial<People>; matDialogOpen?: ReturnType<typeof vi.fn> }) {
  TestBed.configureTestingModule({
    providers: [
      StaffDirectoryStore,
      { provide: People, useValue: { ...STUB_MOCK_PEOPLE_SERVICE, ...options?.people } },
      { provide: MatDialog, useValue: { open: options?.matDialogOpen ?? vi.fn() } },
    ],
  });
  return TestBed.inject(StaffDirectoryStore);
}

describe('StaffDirectoryStore', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Instance', () => {
    it('should create the store', () => {
      const store = setup();
      expect(store).toBeTruthy();
    });
  });

  describe('onInit', () => {
    it('should automatically fetch the people list and toggle isLoading', () => {
      const getPeopleSubject = new Subject<Person[]>();
      const store = setup({ people: { getPeople: vi.fn(() => getPeopleSubject) } });

      expect(store.isLoading()).toBe(true);
      expect(store.people()).toEqual([]);

      getPeopleSubject.next(PEOPLE_MOCK);
      getPeopleSubject.complete();

      expect(store.isLoading()).toBe(false);
      expect(store.people()).toEqual(PEOPLE_MOCK);
      expect(store.filteredPeople()).toEqual(PEOPLE_MOCK);
    });

    it('should log an error and stop loading when getPeople fails', async () => {
      // rxMethod subscribes to its inner pipeline without an error callback, so once the
      // `tap({ error })` side-effect logs the error it keeps propagating and rxjs reports it
      // as an unhandled error (asynchronously) instead of surfacing as a synchronous throw.
      const onUnhandledError = vi.fn();
      config.onUnhandledError = onUnhandledError;
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);

      const store = setup({ people: { getPeople: vi.fn(() => throwError(() => new Error('boom'))) } });

      expect(consoleErrorSpy).toHaveBeenCalledOnce();
      expect(store.isLoading()).toBe(false);
      await vi.waitFor(() => expect(onUnhandledError).toHaveBeenCalledOnce());
      config.onUnhandledError = null;
    });
  });

  describe('filteredPeople', () => {
    it('should return every person when the search is empty', () => {
      const store = setup();
      expect(store.filteredPeople()).toEqual(PEOPLE_MOCK);
    });

    it('should filter people by firstname or lastname, case-insensitively', () => {
      const store = setup();
      const target = PEOPLE_MOCK[0];

      patchState(store, { search: target.firstname.toUpperCase() });
      expect(store.filteredPeople()).toEqual([target]);

      patchState(store, { search: target.lastname.toUpperCase() });
      expect(store.filteredPeople()).toEqual([target]);

      patchState(store, { search: 'zzz-no-match-zzz' });
      expect(store.filteredPeople()).toEqual([]);
    });
  });

  describe('deletePerson', () => {
    it('should remove the person and toggle isLoading', () => {
      const removePersonSubject = new Subject<Person[]>();
      const store = setup({ people: { removePerson: vi.fn(() => removePersonSubject) } });
      const [firstPerson] = PEOPLE_MOCK;

      store.deletePerson(firstPerson.id);

      expect(store.isLoading()).toBe(true);

      const remainingPeople = PEOPLE_MOCK.filter(person => person.id !== firstPerson.id);
      removePersonSubject.next(remainingPeople);
      removePersonSubject.complete();

      expect(store.isLoading()).toBe(false);
      expect(store.people()).toEqual(remainingPeople);
    });

    it('should log an error and stop loading when the deletion fails', async () => {
      const onUnhandledError = vi.fn();
      config.onUnhandledError = onUnhandledError;
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0);
      const store = setup({ people: { removePerson: vi.fn(() => throwError(() => new Error('boom'))) } });

      store.deletePerson(PEOPLE_MOCK[0].id);

      expect(consoleErrorSpy).toHaveBeenCalledOnce();
      expect(store.isLoading()).toBe(false);
      await vi.waitFor(() => expect(onUnhandledError).toHaveBeenCalledOnce());
      config.onUnhandledError = null;
    });
  });

  describe('addPerson', () => {
    it('should open the DialogPerson without extra options', () => {
      const afterClosedSubject = new Subject<UpsertPersonBody | undefined>();
      const matDialogOpen = vi.fn(() => ({ afterClosed: () => afterClosedSubject.asObservable() }));
      const store = setup({ matDialogOpen });

      store.addPerson();

      expect(matDialogOpen).toHaveBeenCalledExactlyOnceWith(DialogPerson);
    });

    it('should add the person and refresh the list when the dialog is closed with a value', () => {
      const afterClosedSubject = new Subject<UpsertPersonBody | undefined>();
      const refreshedPeopleSubject = new Subject<Person[]>();
      const addPerson = vi.fn(() => of(void 0));
      const getPeople = vi.fn(() => of(PEOPLE_MOCK));
      const store = setup({
        people: { getPeople, addPerson },
        matDialogOpen: vi.fn(() => ({ afterClosed: () => afterClosedSubject.asObservable() })),
      });
      expect(store.people()).toEqual(PEOPLE_MOCK);

      getPeople.mockReturnValueOnce(refreshedPeopleSubject);
      store.addPerson();
      afterClosedSubject.next(NEW_PERSON_BODY);

      expect(addPerson).toHaveBeenCalledExactlyOnceWith(NEW_PERSON_BODY);
      expect(store.isLoading()).toBe(true);

      const refreshedPeople = [...PEOPLE_MOCK, { ...PEOPLE_MOCK[0], id: 'new-person-id' }];
      refreshedPeopleSubject.next(refreshedPeople);
      refreshedPeopleSubject.complete();

      expect(store.isLoading()).toBe(false);
      expect(store.people()).toEqual(refreshedPeople);
    });

    it('should not add a person when the dialog is closed without a value', () => {
      const afterClosedSubject = new Subject<UpsertPersonBody | undefined>();
      const addPerson = vi.fn(() => of(void 0));
      const store = setup({
        people: { addPerson },
        matDialogOpen: vi.fn(() => ({ afterClosed: () => afterClosedSubject.asObservable() })),
      });

      store.addPerson();
      afterClosedSubject.next(undefined);

      expect(addPerson).not.toHaveBeenCalled();
    });
  });

  describe('changeView', () => {
    it('should toggle the view between card and list', () => {
      const store = setup();

      expect(store.view()).toBe('card');

      store.changeView();
      expect(store.view()).toBe('list');

      store.changeView();
      expect(store.view()).toBe('card');
    });
  });
});
