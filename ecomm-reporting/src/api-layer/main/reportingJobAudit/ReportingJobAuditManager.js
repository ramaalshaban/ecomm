const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const ReportingServiceManager = require("../../service-manager/ReportingServiceManager");

/* Base Class For the Crud Routes Of DbObject ReportingJobAudit */
class ReportingJobAuditManager extends ReportingServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "reportingJobAudit";
    this.modelName = "ReportingJobAudit";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = ReportingJobAuditManager;
