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

  describe('getPeople', () => {
    it('should return the whole list of people', () => {
      expect(peopleService.getPeople()).toEqual(PEOPLE_MOCK);
    });
  });

  describe('should remove a person from the list', () => {
    it('should mutate PEOPLE_MOCK in place and remove the specified person', () => {
      const initialLength = PEOPLE_MOCK.length;
      const { id: firstPersonId } = PEOPLE_MOCK[0];

      const people = peopleService.removePerson(firstPersonId);

      expect(people).toBe(PEOPLE_MOCK);
      expect(people.length).toBe(initialLength - 1);
      expect(people.some(person => person.id === firstPersonId)).toBeFalsy();
    });

    it('should return PEOPLE_MOCK unchanged when the id does not match any person', () => {
      const initialLength = PEOPLE_MOCK.length;

      const people = peopleService.removePerson('non-existent-id');

      expect(people).toBe(PEOPLE_MOCK);
      expect(people.length).toBe(initialLength);
    });
  });
});
