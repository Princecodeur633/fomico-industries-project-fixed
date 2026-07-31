import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact-message.contact-message', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);

    try {
      await strapi.plugin('email').service('email').send({
        to: 'contact@fomico-industries.com',
        subject: `Nouveau message de contact - ${response.data.sujet}`,
        text: `
Nouveau message reçu :

Nom: ${response.data.nom}
Email: ${response.data.email}
Sujet: ${response.data.sujet}

Message:
${response.data.message}
        `,
      });
    } catch (err) {
      console.log('Email notification failed:', err);
    }

    return response;
  },
}));
