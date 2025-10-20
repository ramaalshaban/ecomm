const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const salesReportMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  dateRange: { properties: {} },
  totalRevenue: { type: "double", index: true },
  orderCount: { type: "integer", index: true },
  productCount: { type: "integer", index: true },
  bestsellers: { type: "object", enabled: false },
  refundsTotal: { type: "double", index: true },
  exportJobId: { type: "keyword", index: false },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const exportJobMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  exportType: { type: "keyword", index: true },
  exportType_: { type: "keyword" },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  requestedBy: { type: "keyword", index: true },
  startedAt: { type: "date", index: true },
  completedAt: { type: "date", index: true },
  downloadUrl: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const reportingJobAuditMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  exportJobId: { type: "keyword", index: true },
  action: { type: "keyword", index: true },
  timestamp: { type: "date", index: true },
  details: { type: "object", enabled: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("salesReport", salesReportMapping);
    await new ElasticIndexer("salesReport").updateMapping(salesReportMapping);
    ElasticIndexer.addMapping("exportJob", exportJobMapping);
    await new ElasticIndexer("exportJob").updateMapping(exportJobMapping);
    ElasticIndexer.addMapping("reportingJobAudit", reportingJobAuditMapping);
    await new ElasticIndexer("reportingJobAudit").updateMapping(
      reportingJobAuditMapping,
    );
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;
