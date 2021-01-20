/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Types', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Types');
  },
};
