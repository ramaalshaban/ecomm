const { ListExportJobsManager } = require("apiLayer");

const ReportingRestController = require("../../ReportingServiceRestController");

class ListExportJobsRestController extends ReportingRestController {
  constructor(req, res) {
    super("listExportJobs", "listexportjobs", req, res);
    this.dataName = "exportJobs";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListExportJobsManager(this._req, "rest");
  }
}

const listExportJobs = async (req, res, next) => {
  const controller = new ListExportJobsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listExportJobs;
