export default {
  routes: [
    {
      method: 'POST',
      path: '/quote-requests/public',
      handler: 'quote-request.create',
      config: {
        auth: false,
        policies: [],
        middlewares: ['api::quote-request.rate-limit'],
      },
    },
  ],
};
