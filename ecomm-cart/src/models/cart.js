const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a single user&#39;s shopping cart containing selected product items, their quantities, and state as of last update.
const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      // User that owns the cart.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    items: {
      // List of items (cartItem) in the cart. Each represents a product selection at time of add.
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
    },
    lastModified: {
      // Last time the cart was modified (any change to items).
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    yuy: {
      //
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
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
    indexes: [
      {
        unique: false,
        fields: ["lastModified"],
      },

      {
        unique: true,
        fields: ["userId"],
        where: { isActive: true },
      },
    ],
  },
);

module.exports = Cart;
