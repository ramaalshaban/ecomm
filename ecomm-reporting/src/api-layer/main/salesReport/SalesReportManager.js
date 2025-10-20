const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const ReportingServiceManager = require("../../service-manager/ReportingServiceManager");

/* Base Class For the Crud Routes Of DbObject SalesReport */
class SalesReportManager extends ReportingServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "salesReport";
    this.modelName = "SalesReport";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = SalesReportManager;
