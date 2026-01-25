// src/api/product/routes/product.ts
export default {
  routes: [
    // {
    //   method: 'GET',
    //   path: '/products',
    //   handler: 'product.find',
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    // {
    //   method: 'GET',
    //   path: '/products/:id',
    //   handler: 'product.findOne',
    //   config: {
    //     policies: [],
    //     middlewares: [],
    //   },
    // },
    {
      method: 'GET',
      path: '/products/:id/variations',
      handler: 'product.findVariations',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};