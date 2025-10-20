const ExportJobManager = require("./ExportJobManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { ExportjobRetrivedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptGetExportjob } = require("dbLayer");

class GetExportJobManager extends ExportJobManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getExportJob",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
    });

    this.dataName = "exportJob";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.exportJobId = this.exportJobId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.exportJobId = request.params?.exportJobId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.exportJobId = request.mcpParams.exportJobId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.exportJobId }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async checkInstance() {
    if (!this.exportJob) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_exportJobId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_exportJobId() {
    if (this.exportJobId == null) {
      throw new BadRequestError("errMsg_exportJobIdisRequired");
    }

    if (Array.isArray(this.exportJobId)) {
      throw new BadRequestError("errMsg_exportJobIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_exportJobId(this.exportJobId)) {
      throw new BadRequestError("errMsg_exportJobIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.exportJobId) this.checkParameter_exportJobId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.exportJob?.requestedBy === this.session.userId;
  }

  async doBusiness() {
    const exportjob = await dbScriptGetExportjob(this);
    return exportjob;
  }

  async addToOutput() {}

  async raiseEvent() {
    ExportjobRetrivedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = GetExportJobManager;
