import type { Data } from '@strapi/strapi';

export default {
  async beforeCreate(event: { data: Data.ContentType<'api::sale.sale'> }) {
    const { data } = event;
    const soldProducts = data.sold_products;
    if (!soldProducts || soldProducts.length === 0) return;

    for (const item of soldProducts) {
      const productId = item.product_ref?.id; // type error
      const quantity = item.sold_quantity;

      if (!productId || !quantity) continue;

      const product = await strapi.documents('api::product.product').findFirst(
        {
          filters: {
            id: productId,
          },
        }
      )

      // if (!product || product.general_stock < quantity) {
      //   throw new Error(`Stock insuficiente para el producto ${product?.product_name ?? productId}`);
      // }
    }
  },

  async afterCreate(event: { result: Data.ContentType<'api::sale.sale'> }) {
    // const { result } = event;
    // const soldProducts = result.sold_products;
    // if (!soldProducts || soldProducts.length === 0) return;

    // for (const item of soldProducts) {
    //   const productId = item.product_ref?.id;
    //   const quantity = item.sold_quantity;

    //   if (!productId || !quantity || quantity <= 0) continue;

    //   const [product] = await strapi.entityService.findMany('api::product.product', {
    //     filters: { id: productId },
    //     fields: ['general_stock'],
    //   });

    //   if (!product || product.general_stock < quantity) {
    //     console.warn(`Stock insuficiente para producto ID ${productId}`);
    //     continue;
    //   }

    //   const newStock = product.general_stock - quantity;

    //   await strapi.documents('api::product.product').update({
    //     documentId: productId.toString(),
    //     data: { general_stock: newStock },
    //   });

    // }
  },
};
