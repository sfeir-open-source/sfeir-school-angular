import { Subject } from 'rxjs/Subject';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, inject, tick } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import 'rxjs/add/operator/map';
// @todo(wassim): there is a weird behavior with mock responses
// they return Promises instead of the actual "expectedResponse" object.
describe('PeopleService', () => {
  let service;
  let mockbackend;
  let lastConnection;
  let expectedResponse = [
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

  const responseOptions = (body, status = 200) => {
    return new ResponseOptions({
      status,
      body: JSON.stringify(body)
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PeopleService, { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  describe('fetch()', () => {
    it('should fetch all people when status === 200', inject([PeopleService, XHRBackend], (service, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions(responseOptions(expectedResponse))));
      });

      service.fetch().subscribe(response => {
        expect(response.length).toEqual(3);
        expect(response).toEqual(expectedResponse);
      });
    }));

    it('should fetch empty array when status !== 200', inject([PeopleService, XHRBackend], (service, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions(responseOptions(expectedResponse, 404))));
      });

      service.fetch().subscribe(response => {
        expect(response).toEqual([]);
      });
    }));
  });

  describe('fetchRandom()', () => {
    it('should fetch random person when status === 200', inject([PeopleService, XHRBackend], (service, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions(responseOptions(expectedResponse[1]))));
      });

      service.fetchRandom().subscribe(person => {
        expect(person.id).toBe('456');
      });
    }));
  });

  describe('fetchOne()', () => {
    it('should fetch person with id=456 when status === 200', inject(
      [PeopleService, XHRBackend],
      (service, mockbackend) => {
        mockbackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions(responseOptions(expectedResponse[1]))));
        });

        service.fetchOne('456').subscribe(person => {
          expect(person.id).toBe('456');
        });
      }
    ));
  });

  describe('delete()', () => {
    it('should delete person with id=456 when status === 200', inject(
      [PeopleService, XHRBackend],
      (service, mockbackend) => {
        mockbackend.connections.subscribe(connection => {
          const _expectedResponse = Array.from(expectedResponse);
          _expectedResponse.splice(1, 1); // remove entry=1

          connection.mockRespond(new Response(new ResponseOptions(responseOptions(_expectedResponse))));
        });

        service.delete('456').subscribe(response => {
          expect(response.length).toBe(2);
          expect(response[0].id).toBe('123');
          expect(response[1].id).toBe('789');
        });
      }
    ));
  });

  describe('update()', () => {
    it('should update person with id=456 when status === 200', inject(
      [PeopleService, XHRBackend],
      (service, mockbackend) => {
        const body = expectedResponse[1];
        body.firstname = 'Wassim';
        body.lastname = 'Chegham';
        body.twitter = '@manekinekko';

        mockbackend.connections.subscribe(connection => {
          expectedResponse[1].firstname = 'Wassim';
          expectedResponse[1].lastname = 'Chegham';
          expectedResponse[1].twitter = '@manekinekko';

          connection.mockRespond(new Response(new ResponseOptions(responseOptions(expectedResponse[1]))));
        });

        service.update(body).subscribe(person => {
          expect(person.id).toBe('456');
          expect(person.firstname).toBe('Wassim');
          expect(person.lastname).toBe('Chegham');
          expect(person.twitter).toBe('@manekinekko');
        });
      }
    ));
  });

  describe('create()', () => {
    it('should create person when status === 200', inject([PeopleService, XHRBackend], (service, mockbackend) => {
      const body = {
        id: '900',
        firstname: 'Wassim',
        lastname: 'Chegham',
        twitter: '@manekinekko'
      };

      mockbackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions(responseOptions(body))));
      });

      service.create(body).subscribe(person => {
        expect(person.id).toBe('900');
        expect(person.firstname).toBe('Wassim');
        expect(person.lastname).toBe('Chegham');
        expect(person.twitter).toBe('@manekinekko');
      });
    }));
  });
});
