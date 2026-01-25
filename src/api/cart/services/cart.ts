/**
 * cart service
 */

import { factories } from '@strapi/strapi';

const generateIdentifier = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};


export default factories.createCoreService('api::cart.cart', ({ strapi }) => ({
    async createWithIdentifier(products: number[]) {
      try {

        const identifier = generateIdentifier();
        console.log('hello diego from service');

        const entry = await strapi.documents('api::cart.cart').create({
          data: {
            identifier,
            products
          },
          status: 'published'
        })

        return entry
      } catch (err) {
        throw new Error(`Failed to create cart with identifier: ${err.message}`);
      }
    },

}));
