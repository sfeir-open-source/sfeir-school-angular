import { Service } from '@angular/core';
import { PEOPLE_MOCK, type Person } from '@sfeir/types';

@Service()
export class People {
  getPeople(): Person[] {
    return PEOPLE_MOCK;
  }

  getFirstPerson(): Person {
    return PEOPLE_MOCK[0];
  }

  getRandomPerson(): Person {
    const randomIndex = Math.floor(Math.random() * PEOPLE_MOCK.length);
    return PEOPLE_MOCK[randomIndex];
  }

  removePerson(id: string): Person[] {
    const index = PEOPLE_MOCK.findIndex(person => person.id === id);
    if (index !== -1) {
      PEOPLE_MOCK.splice(index, 1);
    }
    return PEOPLE_MOCK;
  }
}
