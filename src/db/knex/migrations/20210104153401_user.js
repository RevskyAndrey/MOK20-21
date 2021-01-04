exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');

  await knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('accessToken').notNullable();
    table.string('refreshToken').notNullable();
    table.timestamp('deleted_at').nullable();
    table.timestamps();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
  await knex.raw('drop extension if  exists "uuid-ossp"');
};
