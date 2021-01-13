const Knex = require('knex');
const {
  db: {
    config: { knex: configKnex },
  },
} = require('../../config');

const knex = new Knex(configKnex);
const timestamp = new Date();

async function createUser({ username, password,refreshToken }) {
  try {
    const item = {};
    item.username = username;
    item.password = password;
    item.refreshToken = refreshToken;
    item.created_at = timestamp;
    item.updated_at = timestamp;
    const res = await knex('users').insert(item).returning('*');
    return res[0];
  } catch (err) {
    console.error('create user failed', err.message || err);
    throw err;
  }
}

async function findOneUser(username) {
  try {
    if (!username) {
      throw new Error('Error : We have a some problems');
    }
    const res = await knex('users').where({ username }).returning('*');
    return res[0];
  } catch (err) {
    console.error('findOne user failed', err.message || err);
    throw err;
  }
}

async function updateUser(id, user) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!Object.keys(user).length) {
      throw new Error('Error : Nothing to update');
    }
    user.updated_at = timestamp;
    const res = await knex('users').update(user).where('id', id).returning('*');
    console.log(`Debug: product update ${JSON.stringify(res[0])}`);
    return res[0];
  } catch (err) {
    console.error('update user failed', err.message || err);
    throw err;
  }
}

async function deleteUser(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    await knex('users').where('id', id).update('deleted_at', new Date());
    return true;
  } catch (err) {
    console.error('delete user failed', err.message || err);
    throw err;
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  findOneUser,
};
