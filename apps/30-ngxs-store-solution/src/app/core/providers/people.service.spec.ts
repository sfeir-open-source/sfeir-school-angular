import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { People, PeopleForm } from '../../shared/models/people.model';
import { AppStore } from '../store/app-store';
import { PeopleService } from './people.service';
import { provideStore } from '@ngxs/store';

const PEOPLE: Array<People> = [
  { id: '1', firstname: 'Sfeirien 1' },
  { id: '2', firstname: 'Sfeirien2' },
] as Array<People>;

describe('PeopleService', () => {
  let service: PeopleService;
  let controller: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), provideStore([AppStore]), PeopleService],
    });
    service = TestBed.inject(PeopleService);
    controller = TestBed.inject(HttpTestingController);
  });

  describe('#basics', () => {
    test('should create an instance of PeopleService', () => {
      expect(service).toBeInstanceOf(PeopleService);
    });
    test('should define the httpController', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('#getPeople', () => {
    test('should format the url correctly', () => {
      service.getPeople().subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(PEOPLE);
    });
    test('should return the correct data', done => {
      service.getPeople().subscribe(data => {
        expect(data).toEqual(PEOPLE);
        done();
      });
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(PEOPLE);
    });
    test('should set the people to the store', done => {
      const spy = jest.spyOn(service.actions, 'setPeople');
      service.getPeople().subscribe(() => {
        expect(spy).toHaveBeenCalledWith(PEOPLE);
        done();
      });
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(PEOPLE);
    });
    test('should throw correctly the error', done => {
      service.getPeople().subscribe({
        next: () => void 0,
        error: err => {
          expect(err).toBeInstanceOf(HttpErrorResponse);
          done();
        },
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples`).error(new ProgressEvent('ERROR'));
    });
  });

  describe('#getRandomPeople', () => {
    test('should format the url correctly', async () => {
      TestBed.runInInjectionContext(() => service.getRandomPeople());
      TestBed.tick(); // Triggers the effect
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/random`);
      req.flush(PEOPLE[0]);
    });
    test('should return the correct data', async () => {
      const personResource = TestBed.runInInjectionContext(() => service.getRandomPeople());
      TestBed.tick();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/random`);
      req.flush(PEOPLE[0]);
      await TestBed.inject(ApplicationRef).whenStable();
      expect(personResource.value()).toEqual(PEOPLE[0]);
    });
    test('should throw correctly the error', async () => {
      const personResource = TestBed.runInInjectionContext(() => service.getRandomPeople());
      TestBed.tick(); // Triggers the effect
      controller.expectOne(`${environment.peopleEndpoint}/peoples/random`).error(new ProgressEvent('ERROR'));
      await TestBed.inject(ApplicationRef).whenStable();
      expect(() => personResource.value()).toThrow();
      expect(personResource.error()).toBeInstanceOf(HttpErrorResponse);
    });
  });

  describe('#deletePeople', () => {
    test('should format the url correctly', () => {
      service.deletePeople(PEOPLE[0].id).subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/${PEOPLE[0].id}`);
      req.flush(PEOPLE);
    });
    test('should return the correct data', done => {
      service.deletePeople(PEOPLE[0].id).subscribe(data => {
        expect(data).toEqual([PEOPLE.at(1)]);
        done();
      });
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/${PEOPLE[0].id}`);
      req.flush([PEOPLE.at(1)]);
    });
    test('should set the people to the store', done => {
      const spy = jest.spyOn(service.actions, 'setPeople');
      service.deletePeople(PEOPLE[0].id).subscribe(() => {
        expect(spy).toHaveBeenCalledWith([PEOPLE.at(1)]);
        done();
      });
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/${PEOPLE[0].id}`);
      req.flush([PEOPLE.at(1)]);
    });
    test('should throw correctly the error', done => {
      service.deletePeople(PEOPLE[0].id).subscribe({
        next: () => void 0,
        error: err => {
          expect(err).toBeInstanceOf(HttpErrorResponse);
          done();
        },
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples/${PEOPLE[0].id}`).error(new ProgressEvent('ERROR'));
    });
  });
  describe('#addPeople', () => {
    test('should format the url correctly', () => {
      service.addNewPerson(PEOPLE[0]).subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(null);
    });
    test('should throw correctly the error', done => {
      service.addNewPerson(PEOPLE[0]).subscribe({
        next: () => void 0,
        error: err => {
          expect(err).toBeInstanceOf(HttpErrorResponse);
          done();
        },
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples`).error(new ProgressEvent('ERROR'));
    });
  });
  describe('#getPersonDetails', () => {
    test('should format the url correctly', () => {
      service.getPersonDetails('123').subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/123`);
      req.flush(null);
    });
    test('should return the person details', done => {
      service.getPersonDetails('123').subscribe(personDetails => {
        expect(personDetails).toEqual(PEOPLE[0]);
        done();
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples/123`).flush(PEOPLE.at(0));
    });
    test('should throw correctly the error', done => {
      service.getPersonDetails('123').subscribe({
        next: () => void 0,
        error: err => {
          expect(err).toBeInstanceOf(HttpErrorResponse);
          done();
        },
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples/123`).error(new ProgressEvent('ERROR'));
    });
  });
  describe('#updatePerson', () => {
    let updatePerson: PeopleForm;
    beforeAll(() => {
      updatePerson = {
        id: '123',
        email: 'sfeir.s@sfeir.com',
        firstname: 'Sfeir',
        lastname: 'sfeir',
        phone: '0123456789',
        photo: 'sfeir.png',
      };
    });
    test('should format the url correctly', () => {
      service.updatePerson(updatePerson).subscribe();
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/123`);
      req.flush(null);
    });
    test('should throw correctly the error', done => {
      service.updatePerson(updatePerson).subscribe({
        next: () => void 0,
        error: err => {
          expect(err).toBeInstanceOf(HttpErrorResponse);
          done();
        },
      });
      controller.expectOne(`${environment.peopleEndpoint}/peoples/123`).error(new ProgressEvent('ERROR'));
    });
  });

  afterEach(() => {
    controller.verify();
  });
});
