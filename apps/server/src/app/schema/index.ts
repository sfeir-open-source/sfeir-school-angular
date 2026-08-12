import { type FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { PEOPLE_SCHEMA } from './people/people.schema';
export default fp(async (fastify: FastifyInstance) => {
  const schemas = Object.values(PEOPLE_SCHEMA);

  Object.entries(schemas).forEach(([_, value]) => {
    fastify.addSchema(value);
  });
});
