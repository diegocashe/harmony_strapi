/**
 * cart router
 */

// export default {
//   routes: [
//     {
//       method: 'POST',
//       path: '/cart/create',
//       handler: 'cart.createWithIdentifier',
//       config: {
//         policies: [],
//         middlewares: [],
//       },
//     },
//   ],
// };
/**
 * product router
 */
/**
 * product router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::cart.cart');
