const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//Tracks an export operation for orders or product catalog (for CSV/JSON download by admin).
const ExportJob = sequelize.define(
  "exportJob",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    exportType: {
      // Export source: orders or products.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "orders",
    },
    status: {
      // Export job status: pending, completed, failed.
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    requestedBy: {
      // User/admin who requested this export job.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    startedAt: {
      // When export job was started.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    completedAt: {
      // When export job completed (null if not yet).
      type: DataTypes.DATE,
      allowNull: true,
    },
    downloadUrl: {
      // URL to download exported file; set on completion.
      type: DataTypes.STRING,
      allowNull: true,
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

module.exports = ExportJob;
