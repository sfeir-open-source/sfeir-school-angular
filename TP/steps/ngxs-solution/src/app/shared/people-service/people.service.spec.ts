import { TestBed } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
    service = TestBed.inject(PeopleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('fetch()', () => {
    it('should fetch all people when status === 200', () => {
      service.fetch().subscribe(response => {
        expect(response.length).toEqual(3);
        expect(response).toEqual(expectedResponse);
      });

      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne(service.backendURL.allPeople);

      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');

      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(expectedResponse);
    });

    it('should return an empty array when status !== 200', () => {
      const emsg = 'deliberate 404 error';

      service.fetch().subscribe(response => {
        expect(response).toEqual([]);
      }, fail);

      const req = httpTestingController.expectOne(service.backendURL.allPeople);

      // Respond with mock error
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('fetchRandom()', () => {
    it('should fetch random person when status === 200', () => {
      service.fetchRandom().subscribe(person => {
        expect(person.id).toBe('456');
      });

      const req = httpTestingController.expectOne(service.backendURL.randomPeople);

      req.flush(expectedResponse[1]);
    });
  });

  describe('fetchOne()', () => {
    it('should fetch person with id=456 when status === 200', () => {
      const id = '456';

      service.fetchOne(id).subscribe(person => {
        expect(person.id).toBe(id);
      });

      const req = httpTestingController.expectOne(service.backendURL.onePeople.replace(':id', id));

      req.flush(expectedResponse[1]);
    });
  });

  describe('delete()', () => {
    it('should delete person with id=456 when status === 200', () => {
      const id = '456';

      service.delete(id).subscribe(response => {
        expect(response.length).toBe(2);
        expect(response[0].id).toBe('123');
        expect(response[1].id).toBe('789');
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
        expect(person.id).toBe(body.id);
        expect(person.firstname).toBe(newData.firstname);
        expect(person.lastname).toBe(newData.lastname);
        expect(person.twitter).toBe(newData.twitter);
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
        expect(person.id).toBe('900');
        expect(person.firstname).toBe('Wassim');
        expect(person.lastname).toBe('Chegham');
        expect(person.twitter).toBe('@manekinekko');
      });

      const req = httpTestingController.expectOne(service.backendURL.allPeople);

      req.flush(body);
    });
  });
});
