import type { FastifyReply, FastifyRequest } from 'fastify';

export function existingResourceMiddleware<T>(callback: (ressourceId: unknown) => Promise<T | undefined> | T | undefined) {
  return async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    let resource = callback(request.params.id);
    if (resource instanceof Promise) {
      resource = await resource;
    }
    if (!resource) {
      return reply.status(404).send({ message: 'Resource not found' });
    }
    return (request.resource = resource) satisfies T;
  };
}
