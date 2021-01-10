const Knex = require('knex');
const {
  db: {
    config: { knex: configKnex },
  },
} = require('../../config');

const knex = new Knex(configKnex);

async function createTables() {
  const status = 'created table - ok';

  await knex.schema.createTable('types', table => {
    table.specificType('id', 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY');
    table.string('type').notNullable();
    table.unique('type');
    table.timestamps();
    table.timestamp('deleted_at').defaultTo(null);
  });

  await knex.schema.createTable('colors', table => {
    table.specificType('id', 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY');
    table.string('color').notNullable();
    table.unique('color');
    table.timestamps();
    table.timestamp('deleted_at').defaultTo(null);
  });

  await knex.schema.createTable('products', table => {
    table.specificType('id', 'INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY');
    table.integer('type_id').references('id').inTable('types').notNullable();
    table.integer('color_id').references('id').inTable('colors').notNullable();
    table.decimal('price').nullable().defaultTo(0.0);
    table.unique(['type_id', 'color_id', 'price']);
    table.integer('quantity').notNullable().defaultTo(1);
    table.timestamp('deleted_at').nullable().defaultTo(null);
    table.timestamps();
  });
  return status;
};

module.exports = {
  createTables,
};
