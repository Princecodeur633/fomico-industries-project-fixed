import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::quote-request.quote-request', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);

    // Envoi email notification (à configurer avec provider email)
    try {
      await strapi.plugin('email').service('email').send({
        to: 'contact@fomico-industries.com',
        subject: `Nouvelle demande de devis - ${response.data.societe}`,
        text: `
Nouvelle demande de devis reçue :

Nom: ${response.data.nom}
Société: ${response.data.societe}
Email: ${response.data.email}
Téléphone: ${response.data.telephone}
Produit: ${response.data.produit}
Quantité: ${response.data.quantite}

Message:
${response.data.message}

Connectez-vous à l'admin pour traiter cette demande.
        `,
      });
    } catch (err) {
      console.log('Email notification failed:', err);
    }

    return response;
  },
}));
