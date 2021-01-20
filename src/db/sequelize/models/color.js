module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Colors',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAT: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {},
  );
