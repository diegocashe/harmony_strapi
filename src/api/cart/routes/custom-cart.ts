/**
 * cart router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/cart/create',
      handler: 'cart.createWithIdentifier',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
