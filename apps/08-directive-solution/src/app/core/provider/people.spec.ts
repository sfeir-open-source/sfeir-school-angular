import { TestBed } from '@angular/core/testing';
import { PEOPLE_MOCK } from '@sfeir/types';
import { People } from './people';

describe('People', () => {
  let peopleService: People;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [People],
    });
    peopleService = TestBed.inject(People);
  });

  describe('Instance', () => {
    it('should create the service', () => {
      expect(peopleService).toBeTruthy();
    });
    it('should create an instance of People', () => {
      expect(peopleService).toBeInstanceOf(People);
    });
  });

  describe('getFirstPerson', () => {
    it('should return the first person', () => {
      expect(peopleService.getFirstPerson()).toEqual(PEOPLE_MOCK[0]);
    });
  });

  describe('getRandomPerson', () => {
    it('should return a random person', () => {
      const randomPerson = peopleService.getRandomPerson();
      expect(PEOPLE_MOCK.includes(randomPerson)).toBeTruthy();
    });
  });
});
