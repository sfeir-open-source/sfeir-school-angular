import { Service } from '@angular/core';
import { PEOPLE_MOCK, type Person } from '@sfeir/types';

@Service()
export class People {
  getFirstPerson(): Person {
    return PEOPLE_MOCK[0];
  }

  getRandomPerson(): Person {
    const randomIndex = Math.floor(Math.random() * PEOPLE_MOCK.length);
    return PEOPLE_MOCK[randomIndex];
  }
}
