/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      typeId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      colorId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAT: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      updatedAT: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      deletedAT: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  },
};
