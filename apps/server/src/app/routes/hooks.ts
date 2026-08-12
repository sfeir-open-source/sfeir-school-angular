import { type FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.addHook('preHandler', async () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  });
});
