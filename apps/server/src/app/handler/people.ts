import { Person, UpsertPersonBody } from '@sfeir/types';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { createPerson, deletePerson, getPeople, getRandomPerson, updatePerson } from '../controller/people';

export const GET_PEOPLE_HANDLER = async (request: FastifyRequest, reply: FastifyReply) => {
  const people = getPeople();
  return reply.status(200).send(people);
};

export const GET_PERSON_BY_ID_HANDLER = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send(request.resource);
};

export const GET_RANDOM_PERSON_HANDLER = async (request: FastifyRequest, reply: FastifyReply) => {
  const person = getRandomPerson();
  return reply.status(200).send(person);
};

export const DELETE_PERSON_HANDLER = async (request: FastifyRequest, reply: FastifyReply) => {
  const person: Person = request.resource;
  const people = deletePerson(person.id);
  return reply.status(200).send(people);
};

export const CREATE_PERSON_HANDLER = async (request: FastifyRequest, reply: FastifyReply) => {
  const body = request.body as UpsertPersonBody;
  createPerson(body);
  return reply.status(201).send();
};

export const UPDATE_PERSON_HANDLER = async (request: FastifyRequest, reply: FastifyReply) => {
  const person: Person = request.resource;
  const body = request.body as UpsertPersonBody;
  updatePerson(person, body);
  return reply.status(204).send();
};
