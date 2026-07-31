export default {
  routes: [
    {
      method: 'POST',
      path: '/contact-messages/public',
      handler: 'contact-message.create',
      config: {
        auth: false,
        policies: [],
        middlewares: ['api::contact-message.rate-limit'],
      },
    },
  ],
};
