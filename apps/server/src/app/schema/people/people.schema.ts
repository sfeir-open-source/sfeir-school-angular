import { GET_PEOPLE_SCHEMA_TOKEN, GET_PERSON_TOKEN, UPSERT_PERSON_BODY_TOKEN } from '../../shared/constant/schema-token';

const PERSON_SCHEMA = {
  type: 'object',
  required: [
    'id',
    'photo',
    'firstname',
    'lastname',
    'entity',
    'entryDate',
    'birthDate',
    'gender',
    'email',
    'skills',
    'phone',
    'address',
    'isManager',
  ],
  properties: {
    id: { type: 'string' },
    photo: { type: 'string' },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    entity: { type: 'string' },
    entryDate: { type: 'string' },
    birthDate: { type: 'string' },
    gender: { type: 'string' },
    email: { type: 'string' },
    skills: { type: 'array', items: { type: 'string' } },
    phone: { type: 'string' },
    address: { type: 'object', properties: { street: { type: 'string' }, postalCode: { type: 'number' }, city: { type: 'string' } } },
    isManager: { type: 'boolean' },
    manager: { type: 'string' },
    managerId: { type: 'string' },
  },
} as const;

const UPSERT_PERSON__BODY_SCHEMA = {
  $id: UPSERT_PERSON_BODY_TOKEN,
  type: 'object',
  required: ['photo', 'firstname', 'lastname', 'email', 'phone'],
  properties: {
    photo: { type: 'string' },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
  },
} as const;

const GET_PEOPLE_SCHEMA = {
  $id: GET_PEOPLE_SCHEMA_TOKEN,
  type: 'array',
  items: PERSON_SCHEMA,
} as const;

export const GET_PERSON_SCHEMA = {
  $id: GET_PERSON_TOKEN,
  ...PERSON_SCHEMA,
} as const;

export const PEOPLE_SCHEMA = {
  getPeople: GET_PEOPLE_SCHEMA,
  getPerson: GET_PERSON_SCHEMA,
  upsertPersonBody: UPSERT_PERSON__BODY_SCHEMA,
};
