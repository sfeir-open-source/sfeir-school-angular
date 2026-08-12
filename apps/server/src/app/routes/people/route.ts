import { Person } from '@sfeir/types';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { verifyPersonExists } from '../../controller/people';
import {
  CREATE_PERSON_HANDLER,
  DELETE_PERSON_HANDLER,
  GET_PEOPLE_HANDLER,
  GET_PERSON_BY_ID_HANDLER,
  GET_RANDOM_PERSON_HANDLER,
  UPDATE_PERSON_HANDLER,
} from '../../handler/people';
import { GET_PEOPLE_SCHEMA_TOKEN, GET_PERSON_TOKEN, UPSERT_PERSON_BODY_TOKEN } from '../../shared/constant/schema-token';
import { existingResourceMiddleware } from '../../shared/middleware/existing-resource';

export default fp(async (fastify: FastifyInstance) => {
  fastify.get(
    '/api/people',
    {
      schema: {
        tags: ['people'],
        description: 'Get people',
        summary: 'Get people',
        response: {
          200: fastify.getSchema(GET_PEOPLE_SCHEMA_TOKEN),
        },
      },
    },
    GET_PEOPLE_HANDLER,
  );
  fastify.get(
    '/api/people/:id',
    {
      schema: {
        tags: ['people'],
        description: 'Get person by id',
        response: {
          200: fastify.getSchema(GET_PERSON_TOKEN),
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
      },
      preHandler: [existingResourceMiddleware<Person>(verifyPersonExists)],
    },
    GET_PERSON_BY_ID_HANDLER,
  );
  fastify.get(
    '/api/people/random',
    {
      schema: {
        tags: ['people'],
        description: 'Get random person',
        response: {
          200: fastify.getSchema(GET_PERSON_TOKEN),
        },
      },
    },
    GET_RANDOM_PERSON_HANDLER,
  );
  fastify.post(
    '/api/people',
    {
      schema: {
        tags: ['people'],
        description: 'Create person',
        body: fastify.getSchema(UPSERT_PERSON_BODY_TOKEN),
        response: {
          201: {
            type: 'object',
            description: 'Person created',
          },
        },
      },
    },
    CREATE_PERSON_HANDLER,
  );
  fastify.put(
    '/api/people/:id',
    {
      schema: {
        tags: ['people'],
        description: 'Update person',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
        body: fastify.getSchema(UPSERT_PERSON_BODY_TOKEN),
        response: {
          204: {
            type: 'object',
            description: 'Person updated',
          },
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      preHandler: [existingResourceMiddleware<Person>(verifyPersonExists)],
    },
    UPDATE_PERSON_HANDLER,
  );
  fastify.delete(
    '/api/people/:id',
    {
      preHandler: [existingResourceMiddleware<Person>(verifyPersonExists)],
      schema: {
        tags: ['people'],
        description: 'Delete person',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
          },
        },
        response: {
          200: fastify.getSchema(GET_PEOPLE_SCHEMA_TOKEN),
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    DELETE_PERSON_HANDLER,
  );
});
