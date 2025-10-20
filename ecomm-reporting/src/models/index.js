const { DataTypes } = require("sequelize");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");
const { hexaLogger } = require("common");

const SalesReport = require("./salesReport");
const ExportJob = require("./exportJob");
const ReportingJobAudit = require("./reportingJobAudit");

SalesReport.prototype.getData = function () {
  const data = this.dataValues;

  data.exportJob = this.exportJob ? this.exportJob.getData() : undefined;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  return data;
};

SalesReport.belongsTo(ExportJob, {
  as: "exportJob",
  foreignKey: "exportJobId",
  targetKey: "id",
  constraints: false,
});

ExportJob.prototype.getData = function () {
  const data = this.dataValues;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  // set enum Index and enum value
  const exportTypeOptions = ["orders", "products"];
  const dataTypeexportTypeExportJob = typeof data.exportType;
  const enumIndexexportTypeExportJob =
    dataTypeexportTypeExportJob === "string"
      ? exportTypeOptions.indexOf(data.exportType)
      : data.exportType;
  data.exportType_idx = enumIndexexportTypeExportJob;
  data.exportType =
    enumIndexexportTypeExportJob > -1
      ? exportTypeOptions[enumIndexexportTypeExportJob]
      : null;
  // set enum Index and enum value
  const statusOptions = ["pending", "completed", "failed"];
  const dataTypestatusExportJob = typeof data.status;
  const enumIndexstatusExportJob =
    dataTypestatusExportJob === "string"
      ? statusOptions.indexOf(data.status)
      : data.status;
  data.status_idx = enumIndexstatusExportJob;
  data.status =
    enumIndexstatusExportJob > -1
      ? statusOptions[enumIndexstatusExportJob]
      : null;

  data._owner = data.requestedBy ?? undefined;

  return data;
};

ReportingJobAudit.prototype.getData = function () {
  const data = this.dataValues;

  data.exportJob = this.exportJob ? this.exportJob.getData() : undefined;

  for (const key of Object.keys(data)) {
    if (key.startsWith("json_")) {
      data[key] = JSON.parse(data[key]);
      const newKey = key.slice(5);
      data[newKey] = data[key];
      delete data[key];
    }
  }

  return data;
};

ReportingJobAudit.belongsTo(ExportJob, {
  as: "exportJob",
  foreignKey: "exportJobId",
  targetKey: "id",
  constraints: false,
});

module.exports = {
  SalesReport,
  ExportJob,
  ReportingJobAudit,
  updateElasticIndexMappings,
};
