exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('login').notNullable();
    table.string('password').notNullable();
    table.timestamp('deleted_at').nullable();
    table.timestamps();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
