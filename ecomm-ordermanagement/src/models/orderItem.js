const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Snapshot of a product at time of order: productId, name, sku, price per unit, quantity, image url, custom selection/attributes. Not updated after order placed.
const OrderItem = sequelize.define(
  "orderItem",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    productId: {
      // ID of product at time of order (relation to productCatalog), used for validation/reporting.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    productName: {
      // Product name at time of order, stored for audit and reference even if original product is renamed/lost.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    sku: {
      // Product SKU snapshot for later reference/analytics.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    price: {
      // Unit price paid for product at order time (minor currency).
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    quantity: {
      // Quantity of this item purchased in the order.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      // Image URL of product at order time (audit/reference).
      type: DataTypes.STRING,
      allowNull: true,
    },
    attributes: {
      // Flexible snapshot of selected product options/spec at time of order (color, size, etc.).
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    indexes: [],
  },
);

module.exports = OrderItem;
