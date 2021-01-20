/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable global-require */
/* eslint-disable no-shadow */
const {
  db: { config, defaultType },
} = require('../config');

const db = {};
let type = defaultType;

const funcWrapper = (func) =>
  typeof func === 'function'
    ? func
    : console.log(`FATAL: Cannot find ${func.name} function for current DB wrapper`);

const init = async () => {
  try {
    for (const [k, v] of Object.entries(config)) {
      const wrapper = require(`./${k}`)(v);
      await wrapper.testConnection();
      console.log(`INFO: DB wrapper for ${k} initialized.`);
      db[k] = wrapper;
    }
  } catch (err) {
    console.log('FATAL init: ', err.message || err);
  }
};

const end = async () => {
  for (const [k, v] of Object.entries(db)) {
    await v.close();
    console.log(`INFO: DB wrapper for ${k} was closed.`);
  }
};

const setType = (t) => {
  if (!t || !db[t]) {
    console.log('WARNING: Cannot find provided DB type.');
    return false;
  }
  type = t;
  console.log(`INFO: The DB type has been changed to ${t}`);
  return true;
};

const getType = () => type;

const dbWrapper = (t) => db[t] || db[type];

module.exports = {
  init,
  end,
  setType,
  getType,
  dbWrapper,
  //---------------------------
  testConnection: async () => funcWrapper(dbWrapper().testConnection)(),
  close: async () => funcWrapper(dbWrapper().close)(),
  createProduct: async (product) => funcWrapper(dbWrapper().createProduct)(product),
  getProduct: async (id) => funcWrapper(dbWrapper().getProduct)(id),
  getAllProducts: async () => funcWrapper(dbWrapper().getAllProducts)(),
  updateProduct: async (id, product) => funcWrapper(dbWrapper().updateProduct)(id, product),
  getAllDeletedProducts: async () => funcWrapper(dbWrapper().getAllDeletedProducts)(),
  deleteProduct: async (id) => funcWrapper(dbWrapper().deleteProduct)(id),
  // ------------ type ---------------
  createTypeProduct: async (type) => funcWrapper(dbWrapper().createTypeProduct)(type),
  getTypeProductId: async (id) => funcWrapper(dbWrapper().getTypeProductId)(id),

  getTypeProductTypename: async (typename) =>
    funcWrapper(dbWrapper().getTypeProductTypename)(typename),

  getAllDeletedTypesProducts: async () => funcWrapper(dbWrapper().getAllDeletedTypesProducts)(),
  getAllTypesProducts: async () => funcWrapper(dbWrapper().getAllTypesProducts)(),
  updateTypeProduct: async (id, type) => funcWrapper(dbWrapper().updateTypeProduct)(id, type),
  deleteTypeProduct: async (id) => funcWrapper(dbWrapper().deleteTypeProduct)(id),
  // ---------- color ----------
  createColorProduct: async (color) => funcWrapper(dbWrapper().createColorProduct)(color),
  getColorProductId: async (id) => funcWrapper(dbWrapper().getColorProductId)(id),

  getColorProductColorname: async (colorname) =>
    funcWrapper(dbWrapper().getColorProductColorname)(colorname),

  getAllDeletedColorsProducts: async () => funcWrapper(dbWrapper().getAllDeletedColorsProducts)(),
  getAllcolorsProducts: async () => funcWrapper(dbWrapper().getAllcolorsProducts)(),
  updateColorProduct: async (id, color) => funcWrapper(dbWrapper().updateColorProduct)(id, color),
  deleteColorProduct: async (id) => funcWrapper(dbWrapper().deleteColorProduct)(id),
};
