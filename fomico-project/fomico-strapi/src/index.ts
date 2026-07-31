const PUBLIC_READ_CONTENT_TYPES = [
  'api::product.product',
  'api::product-category.product-category',
  'api::service.service',
  'api::sector.sector',
  'api::news.news',
  'api::project.project',
  'api::testimonial.testimonial',
  'api::partner.partner',
  'api::job.job',
  'api::setting.setting',
];

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) {
        strapi.log.warn('Could not find the "public" role — skipping permission bootstrap.');
        return;
      }

      for (const uid of PUBLIC_READ_CONTENT_TYPES) {
        const actions = ['find', 'findOne'];

        for (const action of actions) {
          const actionId = `${uid}.${action}`;

          const existing = await strapi.query('plugin::users-permissions.permission').findOne({
            where: { action: actionId, role: publicRole.id },
          });

          if (!existing) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: { action: actionId, role: publicRole.id },
            });
            strapi.log.info(`Granted public access: ${actionId}`);
          }
        }
      }
    } catch (err) {
      strapi.log.error('Failed to bootstrap public permissions:', err);
    }
  },
};
