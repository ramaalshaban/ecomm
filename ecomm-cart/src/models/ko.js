const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//
const Ko = sequelize.define(
  "ko",
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

module.exports = Ko;
