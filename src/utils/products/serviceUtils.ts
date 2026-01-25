import { Data } from "@strapi/strapi";

export interface StoreConfig {
  usdt: string | number;
  bcv: string | number;
}

// Updated types for new schema structure
export type ProductVariationImage = Data.ContentType<'api::product-variation.product-variation'>['gallery'][number];

export type ProductVariation = Data.ContentType<'api::product-variation.product-variation'>;

export type AttributeData = Data.ContentType<'api::attribute.attribute'>;

export interface ProcessedAttribute {
  name: string;
  value: string;
  label?: string;
  color?: string;
  order?: number;
}

export interface ProcessedVariation {
  sku: string;
  additional_variant_price_usd: number;
  additional_variant_price_bs: number;
  stock: number;
  attributes: ProcessedAttribute[];
  gallery: ProductVariationImage[];
}

export interface Product extends Omit<Data.ContentType<'api::product.product'>, 'id' | 'product_variations'> {
  id: number;
  product_variations: ProductVariation[];
}

export interface EnrichedProduct extends Omit<Product, 'product_variations'> {
  product_variations: ProcessedVariation[];
  sale_price_usd: number;
  sale_price_bs: number;
  image_gallery: ProductVariationImage[];
}

/**
 * Obtiene la configuración de populate optimizada para el nuevo esquema
 */
export function getOptimizedPopulate() {
  return {
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
    },
    tags: {
      fields: ['name', 'slug']
    },
    category: {
      fields: ['name', 'slug', 'description']
    },
    gallery: {
      fields: ['name', 'alternativeText', 'caption', 'width', 'height', 'formats', 'url']
    }
  };
}

/**
 * Obtiene los campos optimizados para productos
 */
export function getOptimizedFields() {
  return [
    'name',
    'slug',
    'short_description',
    'long_description',
    'sku',
    'sale_price',
    'published',
    'featured'
  ];
}

/**
 * Procesa los atributos de una variación
 */
export function processAttributes(attributes: AttributeData[]): ProcessedAttribute[] {
  if (!attributes || !Array.isArray(attributes)) return [];

  return attributes
    .filter(attr => attr.attribute_definition && attr.attribute_value)
    .map(attr => ({
      name: attr.attribute_definition.name,
      value: attr.attribute_value.value,
      label: attr.attribute_value.label || attr.attribute_definition.label,
      color: attr.attribute_value.color || undefined,
      order: attr.attribute_value.order || 0
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Procesa las variaciones calculando precios
 */
export function processVariations(
  variations: ProductVariation[], 
  bsAmount: { usdt: number; bcv: number }
): ProcessedVariation[] {
  if (!variations || !Array.isArray(variations)) return [];

  return variations.map((variation: ProductVariation) => {
    const additionalPrice = parseFloat(String(variation.additional_variant_price || 0));
    const prices = calculatePrices(additionalPrice, bsAmount);
    
    const processedAttributes = processAttributes(variation.attributes || []);
    
    return {
      sku: variation.sku,
      additional_variant_price_usd: prices.usd,
      additional_variant_price_bs: prices.bs,
      stock: variation.stock,
      attributes: processedAttributes,
      gallery: variation.gallery || []
    };
  });
}

/**
 * Enriquece un producto con precios calculados y datos procesados
 */
export function enrichProduct(
  product: Product, 
  bsAmount: { usdt: number; bcv: number }
): EnrichedProduct | null {
  if (!product) return null;

  const salePrice = parseFloat(String(product.sale_price));
  const prices = calculatePrices(salePrice, bsAmount);

  // Procesar variaciones con precios calculados
  const processedVariations = processVariations(product.product_variations || [], bsAmount);
  
  const { sale_price, ...restOfProduct } = product;
  
  return {
    ...restOfProduct,
    sale_price_usd: prices.usd,
    sale_price_bs: prices.bs,
    product_variations: processedVariations,
    image_gallery: createImageGallery(product.product_variations || [], product.gallery || [])
  };
}

/**
 * Calcula precios en diferentes monedas
 */
export function calculatePrices(
  productPrice: number, 
  bsAmount: { usdt: number; bcv: number }
): { usd: number; bs: number } {
  const { usdt, bcv } = bsAmount;

  const bs_price = Math.ceil(productPrice * usdt * 10) / 10;
  const usd_price_by_bcv = Math.ceil((bs_price / bcv) * 10) / 10;

  return {
    usd: usd_price_by_bcv,
    bs: bs_price
  };
}

/**
 * Crea una galería de imágenes únicas desde las variaciones y galería principal
 */
export function createImageGallery(
  variations: ProductVariation[], 
  mainGallery: ProductVariationImage[] = []
): ProductVariationImage[] {
  const uniqueImages = new Map<string, ProductVariationImage>();

  // Agregar imágenes de la galería principal del producto
  mainGallery.forEach(image => {
    if (image && image.url) {
      uniqueImages.set(image.url, image);
    }
  });

  // Agregar imágenes de las variaciones
  variations.forEach((variation: ProductVariation) => {
    if (variation.gallery && Array.isArray(variation.gallery)) {
      variation.gallery.forEach(image => {
        if (image && image.url && !uniqueImages.has(image.url)) {
          uniqueImages.set(image.url, image);
        }
      });
    }
  });

  return Array.from(uniqueImages.values());
}