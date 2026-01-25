/**
 * product controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async find(ctx) {
    const data = await strapi
      .service('api::product.product')
      .findWithEnrichment(ctx.query);

    return data;
  },

  async findOne(ctx) {
    const data = await strapi
      .service('api::product.product')
      .findOneWithEnrichment(ctx.params.id, ctx.query);

    return data;
  },

  // Nuevo endpoint específico para obtener variaciones con imágenes
  async findVariations(ctx) {
    const { id } = ctx.params;
    
    const data = await strapi
      .service('api::product.product')
      .findVariationsWithImages(id, ctx.query);

    return data;
  }
}));