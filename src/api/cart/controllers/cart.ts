import { factories } from '@strapi/strapi';
import { Context } from 'koa';

const generateIdentifier = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async createWithIdentifier(ctx: Context) {
    try {
      const { products } = ctx.request.body as {
        products: number[];
      };

      console.log('hello diego from controller');
      

      const entry = await strapi.service('api::cart.cart').createWithIdentifier(products);

      ctx.send(entry, 201);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
}));
