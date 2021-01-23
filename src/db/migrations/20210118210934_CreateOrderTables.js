exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');

  await knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('refreshToken').nullable();
    table.timestamp('deleted_at').nullable();
    table.timestamps();
  });

  await knex.schema.createTable('orders', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('user').references('id').inTable('users').notNullable();
    table.string('from').nullable();
    table.string('to').nullable();
    table.string('status').defaultTo('Opened');
  });

  await knex.schema.createTable('order_info', (table) => {
    table.uuid('order_id').references('orders.id').onDelete('CASCADE');
    table.uuid('product_id').references('products.id').onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.decimal('price').notNullable().defaultTo(0.0);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('order_info');
  await knex.schema.dropTable('orders');
  await knex.schema.dropTable('users');
  await knex.raw('drop extension if exists "uuid-ossp" cascade');
};
