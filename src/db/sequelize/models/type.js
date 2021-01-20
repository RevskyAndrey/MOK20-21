module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Types',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
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
