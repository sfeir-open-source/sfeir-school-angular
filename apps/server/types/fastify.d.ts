import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    params: {
      id: string;
    };
    resource?: T;
  }
}
