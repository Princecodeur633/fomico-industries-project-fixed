import type { Schema, Struct } from '@strapi/strapi';

export interface ProductFeature extends Struct.ComponentSchema {
  collectionName: 'components_product_features';
  info: {
    description: '\u00C9l\u00E9ment de liste r\u00E9utilisable';
    displayName: 'Caract\u00E9ristique';
  };
  attributes: {
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductSpecification extends Struct.ComponentSchema {
  collectionName: 'components_product_specifications';
  info: {
    description: 'Label + valeur technique';
    displayName: 'Sp\u00E9cification technique';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'product.feature': ProductFeature;
      'product.specification': ProductSpecification;
    }
  }
}
