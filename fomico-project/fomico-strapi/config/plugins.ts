export default () => ({
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'fr',
      locales: ['fr', 'en'],
    },
  },
  upload: {
    config: {
      provider: 'local',
      providerOptions: {},
      sizeLimit: 10 * 1024 * 1024, // 10MB
    },
  },
  email: {
    config: {
      provider: 'sendmail',
      providerOptions: {},
      settings: {
        defaultFrom: 'contact@fomico-industries.com',
        defaultReplyTo: 'contact@fomico-industries.com',
      },
    },
  },
  'users-permissions': {
    config: {
      jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
    },
  },
});
