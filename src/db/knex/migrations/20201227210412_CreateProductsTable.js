exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');

  await knex.schema.createTable('colors', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('color').notNullable();
    table.timestamp('deleted_at').nullable();
    table.timestamps();
  });

  await knex.schema.createTable('types', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('type').notNullable();
    table.timestamp('deleted_at').nullable();
    table.timestamps();
  });

  await knex.schema.createTable('products', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('type_id').references('id').inTable('types').notNullable();
    table.uuid('color_id').references('id').inTable('colors').notNullable();
    table.decimal('price').notNullable().defaultTo(0.0);
    table.decimal('quantity').notNullable().defaultTo(1);
    table.timestamp('deleted_at').nullable();
    table.timestamps();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('products');
  await knex.schema.dropTable('colors');
  await knex.schema.dropTable('types');
  await knex.raw('drop extension if  exists "uuid-ossp"');
};
