import type { Schema, Struct } from '@strapi/strapi';

export interface CustomerAddress extends Struct.ComponentSchema {
  collectionName: 'components_customer_addresses';
  info: {
    description: 'Store postal addresses';
    displayName: 'Address';
  };
  attributes: {
    address: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    city: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'San Francisco'>;
    country: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'Venezuela'>;
    floor_door_additional: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    postal_code: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }> &
      Schema.Attribute.DefaultTo<'4004'>;
    state_province: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'Zulia'>;
    street_number: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

export interface CustomerSocialProfile extends Struct.ComponentSchema {
  collectionName: 'components_customer_social_profiles';
  info: {
    description: "Store links to customer's social media profiles";
    displayName: 'Social Profile';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'Other']
    > &
      Schema.Attribute.Required;
    profile_url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
  };
}

export interface GlobalSeoData extends Struct.ComponentSchema {
  collectionName: 'components_global_seo_data';
  info: {
    displayName: 'seo';
    icon: 'globe';
  };
  attributes: {
    featured_image: Schema.Attribute.Media<'images'>;
    meta_description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    meta_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 250;
      }> &
      Schema.Attribute.DefaultTo<'meta title'>;
  };
}

export interface HomeAssets extends Struct.ComponentSchema {
  collectionName: 'components_home_assets';
  info: {
    displayName: 'assets';
    icon: 'landscape';
  };
  attributes: {
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface HomeHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_banners';
  info: {
    displayName: 'hero_banner';
    icon: 'house';
  };
  attributes: {
    assets: Schema.Attribute.Component<'home.assets', true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Descubre nuestra colecci\u00F3n de moda est\u00E9tica y minimalista.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Be Aesthetic Now<br />with Harmony'>;
    type: Schema.Attribute.Enumeration<['grid', 'polaroid']>;
  };
}

export interface SaleSaleItem extends Struct.ComponentSchema {
  collectionName: 'components_sale_sale_items';
  info: {
    description: 'Detail of each product within a sale';
    displayName: 'Sale Item';
  };
  attributes: {
    product_name_sale: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    product_ref: Schema.Attribute.Relation<'oneToOne', 'api::product.product'> &
      Schema.Attribute.Required;
    product_sku_sale: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    sold_quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    unit_sale_price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    variant_details_sale: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
  };
}

export interface VariantAttributeDefinitionVariantAttributeSelectOptions
  extends Struct.ComponentSchema {
  collectionName: 'components_variant_attribute_definition_variant_attribute_select_options';
  info: {
    displayName: 'variant attribute select options';
    icon: 'bulletList';
  };
  attributes: {
    color_hexadecimal: Schema.Attribute.String;
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
    value: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'customer.address': CustomerAddress;
      'customer.social-profile': CustomerSocialProfile;
      'global.seo-data': GlobalSeoData;
      'home.assets': HomeAssets;
      'home.hero-banner': HomeHeroBanner;
      'sale.sale-item': SaleSaleItem;
      'variant-attribute-definition.variant-attribute-select-options': VariantAttributeDefinitionVariantAttributeSelectOptions;
    }
  }
}
