const { CreateExportJobManager } = require("apiLayer");

const ReportingRestController = require("../../ReportingServiceRestController");

class CreateExportJobRestController extends ReportingRestController {
  constructor(req, res) {
    super("createExportJob", "createexportjob", req, res);
    this.dataName = "exportJob";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateExportJobManager(this._req, "rest");
  }
}

const createExportJob = async (req, res, next) => {
  const controller = new CreateExportJobRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createExportJob;
