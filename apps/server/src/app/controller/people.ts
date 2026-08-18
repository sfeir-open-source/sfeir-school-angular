import { Person, UpsertPersonBody } from '@sfeir/types';
import { randomUUID } from 'crypto';
import peopleJson from '../../db/people.json';

const people: Person[] = peopleJson.map(person => ({
  ...person,
  entryDate: new Date(person.entryDate),
  birthDate: new Date(person.birthDate),
}));

export const verifyPersonExists = (id: string): Person => {
  return people.find(person => person.id === id);
};

export const getPeople = (): Person[] => {
  return people;
};

export const getRandomPerson = () => people[Math.floor(Math.random() * people.length)];

export const deletePerson = (id: string): Person[] => {
  const index = people.findIndex(p => p.id === id);
  people.splice(index, 1);
  return people;
};

export const createPerson = (body: UpsertPersonBody): void => {
  const newPerson: Person = {
    ...body,
    id: randomUUID(),
    entity: 'SFEIR',
    entryDate: new Date(),
    birthDate: new Date(),
    gender: 'male',
    skills: [],
    address: {
      postalCode: 0,
      city: '',
      street: '',
    },
    isManager: false,
  };
  people.push(newPerson);
};

export const updatePerson = (person: Person, body: UpsertPersonBody): void => {
  const index = people.findIndex(p => p.id === person.id);
  people.splice(index, 1, {
    ...person,
    ...body,
  });
};
