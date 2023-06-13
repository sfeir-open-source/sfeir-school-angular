import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';
import { PeopleService } from './people.service';

const PEOPLE: Array<People> = [
  { id: '1', firstname: 'Sfeirien 1' },
  { id: '2', firstname: 'Sfeirien2' },
] as Array<People>;

describe('PeopleService', () => {
  let service: PeopleService;
  let controller: HttpTestingController;

  beforeEach(async () => {
    await render(MockContainerProviderComponent, { imports: [HttpClientTestingModule], providers: [PeopleService] });
    service = TestBed.inject(PeopleService);
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
    test('should return the correct data', fakeAsync(() => {
      let people: Array<People> = [];
      service.getPeople().subscribe(data => (people = data));
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples`);
      req.flush(PEOPLE);
      expect(people).toEqual(PEOPLE);
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
    test('should return the correct data', fakeAsync(() => {
      let people: Array<People> = [];
      service.deletePeople(PEOPLE[0].id).subscribe(data => (people = data));
      const req = controller.expectOne(`${environment.peopleEndpoint}/peoples/${PEOPLE[0].id}`);
      req.flush([PEOPLE.at(1)]);
      expect(people).toEqual([PEOPLE.at(1)]);
    }));
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

  afterEach(() => {
    controller.verify();
  });
});

@Component({
  standalone: true,
  template: '',
})
class MockContainerProviderComponent {}
