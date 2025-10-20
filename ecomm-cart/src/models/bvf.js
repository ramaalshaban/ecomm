const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//
const Bvf = sequelize.define(
  "bvf",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },

    isActive: {
      // isActive property will be set to false when deleted
      // so that the document will be archived
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    indexes: [],
  },
);

module.exports = Bvf;
