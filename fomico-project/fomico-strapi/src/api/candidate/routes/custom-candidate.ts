export default {
  routes: [
    {
      method: 'POST',
      path: '/candidates/public',
      handler: 'candidate.create',
      config: {
        auth: false,
        policies: [],
        middlewares: ['api::candidate.rate-limit'],
      },
    },
  ],
};
