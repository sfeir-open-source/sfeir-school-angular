import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { environment } from '../../../environments/environment';
import { People, PeopleForm } from '../../shared/models/people.model';
import { PeopleService } from './people.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/state';
import { setPeople } from '../store/action';

const PEOPLE: Array<People> = [
  { id: '1', firstname: 'Sfeirien 1' },
  { id: '2', firstname: 'Sfeirien2' },
] as Array<People>;

const STORE_SERVICE = {
  dispatch: jest.fn(),
};

describe('PeopleService', () => {
  let service: PeopleService;
  let storeService: Store<AppStore>;
  let controller: HttpTestingController;

  beforeEach(async () => {
    await render(MockContainerProviderComponent, {
      imports: [HttpClientTestingModule],
      providers: [PeopleService, { provide: Store, useValue: STORE_SERVICE }],
    });
    service = TestBed.inject(PeopleService);
    storeService = TestBed.inject(Store);
    controller = TestBed.inject(HttpTestingController);
  });

  describe('#basics', () => {
    test('should create an instance of PeopleService', () => {
      expect(service).toBeInstanceOf(PeopleService);
    });
    test('should define the httpCOntroller', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('#getPeople', () => {
    test('should format the url correctly', () => {
      service.getPeople().subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(PEOPLE);
    });
    test('should return a list of people ', fakeAsync(() => {
      let peoples: Array<People>;
      service.getPeople().subscribe(data => (peoples = data));
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(PEOPLE);
      expect(peoples).toEqual(PEOPLE);
    }));
    test('should dispatch the list of people to the store', fakeAsync(() => {
      const spy = jest.spyOn(storeService, 'dispatch');
      service.getPeople().subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(PEOPLE);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(setPeople({ people: PEOPLE }));
    }));
    test('should throw correctly the error', fakeAsync(() => {
      let error: HttpErrorResponse;
      service.getPeople().subscribe({
        next: () => void 0,
        error: err => (error = err),
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples`).error(new ProgressEvent('ERROR'));
      expect(error).toBeInstanceOf(HttpErrorResponse);
    }));
  });

  describe('#getRandomPeople', () => {
    test('should format the url correctly', () => {
      service.getRandomPeople().subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/random`);
      req.flush(PEOPLE[0]);
    });
    test('should return the correct data', fakeAsync(() => {
      let people: People;
      service.getRandomPeople().subscribe(data => (people = data));
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/random`);
      req.flush(PEOPLE[0]);
      expect(people).toEqual(PEOPLE[0]);
    }));
    test('should throw correctly the error', fakeAsync(() => {
      let error: HttpErrorResponse;
      service.getRandomPeople().subscribe({
        next: () => void 0,
        error: err => (error = err),
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples/random`).error(new ProgressEvent('ERROR'));
      expect(error).toBeInstanceOf(HttpErrorResponse);
    }));
  });

  describe('#deletePeople', () => {
    test('should format the url correctly', () => {
      service.deletePeople(PEOPLE[0].id).subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/${PEOPLE[0].id}`);
      req.flush(PEOPLE);
    });

    test('should throw correctly the error', fakeAsync(() => {
      let error: HttpErrorResponse;
      service.deletePeople(PEOPLE[0].id).subscribe({
        next: () => void 0,
        error: err => (error = err),
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples/${PEOPLE[0].id}`).error(new ProgressEvent('ERROR'));
      expect(error).toBeInstanceOf(HttpErrorResponse);
    }));
  });

  describe('#addPeople', () => {
    test('should format the url correctly', () => {
      service.addNewPerson(PEOPLE[0]).subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(null);
    });
    test('should throw correctly the error', fakeAsync(() => {
      let error: HttpErrorResponse;
      service.addNewPerson(PEOPLE[0]).subscribe({
        next: () => void 0,
        error: err => (error = err),
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples`).error(new ProgressEvent('ERROR'));
      expect(error).toBeInstanceOf(HttpErrorResponse);
    }));
  });
  describe('#getPersonDetails', () => {
    test('should format the url correctly', () => {
      service.getPersonDetails('123').subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/123`);
      req.flush(null);
    });
    test('should return the person details', fakeAsync(() => {
      let person = null;
      service.getPersonDetails('123').subscribe(personDetails => (person = personDetails));
      controller.expectOne(`${environment.peopleEndpoint}/peoples/123`).flush(PEOPLE.at(0));
      expect(person).toEqual(PEOPLE.at(0));
    }));
    test('should throw correctly the error', fakeAsync(() => {
      let error: HttpErrorResponse;
      service.getPersonDetails('123').subscribe({
        next: () => void 0,
        error: err => (error = err),
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples/123`).error(new ProgressEvent('ERROR'));
      expect(error).toBeInstanceOf(HttpErrorResponse);
    }));
  });
  describe('#updatePerson', () => {
    let updatePerson: PeopleForm;
    beforeAll(() => {
      updatePerson = { id: '123', email: 'sfeir.s@sfeir.com', firstname: 'Sfeir', lastname: 'sfeir', phone: '0123456789', photo: 'sfeir.png' };
    });
    test('should format the url correctly', () => {
      service.updatePerson(updatePerson).subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/123`);
      req.flush(null);
    });
    test('should dispatch the list of people to the store', fakeAsync(() => {
      const spy = jest.spyOn(storeService, 'dispatch');
      service.updatePerson(updatePerson).subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/123`);
      req.flush(PEOPLE);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(setPeople({ people: PEOPLE }));
    }));
    test('should throw correctly the error', fakeAsync(() => {
      let error: HttpErrorResponse;
      service.updatePerson(updatePerson).subscribe({
        next: () => void 0,
        error: err => (error = err),
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples/123`).error(new ProgressEvent('ERROR'));
      expect(error).toBeInstanceOf(HttpErrorResponse);
    }));
  });

  afterEach(() => {
    controller.verify();
  });
});

@Component({
  standalone: true,
  template: '',
})
class MockContainerProviderComponent {}
