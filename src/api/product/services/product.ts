// src/api/product/services/product.ts
import { factories } from '@strapi/strapi';
import type { Product, EnrichedProduct } from '../../../utils/products/serviceUtils';
import {
  getOptimizedPopulate,
  getOptimizedFields,
  enrichProduct,
  processVariations,
} from '../../../utils/products/serviceUtils';

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  /**
   * Método interno con enriquecimiento
   */
  async findWithEnrichment(params = {}) {
    const optimizedParams = {
      ...params,
      populate: getOptimizedPopulate(),
      fields: getOptimizedFields(),
    };

    const { bcv, usdt } = await strapi
      .service('api::store-configuration.store-configuration')
      .find();

    const result = await super.find(optimizedParams);

    result.results = result.results.map((product: Product) =>
      enrichProduct(product, { bcv, usdt })
    );

    return { data: result.results, meta: { pagination: result.pagination } };
  },

  async findOneWithEnrichment(id: string, params = {}) {
    const optimizedParams = {
      ...params,
      populate: getOptimizedPopulate(),
      fields: getOptimizedFields(),
    };

    const { bcv, usdt } = await strapi
      .service('api::store-configuration.store-configuration')
      .find();

    const result = await super.findOne(id, optimizedParams);

    return enrichProduct(result as Product, { bcv, usdt });
  },

  /**
   * Método específico para obtener solo las variaciones con imágenes
   */
  async findVariationsWithImages(id: string, params = {}) {
    const populateParams = {
      ...params,
      populate: {
        product_variations: {
          fields: ['sku', 'additional_variant_price', 'stock'],
          populate: {
            gallery: {
              fields: ['name', 'alternativeText', 'caption', 'width', 'height', 'formats', 'url']
            },
            attributes: {
              populate: {
                attribute_definition: {
                  fields: ['name', 'label']
                },
                attribute_value: {
                  fields: ['value', 'label', 'order', 'color']
                }
              }
            }
          }
        }
      },
      fields: ['id', 'product_name', 'sku', 'sale_price']
    };

    const { bcv, usdt } = await strapi
      .service('api::store-configuration.store-configuration')
      .find();

    const result = await super.findOne(id, populateParams);
    
    if (!result) {
      return null;
    }

    const processedVariations = processVariations(result.product_variations || [], { bcv, usdt });

    return {
      id: result.id,
      product_name: result.product_name,
      sku: result.sku,
      variations: processedVariations,
      variations_count: processedVariations.length
    };
  },

  async test(Product: any) {
    
    return 'ok';
  }
}));