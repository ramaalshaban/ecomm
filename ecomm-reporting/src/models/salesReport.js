const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Aggregated business/sales analytics snapshot for defined date range (on-demand for reporting/dashboard).
const SalesReport = sequelize.define(
  "salesReport",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    dateRange: {
      // Reporting interval: {start, end} Date fields.
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    totalRevenue: {
      // Sum of totalAmount for paid/completed orders in range.
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    orderCount: {
      // Number of completed orders in the date range.
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    productCount: {
      // Unique products ordered in period (based on sold counts in orders).
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    bestsellers: {
      // Array of bestseller products in range: {productId, productName, soldCount}.
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
    },
    refundsTotal: {
      // Sum of all refunded order amounts (in minor unit) in date range.
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
    },
    exportJobId: {
      // Optional link: the export job this report is attached to (if exported/snapshotted).
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    indexes: [],
  },
);

module.exports = SalesReport;
