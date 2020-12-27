module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Products',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      typeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      colorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      deletedAT: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {},
  );
