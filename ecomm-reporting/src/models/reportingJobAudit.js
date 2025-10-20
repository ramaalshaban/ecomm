const { sequelize } = require("common");
const { DataTypes } = require("sequelize");

//(Optional: for extension) Audit log for reporting/export operations (who, when, what). Not exposed in CRUD for MVP.
const ReportingJobAudit = sequelize.define(
  "reportingJobAudit",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    exportJobId: {
      // Reference to exportJob this log is for.
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000",
    },
    action: {
      // Audit action performed (e.g. exportStarted, exportFailed, reportGenerated).
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "default",
    },
    timestamp: {
      // When audit action happened.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    details: {
      // Structured details/context for log entry.
      type: DataTypes.JSONB,
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

module.exports = ReportingJobAudit;
