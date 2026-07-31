import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::candidate.candidate', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);

    try {
      await strapi.plugin('email').service('email').send({
        to: 'contact@fomico-industries.com',
        subject: `Nouvelle candidature - ${response.data.poste || 'Poste non précisé'}`,
        text: `
Nouvelle candidature reçue :

Nom: ${response.data.nom}
Email: ${response.data.email}
Téléphone: ${response.data.telephone || '(non renseigné)'}
Poste visé: ${response.data.poste || '(non renseigné)'}

Message:
${response.data.message || '(aucun message)'}

Connectez-vous à l'admin pour consulter le CV joint et traiter cette candidature.
        `,
      });
    } catch (err) {
      console.log('Email notification failed:', err);
    }

    return response;
  },
}));
