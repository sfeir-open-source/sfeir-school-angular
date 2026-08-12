import fastifyCors from '@fastify/cors';
import { type FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyCors, {
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      const hostname = new URL(origin).hostname;
      if (hostname === 'localhost') {
        return callback(null, true);
      }
      return callback(new Error('Not allowed'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
});
