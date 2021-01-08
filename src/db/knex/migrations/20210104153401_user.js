exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('refreshToken').nullable();
    table.timestamp('deleted_at').nullable();
    table.timestamps();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
