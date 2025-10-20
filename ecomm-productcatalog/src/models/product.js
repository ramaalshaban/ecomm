const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Represents a product listed in the e-commerce catalog, with full searchable and filterable attributes including inventory, status, pricing, and dimensional details.
const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      // Product's name, displayed in catalog, used for search and filtering.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    description: {
      // Long form product description.
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      // Product category for filtering and organization.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    price: {
      // Product price in minor currency unit (cents).
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    images: {
      // Array of product image URLs.
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    availability: {
      // Derived: true if status == active and inventoryCount > 0. Otherwise, false. Not directly settable; computed.
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    status: {
      // Product status; 'active' for available products, 'discontinued' for non-sale.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    inventoryCount: {
      // Number of items in stock; 0 means out of stock.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sku: {
      // Stock keeping unit—must be unique across products.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    tags: {
      // Optional array of tags for product search or grouping.
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    weight: {
      // Product weight, in grams.
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    dimensions: {
      // Object containing length, width, height (in cm or mm as schema decided by client/frontend).
      type: DataTypes.JSONB,
      allowNull: true,
    },
    attributes: {
      // Flexible object for variant/specification key-value pairs (e.g., color, material, custom properties).
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["name"],
      },
      {
        unique: false,
        fields: ["category"],
      },
      {
        unique: false,
        fields: ["price"],
      },
      {
        unique: false,
        fields: ["availability"],
      },
      {
        unique: false,
        fields: ["status"],
      },
      {
        unique: false,
        fields: ["inventoryCount"],
      },

      {
        unique: true,
        fields: ["sku"],
      },
      {
        fields: ["name", "category"],
      },
    ],
  },
);

module.exports = Product;
