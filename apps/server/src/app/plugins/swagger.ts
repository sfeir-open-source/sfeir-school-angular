import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUi from '@fastify/swagger-ui';
import { type FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
export default fp(async (fastify: FastifyInstance) => {
  await fastify.register(FastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Server API Documentation',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:9000', description: 'Local Server' }],
      tags: [{ name: 'people', description: 'People Endpoint' }],
    },
  });

  await fastify.register(FastifySwaggerUi, {
    routePrefix: '/swagger',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: true,
    },
    staticCSP: true,
  });
});
