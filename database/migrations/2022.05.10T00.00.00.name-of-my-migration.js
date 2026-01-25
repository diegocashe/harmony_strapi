/**
 * Migración para crear datos básicos de atributos de productos de boutique
 * Ejecutar con: npm run strapi db:migrate
 * Compatible con Strapi v5 - Document Service API
 */

'use strict';

module.exports = {
  async up() {
    console.log('🚀 Iniciando migración de atributos de boutique...');

    await strapi.db.transaction(async () => {
      try {
        // 1. CREAR ATTRIBUTE DEFINITIONS
        const attributeDefinitions = [
          { name: 'talla', label: 'Talla' },
          { name: 'color', label: 'Color' },
          { name: 'material', label: 'Material' },
          { name: 'tamano_anillo', label: 'Tamaño de Anillo' }
        ];

        console.log('📝 Insertando definiciones de atributos...');
        const insertedDefinitions = [];

        for (const def of attributeDefinitions) {
          const created = await strapi.documents('api::attribute-definition.attribute-definition').create({
            data: {
              name: def.name,
              label: def.label
            }
          });

          insertedDefinitions.push(created);
          console.log(`✅ Creada definición: ${def.name} (ID: ${created.documentId})`);
        }

        // 2. CREAR ATTRIBUTE VALUES
        const attributeValues = [
          // Tallas
          { value: 'XS', label: 'XS - Extra Small', order: 1 },
          { value: 'S', label: 'S - Small', order: 2 },
          { value: 'M', label: 'M - Medium', order: 3 },
          { value: 'L', label: 'L - Large', order: 4 },
          { value: 'XL', label: 'XL - Extra Large', order: 5 },
          { value: 'XXL', label: 'XXL - Double Extra Large', order: 6 },
          { value: '5', label: '5', order: 7 },
          { value: '6', label: '6', order: 8 },
          { value: '7', label: '7', order: 9 },
          { value: '8', label: '8', order: 10 },
          { value: '9', label: '9', order: 11 },
          { value: '10', label: '10', order: 12 },
          { value: '11', label: '11', order: 13 },
          { value: '12', label: '12', order: 14 },
          { value: '13', label: '13', order: 15 },
          { value: '14', label: '14', order: 16 },
          { value: '15', label: '15', order: 17 },
          { value: '16', label: '16', order: 18 },
          { value: '17', label: '17', order: 19 },
          { value: '18', label: '18', order: 20 },
          { value: '19', label: '19', order: 21 },
          { value: '20', label: '20', order: 22 },
          { value: '21', label: '21', order: 23 },
          { value: '22', label: '22', order: 24 },
          { value: '23', label: '23', order: 25 },
          { value: '24', label: '24', order: 26 },
          { value: '25', label: '25', order: 27 },
          { value: '26', label: '26', order: 28 },
          { value: '27', label: '27', order: 29 },
          { value: '28', label: '28', order: 30 },
          { value: '29', label: '29', order: 31 },
          { value: '30', label: '30', order: 32 },
          { value: '31', label: '31', order: 33 },
          { value: '32', label: '32', order: 34 },
          { value: '33', label: '33', order: 35 },
          { value: '34', label: '34', order: 36 },
          { value: '35', label: '35', order: 37 },
          { value: '36', label: '36', order: 38 },
          { value: '37', label: '37', order: 39 },
          { value: '38', label: '38', order: 40 },
          { value: 'adaptable', label: 'Adaptable', order: 41 },
          { value: 'unica', label: 'Única', order: 42 },

          // Tama

          // Colores
          { value: 'negro', label: 'Negro', order: 1, color: '#000000' },
          { value: 'blanco', label: 'Blanco', order: 2, color: '#FFFFFF' },
          { value: 'rojo', label: 'Rojo', order: 3, color: '#FF0000' },
          { value: 'azul', label: 'Azul', order: 4, color: '#0000FF' },
          { value: 'rosa', label: 'Rosa', order: 5, color: '#FFC0CB' },
          { value: 'dorado', label: 'Dorado', order: 6, color: '#FFD700' },
          { value: 'plateado', label: 'Plateado', order: 7, color: '#C0C0C0' },
          { value: 'verde', label: 'Verde', order: 8, color: '#008000' },
          { value: 'morado', label: 'Morado', order: 9, color: '#800080' },
          { value: 'beige', label: 'Beige', order: 10, color: '#F5F5DC' },
          { value: 'gris', label: 'Gris', order: 11, color: '#808080' },
          { value: 'naranja', label: 'Naranja', order: 12, color: '#FFA500' },
          { value: 'amarillo', label: 'Amarillo', order: 13, color: '#FFFF00' },
          { value: 'café', label: 'Café', order: 14, color: '#8B4513' },
          { value: 'celeste', label: 'Celeste', order: 15, color: '#87CEEB' },

          // Materiales
          { value: 'plata_925', label: 'Plata 925', order: 1 },
          { value: 'oro_18k', label: 'Oro 18K', order: 2 },
          { value: 'oro_14k', label: 'Oro 14K', order: 3 },
          { value: 'acero_inoxidable', label: 'Acero Inoxidable', order: 4 },
          { value: 'cuero_genuino', label: 'Cuero Genuino', order: 5 },
          { value: 'seda', label: 'Seda', order: 6 },
          { value: 'algodon', label: 'Algodón', order: 7 },
          { value: 'poliester', label: 'Poliéster', order: 8 },
          { value: 'lino', label: 'Lino', order: 9 },
          { value: 'lana', label: 'Lana', order: 10 },

        ];

        console.log('🎨 Insertando valores de atributos...');
        const insertedValues = [];

        for (const val of attributeValues) {
          const dataToInsert = {
            value: val.value,
            label: val.label,
            order: val.order
          };

          // Solo agregar color si existe
          if (val.color) {
            dataToInsert.color = val.color;
          }

          const created = await strapi.documents('api::attribute-value.attribute-value').create({
            data: dataToInsert
          });

          insertedValues.push(created);
        }

        console.log(`✅ ${insertedValues.length} valores de atributos creados`);

        // 3. CREAR ATTRIBUTES (RELACIONES)
        console.log('🔗 Creando relaciones de atributos...');

        // Mapear definiciones por nombre para facilitar búsqueda
        const defMap = {};
        insertedDefinitions.forEach(def => {
          defMap[def.name] = def.documentId;
        });

        // Mapear valores por value para facilitar búsqueda
        const valMap = {};
        insertedValues.forEach(val => {
          valMap[val.value] = val.documentId;
        });

        const attributesToCreate = [
          // Tallas
          {
            defName: 'talla',
            values: [
              'XS', 'S', 'M', 'L', 'XL', 'XXL',
              '5', '6', '7', '8', '9', '10',
              '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
              '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
              '31', '32', '33', '34', '35', '36', '37', '38',
              'adaptable', 'unica'
            ]
          },
          // Colores
          {
            defName: 'color',
            values: [
              'negro', 'blanco', 'rojo', 'azul', 'rosa', 'dorado',
              'plateado', 'verde', 'morado', 'beige', 'gris',
              'naranja', 'amarillo', 'café', 'celeste'
            ]
          },
          // Materiales
          {
            defName: 'material',
            values: [
              'plata_925', 'oro_18k', 'oro_14k',
              'acero_inoxidable', 'cuero_genuino', 'seda',
              'algodon', 'poliester', 'lino', 'lana'
            ]
          }
        ];


        let totalAttributes = 0;
        for (const attrGroup of attributesToCreate) {
          for (const value of attrGroup.values) {
            const label = `${attrGroup.defName} - ${value}`;

            const created = await strapi.documents('api::attribute.attribute').create({
              data: {
                label: label,
                attribute_definition: defMap[attrGroup.defName],
                attribute_value: valMap[value]
              }
            });

            totalAttributes++;
          }
        }

        console.log(`✅ Migración completada exitosamente!`);
        console.log(`📊 Resumen:`);
        console.log(`   - ${insertedDefinitions.length} definiciones de atributos creadas`);
        console.log(`   - ${insertedValues.length} valores de atributos creados`);
        console.log(`   - ${totalAttributes} atributos (relaciones) creados`);

      } catch (error) {
        console.error('❌ Error durante la migración:', error);
        throw error;
      }
    });
  },

  async down() {
    console.log('🔄 Revirtiendo migración de atributos...');

    await strapi.db.transaction(async () => {
      try {
        // Obtener todos los registros para eliminar
        const attributes = await strapi.documents('api::attribute.attribute').findMany();
        const attributeValues = await strapi.documents('api::attribute-value.attribute-value').findMany();
        const attributeDefinitions = await strapi.documents('api::attribute-definition.attribute-definition').findMany();

        // Eliminar en orden inverso para respetar las relaciones
        console.log('Eliminando attributes...');
        for (const attr of attributes) {
          await strapi.documents('api::attribute.attribute').delete({
            documentId: attr.documentId
          });
        }

        console.log('Eliminando attribute values...');
        for (const value of attributeValues) {
          await strapi.documents('api::attribute-value.attribute-value').delete({
            documentId: value.documentId
          });
        }

        console.log('Eliminando attribute definitions...');
        for (const def of attributeDefinitions) {
          await strapi.documents('api::attribute-definition.attribute-definition').delete({
            documentId: def.documentId
          });
        }

        console.log('✅ Migración revertida exitosamente');
      } catch (error) {
        console.error('❌ Error al revertir migración:', error);
        throw error;
      }
    });
  }
};