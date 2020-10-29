import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { environment } from '../../../environments/environment';

import { PeopleService } from './people.service';

const BASE_URL = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;

describe('PeopleService', () => {
  const expectedResponse = [
    {
      id: '123',
      lastname: 'Powers',
      firstname: 'Black',
      twitter: 'labore'
    },
    {
      id: '456',
      lastname: 'Shaffer',
      firstname: 'Vargas',
      twitter: 'irure'
    },
    {
      id: '789',
      lastname: 'Yang',
      firstname: 'Mendez',
      twitter: 'excepteur'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService]
    });
  });

  describe('fetch()', () => {
    it('should fetch all people when status === 200', inject(
      [PeopleService, HttpTestingController],
      (service: PeopleService, httpTestingController: HttpTestingController) => {
        service.fetch().subscribe(response => {
          expect(response.length).toEqual(3);
          expect(response).toEqual(expectedResponse);
        });

        const req = httpTestingController.expectOne(BASE_URL + environment.backend.endpoints.allPeople);
        expect(req.request.method).toEqual('GET');
        req.flush(expectedResponse);
        httpTestingController.verify();
      }
    ));

    it('should fetch empty array when status !== 200', inject(
      [PeopleService, HttpTestingController],
      (service: PeopleService, httpTestingController: HttpTestingController) => {
        service.fetch().subscribe(response => {
          expect(response).toEqual([]);
        });

        const req = httpTestingController.expectOne(BASE_URL + environment.backend.endpoints.allPeople);
        expect(req.request.method).toEqual('GET');
        req.flush(expectedResponse, { status: 404, statusText: 'Not Found' });
        httpTestingController.verify();
      }
    ));
  });

  describe('fetchRandom()', () => {
    it('should fetch random person when status === 200', inject(
      [PeopleService, HttpTestingController],
      (service: PeopleService, httpTestingController: HttpTestingController) => {
        service.fetchRandom().subscribe(person => {
          expect(person.id).toBe('456');
        });

        const req = httpTestingController.expectOne(BASE_URL + environment.backend.endpoints.randomPeople);
        expect(req.request.method).toEqual('GET');
        req.flush(expectedResponse[1]);
        httpTestingController.verify();
      }
    ));
  });

  describe('fetchOne()', () => {
    it('should fetch person with id=456 when status === 200', inject(
      [PeopleService, HttpTestingController],
      (service: PeopleService, httpTestingController: HttpTestingController) => {
        service.fetchOne('456').subscribe(person => {
          expect(person.id).toBe('456');
        });

        const req = httpTestingController.expectOne(
          BASE_URL + environment.backend.endpoints.onePeople.replace(':id', '456')
        );
        expect(req.request.method).toEqual('GET');
        req.flush(expectedResponse[1]);
        httpTestingController.verify();
      }
    ));
  });

  describe('delete()', () => {
    it('should delete person with id=456 when status === 200', inject(
      [PeopleService, HttpTestingController],
      (service: PeopleService, httpTestingController: HttpTestingController) => {
        const _expectedResponse = Array.from(expectedResponse);
        _expectedResponse.splice(1, 1); // remove entry=1

        service.delete('456').subscribe(response => {
          expect(response.length).toBe(2);
          expect(response[0].id).toBe('123');
          expect(response[1].id).toBe('789');
        });

        const req = httpTestingController.expectOne(
          BASE_URL + environment.backend.endpoints.onePeople.replace(':id', '456')
        );
        expect(req.request.method).toEqual('DELETE');
        req.flush(_expectedResponse);
        httpTestingController.verify();
      }
    ));
  });

  describe('update()', () => {
    it('should update person with id=456 when status === 200', inject(
      [PeopleService, HttpTestingController],
      (service: PeopleService, httpTestingController: HttpTestingController) => {
        const body = expectedResponse[1];
        body.firstname = 'Wassim';
        body.lastname = 'Chegham';
        body.twitter = '@manekinekko';

        service.update(body).subscribe(person => {
          expect(person.id).toBe('456');
          expect(person.firstname).toBe('Wassim');
          expect(person.lastname).toBe('Chegham');
          expect(person.twitter).toBe('@manekinekko');
        });

        const req = httpTestingController.expectOne(
          BASE_URL + environment.backend.endpoints.onePeople.replace(':id', '456')
        );
        expect(req.request.method).toEqual('PUT');

        expectedResponse[1].firstname = 'Wassim';
        expectedResponse[1].lastname = 'Chegham';
        expectedResponse[1].twitter = '@manekinekko';

        req.flush(expectedResponse[1]);
        httpTestingController.verify();
      }
    ));
  });

  describe('create()', () => {
    it('should create person when status === 200', inject(
      [PeopleService, HttpTestingController],
      (service: PeopleService, httpTestingController: HttpTestingController) => {
        const body = {
          id: '900',
          firstname: 'Wassim',
          lastname: 'Chegham',
          twitter: '@manekinekko'
        };

        service.create(body).subscribe(person => {
          expect(person.id).toBe('900');
          expect(person.firstname).toBe('Wassim');
          expect(person.lastname).toBe('Chegham');
          expect(person.twitter).toBe('@manekinekko');
        });

        const req = httpTestingController.expectOne(BASE_URL + environment.backend.endpoints.allPeople);
        expect(req.request.method).toEqual('POST');
        req.flush(body);
        httpTestingController.verify();
      }
    ));
  });
});
