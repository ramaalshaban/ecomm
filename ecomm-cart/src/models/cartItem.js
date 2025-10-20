const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Describes a product added to a cart with snapshot of its state at time of add—product, quantity, price, and selection attributes.
const CartItem = sequelize.define(
  "cartItem",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    productId: {
      // Product being added to cart (refers to product catalog).
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    productName: {
      // Product name at time of add, cached for display/integrity if product is later removed or renamed.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    priceAtAdd: {
      // Product price (minor currency unit) at the time the item was added to the cart.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    quantity: {
      // Quantity of the product in cart.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    image: {
      // Product image URL (cached/copy at time of add).
      type: DataTypes.STRING,
      allowNull: true,
    },
    attributes: {
      // Flexible object storing selected product options (e.g., color, size, custom) at add time.
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    indexes: [],
  },
);

module.exports = CartItem;
