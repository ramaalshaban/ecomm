const { GetExportJobManager } = require("apiLayer");

const ReportingRestController = require("../../ReportingServiceRestController");

class GetExportJobRestController extends ReportingRestController {
  constructor(req, res) {
    super("getExportJob", "getexportjob", req, res);
    this.dataName = "exportJob";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetExportJobManager(this._req, "rest");
  }
}

const getExportJob = async (req, res, next) => {
  const controller = new GetExportJobRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getExportJob;
