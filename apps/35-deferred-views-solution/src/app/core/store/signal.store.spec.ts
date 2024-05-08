import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { People } from '../../shared/models/people.model';
import { PeopleService } from '../providers/people.service';
import { PEOPLE_STORE, providePeopleStore } from './signal.store';

const PEOPLE: Array<People> = [
  { id: '1', firstname: 'Sfeirien 1', lastname: 'Clara' },
  { id: '2', firstname: 'Sfeirien2', lastname: 'DOE' },
] as Array<People>;

const PEOPLE_SERVICE = {
  getPeople: jest.fn(() => of(PEOPLE)),
  deletePeople: jest.fn(() => of([PEOPLE.at(0)])),
  addNewPerson: jest.fn(),
};

describe('signalStoreFactory', () => {
  let peopleStore: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PeopleService, useValue: PEOPLE_SERVICE }, providePeopleStore()],
    });
    peopleStore = TestBed.inject(PEOPLE_STORE);
  }));

  describe('Basics', () => {
    test('service should be defined', () => {
      expect(peopleStore).toBeDefined();
    });
    test('should peopleFiltered be an empty array', () => {
      expect(peopleStore.peopleFiltered()).toEqual([]);
    });
    test('should search be an empty string', () => {
      expect(peopleStore.search()).toEqual('');
    });
  });

  describe('GetPeople', () => {
    test('should return the list of people', fakeAsync(() => {
      let response = null;
      peopleStore.getPeople().subscribe(data => (response = data));
      tick();
      expect(response).toEqual(PEOPLE);
    }));
    test('should peopleFiltered be the list of people', fakeAsync(() => {
      peopleStore.getPeople().subscribe();
      tick();
      expect(peopleStore.peopleFiltered()).toEqual(PEOPLE);
    }));
  });
  describe('DeletePerson', () => {
    test('should return the list of people', fakeAsync(() => {
      let response = null;
      peopleStore.deletePerson('1').subscribe(data => (response = data));
      tick();
      expect(response).toEqual([PEOPLE.at(0)]);
    }));
    test('should delete the people', fakeAsync(() => {
      peopleStore.deletePerson('1').subscribe();
      tick();
      expect(peopleStore.peopleFiltered()).toEqual([PEOPLE.at(0)]);
    }));
  });
  describe('AddNewPerson', () => {
    test('should call the addPerson method', () => {
      peopleStore.addNewPerson({ firstname: 'Sfeirien 1', lastname: 'Clara' });
      expect(PEOPLE_SERVICE.addNewPerson).toHaveBeenCalledWith({ firstname: 'Sfeirien 1', lastname: 'Clara' });
    });
  });
  describe('PeopleFiltered', () => {
    beforeEach(fakeAsync(() => {
      peopleStore.getPeople().subscribe();
      tick();
    }));
    test('should peopleFiltered be the entire list', () => {
      expect(peopleStore.peopleFiltered()).toEqual(PEOPLE);
    });
    test('should peopleFiltered return the first people', () => {
      peopleStore.setSearch('Clara');
      expect(peopleStore.peopleFiltered()).toEqual([PEOPLE.at(0)]);
    });
    test('should return the entire list', () => {
      peopleStore.setSearch('sfeir');
      expect(peopleStore.peopleFiltered()).toEqual(PEOPLE);
    });
  });
});
