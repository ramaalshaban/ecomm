const { CreateSalesReportManager } = require("apiLayer");

const ReportingRestController = require("../../ReportingServiceRestController");

class CreateSalesReportRestController extends ReportingRestController {
  constructor(req, res) {
    super("createSalesReport", "createsalesreport", req, res);
    this.dataName = "salesReport";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateSalesReportManager(this._req, "rest");
  }
}

const createSalesReport = async (req, res, next) => {
  const controller = new CreateSalesReportRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createSalesReport;
