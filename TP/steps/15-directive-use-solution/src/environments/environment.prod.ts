export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '9000',
    endpoints: {
      allPeople: '/api/people',
      onePeople: '/api/people/:id',
      randomPeople: '/api/people/random'
    }
  }
};
