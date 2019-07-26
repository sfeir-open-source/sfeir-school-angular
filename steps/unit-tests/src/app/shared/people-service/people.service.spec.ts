import { TestBed } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

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

  let httpTestingController: HttpTestingController;
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleService]
    });

    // Inject the http service and test controller for each test
    service = TestBed.get(PeopleService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('fetch()', () => {
    it('should fetch all people when status === 200', () => {
      service.fetch().subscribe(response => {
        // TODO
        expect(true).toBe(false);
      });

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne(service.backendURL.allPeople);

      // Assert that the request is a GET.
      // TODO

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(expectedResponse);
    });

    it('should return an empty array when status !== 200', () => {
      const emsg = 'deliberate 404 error';

      service.fetch().subscribe(response => {
        // TODO
        expect(true).toBe(false);
      }, fail);

      const req = httpTestingController.expectOne(service.backendURL.allPeople);

      // Respond with mock error
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('fetchRandom()', () => {
    it('should fetch random person when status === 200', () => {
      service.fetchRandom().subscribe(person => {
        // TODO
        expect(true).toBe(false);
      });

      const req = httpTestingController.expectOne(service.backendURL.randomPeople);

      req.flush(expectedResponse[1]);
    });
  });

  describe('fetchOne()', () => {
    it('should fetch person with id=456 when status === 200', () => {
      const id = '456';

      service.fetchOne('456').subscribe(person => {
        // TODO
        expect(true).toBe(false);
      });

      const req = httpTestingController.expectOne(service.backendURL.onePeople.replace(':id', id));

      req.flush(expectedResponse[1]);
    });
  });

  describe('delete()', () => {
    it('should delete person with id=456 when status === 200', () => {
      const id = '456';

      service.delete(id).subscribe(response => {
        // TODO
        expect(true).toBe(false);
      });

      const req = httpTestingController.expectOne(service.backendURL.onePeople.replace(':id', id));

      req.flush([expectedResponse[0], ...expectedResponse.slice(2)]); // remove entry=1
    });
  });

  describe('update()', () => {
    it('should update person with id=456 when status === 200', () => {
      const newData = {
        firstname: 'Noël',
        lastname: 'Macé',
        twitter: '@noel_mace'
      };

      const body = { ...expectedResponse[0], ...newData };

      service.update(body).subscribe(person => {
        // TODO
        expect(true).toBe(false);
      });

      const req = httpTestingController.expectOne(service.backendURL.onePeople.replace(':id', body.id));

      req.flush(body);
    });
  });

  describe('create()', () => {
    it('should create person when status === 200', () => {
      const body = {
        id: '900',
        firstname: 'Wassim',
        lastname: 'Chegham',
        twitter: '@manekinekko'
      };

      service.create(body).subscribe(person => {
        // TODO
        expect(true).toBe(false);
      });

      const req = httpTestingController.expectOne(service.backendURL.allPeople);

      req.flush(body);
    });
  });
});
