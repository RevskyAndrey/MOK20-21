const path = require('path');
const { readdirSync } = require('fs');
const Sequelize = require('sequelize');
const {
  db: {
    config: { sequelize: configSequelize },
  },
} = require('../../config');

const modelDir = path.join(__dirname, './models');
const sequelize = new Sequelize(configSequelize);
const name = 'sequelize';
const db = {};
const timestamp = Date.now();

readdirSync(modelDir)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(path.join(modelDir, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

async function testConnection() {
  try {
    console.log(`INFO: DB ${name} test connection OK`);
    await sequelize.authenticate();
  } catch (err) {
    console.error('ERROR: test connection failed', err.message || err);
    throw err;
  }
}

async function close() {
  console.log(` INFO: Closing ${name} DB wraper`);
  return sequelize.close();
}

async function createTypeProduct(type) {
  try {
    const item = {};
    item.type = type;
    item.created_at = timestamp;
    item.updated_at = timestamp;
    const res = await db.Type.create(item);
    return res;
  } catch (err) {
    console.error('create type failed', err.message || err);
    throw err;
  }
}

async function createColorProduct(color) {
  try {
    const item = {};
    item.color = color;
    item.created_at = timestamp;
    item.updated_at = timestamp;
    const res = await db.Color.create(item);
    return res;
  } catch (err) {
    console.error('create color failed', err.message || err);
    throw err;
  }
}

async function createProduct(product) {
  try {
    if (!product.type) {
      console.log('ERROR: No product type defined!');
      return { status: 'ERROR: No product type defined!' };
    }
    if (!product.color) {
      console.log('ERROR: No product color defined!');
      return { status: 'ERROR: No product color defined!' };
    }

    const p = JSON.parse(JSON.stringify(product));
    const type = await createTypeProduct(p.type);
    const color = await createColorProduct(p.color);
    delete p.id;
    delete p.type;
    delete p.color;
    p.price = p.price || 0;
    p.quantity = p.quantity || 1;
    p.created_at = timestamp;
    p.updated_at = timestamp;
    p.type_id = type.id;
    p.color_id = color.id;
    const res = await db.Product.create(p);

    console.log(`Debug :New product created ${JSON.stringify(res)}`);
    return res;
  } catch (err) {
    console.error('create product failed', err.message || err);
    throw err;
  }
}

async function getTypeProductId(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    const res = await db.Type.findOne({
      where: {
        id,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('get type  failed', err.message || err);
    throw err;
  }
}

async function getTypeProductTypename(typename) {
  try {
    if (!typename) {
      throw new Error('ERROR: no product Typename defined');
    }
    const res = await db.Type.findOne({
      where: {
        typename,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('get type name failed', err.message || err);
    throw err;
  }
}

async function getColorProductId(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    const res = await db.Color.findOne({
      where: {
        id,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('get color failed', err.message || err);
    throw err;
  }
}

async function getColorProductColorname(colorname) {
  try {
    if (!colorname) {
      throw new Error('ERROR: no product color name defined');
    }
    const res = await db.Color.findOne({
      where: {
        colorname,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('get color failed', err.message || err);
    throw err;
  }
}

async function getProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    const res = await db.Product.findOne({
      where: {
        id,
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('get product failed', err.message || err);
    throw err;
  }
}

async function updateTypeProduct(id, type) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!type) {
      throw new Error('Error : Nothing to update');
    }

    const res = await db.Type.update(type, { where: { id }, returning: true });
    console.log(`Debug: product update ${JSON.stringify(res[1][0])}`);
    return res[1][0];
  } catch (err) {
    console.error('updateTypeProduct failed', err.message || err);
    throw err;
  }
}

async function updateColorProduct(id, color) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!color) {
      throw new Error('Error : Nothing to update');
    }

    const res = await db.Color.update(color, { where: { id }, returning: true });
    console.log(`Debug: product update ${JSON.stringify(res[1][0])}`);
    return res[1][0];
  } catch (err) {
    console.error('updateColorProduct failed', err.message || err);
    throw err;
  }
}

async function updateProduct(id, product) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    if (!Object.keys(product).length) {
      throw new Error('Error : Nothing to update');
    }
    const res = await db.Product.update(product, { where: { id }, returning: true });
    console.log(`Debug: product update ${JSON.stringify(res[1][0])}`);
    return res[1][0];
  } catch (err) {
    console.error('update product failed', err.message || err);
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    //  await db.Product.destroy( {where:{id}} )
    await db.Product.update({ deletedAt: Date.now() }, { where: { id } });
    return true;
  } catch (err) {
    console.error('delete product failed', err.message || err);
    throw err;
  }
}

async function deleteTypeProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    await db.Type.update({ deletedAt: Date.now() }, { where: { id } });

    return true;
  } catch (err) {
    console.error('deleteTypeProduct failed', err.message || err);
    throw err;
  }
}

async function deleteColorProduct(id) {
  try {
    if (!id) {
      throw new Error('ERROR: no product id defined');
    }
    //  await knex('colors').where('id', id).del();
    await db.Color.update({ deletedAt: Date.now() }, { where: { id } });

    return true;
  } catch (err) {
    console.error('deleteColorProduct failed', err.message || err);
    throw err;
  }
}

async function getAllTypesProducts() {
  try {
    const res = await db.Type.find({
      where: {
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('getAllTypesProducts failed', err.message || err);
    throw err;
  }
}

async function getAllcolorsProducts() {
  try {
    const res = await db.Color.find({
      where: {
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('get All colors Products failed', err.message || err);
    throw err;
  }
}

async function getAllProducts() {
  try {
    const res = await db.Product.find({
      where: {
        deletedAt: { [Sequelize.Op.is]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('get  all product failed', err.message || err);
    throw err;
  }
}

async function getAllDeletedTypesProducts() {
  try {
    const res = await db.Type.find({
      where: {
        deletedAt: { [Sequelize.Op.not]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('getAllDeletedTypesProducts failed', err.message || err);
    throw err;
  }
}

async function getAllDeletedColorsProducts() {
  try {
    const res = await db.Color.find({
      where: {
        deletedAt: { [Sequelize.Op.not]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('getAllDeletedColorsProducts failed', err.message || err);
    throw err;
  }
}

async function getAllDeletedProducts() {
  try {
    const res = await db.Product.find({
      where: {
        deletedAt: { [Sequelize.Op.not]: null },
      },
    });
    return res;
  } catch (err) {
    console.error('get  all deletes product failed', err.message || err);
    throw err;
  }
}

module.exports = () => {
  return {
    testConnection,
    close,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllDeletedProducts,
    //---
    getTypeProductId,
    getTypeProductTypename,
    getColorProductId,
    getColorProductColorname,
    createTypeProduct,
    createColorProduct,
    updateTypeProduct,
    updateColorProduct,
    deleteTypeProduct,
    deleteColorProduct,
    getAllTypesProducts,
    getAllcolorsProducts,
    getAllDeletedTypesProducts,
    getAllDeletedColorsProducts,
  };
};
