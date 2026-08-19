import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PEOPLE_MOCK } from '@sfeir/types';
import { People } from './people';

describe('People', () => {
  let peopleService: People;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [People, provideHttpClient(), provideHttpClientTesting()],
    });
    peopleService = TestBed.inject(People);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Instance', () => {
    it('should create the service', () => {
      expect(peopleService).toBeTruthy();
    });
    it('should create an instance of People', () => {
      expect(peopleService).toBeInstanceOf(People);
    });
  });

  describe('getRandomPerson', () => {
    it('should return a random person', async () => {
      const randomPerson = TestBed.runInInjectionContext(() => peopleService.getRandomPerson());
      TestBed.tick();
      const req = httpMock.expectOne(`${People.baseUrl}/people/random`);
      req.flush(PEOPLE_MOCK[1]);
      await vi.waitFor(() => expect(randomPerson.value()).toEqual(PEOPLE_MOCK[1]));
    });
  });

  describe('getPeople', () => {
    it('should return the whole list of people', () => {
      let people: unknown;
      peopleService.getPeople().subscribe(result => (people = result));
      const req = httpMock.expectOne(`${People.baseUrl}/people`);
      req.flush(PEOPLE_MOCK);
      expect(people).toEqual(PEOPLE_MOCK);
    });
  });

  describe('should remove a person from the list', () => {
    it('should remove the first person form the list', () => {
      const { id: firstPersonId } = PEOPLE_MOCK[0];
      const remainingPeople = PEOPLE_MOCK.filter(person => person.id !== firstPersonId);
      let people: unknown;
      peopleService.removePerson(firstPersonId).subscribe(result => (people = result));
      const req = httpMock.expectOne(`${People.baseUrl}/people/${firstPersonId}`);
      req.flush(remainingPeople);
      expect(people).toEqual(remainingPeople);
    });
  });
});
