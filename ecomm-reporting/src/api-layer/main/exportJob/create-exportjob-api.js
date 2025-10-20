const ExportJobManager = require("./ExportJobManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { ExportjobCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateExportjob } = require("dbLayer");

class CreateExportJobManager extends ExportJobManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createExportJob",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "exportJob";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.exportJobId = this.exportJobId;
    jsonObj.exportType = this.exportType;
    jsonObj.status = this.status;
    jsonObj.requestedBy = this.requestedBy;
    jsonObj.startedAt = this.startedAt;
    jsonObj.completedAt = this.completedAt;
    jsonObj.downloadUrl = this.downloadUrl;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.exportJobId = request.body?.exportJobId;
    this.exportType = request.body?.exportType;
    this.status = request.body?.status;
    this.requestedBy = request.session?.userId;
    this.startedAt = request.body?.startedAt;
    this.completedAt = request.body?.completedAt;
    this.downloadUrl = request.body?.downloadUrl;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.exportJobId = request.mcpParams.exportJobId;
    this.exportType = request.mcpParams.exportType;
    this.status = request.mcpParams.status;
    this.requestedBy = request.session.userId;
    this.startedAt = request.mcpParams.startedAt;
    this.completedAt = request.mcpParams.completedAt;
    this.downloadUrl = request.mcpParams.downloadUrl;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.exportJobId = this.id;
    if (!this.exportJobId) this.exportJobId = newUUID(false);

    const dataClause = {
      id: this.exportJobId,
      exportType: this.exportType,
      status: this.status,
      requestedBy: this.requestedBy,
      startedAt: this.startedAt,
      completedAt: this.completedAt,
      downloadUrl: this.downloadUrl,
      isActive: true,
    };

    dataClause.startedAt = new Date().toISOString();
    this.startedAt = dataClause.startedAt;

    return dataClause;
  }

  checkParameterType_exportJobId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_exportJobId() {
    if (this.exportJobId == null) return;

    if (Array.isArray(this.exportJobId)) {
      throw new BadRequestError("errMsg_exportJobIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_exportJobId(this.exportJobId)) {
      throw new BadRequestError("errMsg_exportJobIdTypeIsNotValid");
    }
  }

  checkParameterType_exportType(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["orders", "products"];
    if (typeof paramValue !== "string") {
      if (isInt(paramValue)) {
        paramValue = Number(paramValue);
        if (paramValue >= 0 && paramValue <= enumOptions.length - 1) {
          paramValue = enumOptions[paramValue];
          return paramValue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    if (!enumOptions.includes(paramValue.toLowerCase())) {
      return false;
    }

    return true;
  }

  checkParameter_exportType() {
    if (this.exportType == null) {
      throw new BadRequestError("errMsg_exportTypeisRequired");
    }

    if (Array.isArray(this.exportType)) {
      throw new BadRequestError("errMsg_exportTypeMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_exportType(this.exportType);
    if (enumResult === false) {
      throw new BadRequestError("errMsg_exportTypeTypeIsNotValid");
    } else if (enumResult !== true) {
      this.exportType = enumResult;
    }
  }

  checkParameterType_status(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["pending", "completed", "failed"];
    if (typeof paramValue !== "string") {
      if (isInt(paramValue)) {
        paramValue = Number(paramValue);
        if (paramValue >= 0 && paramValue <= enumOptions.length - 1) {
          paramValue = enumOptions[paramValue];
          return paramValue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    if (!enumOptions.includes(paramValue.toLowerCase())) {
      return false;
    }

    return true;
  }

  checkParameter_status() {
    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    if (Array.isArray(this.status)) {
      throw new BadRequestError("errMsg_statusMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_status(this.status);
    if (enumResult === false) {
      throw new BadRequestError("errMsg_statusTypeIsNotValid");
    } else if (enumResult !== true) {
      this.status = enumResult;
    }
  }

  checkParameterType_requestedBy(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_requestedBy() {
    if (this.requestedBy == null) {
      throw new BadRequestError("errMsg_requestedByisRequired");
    }

    if (Array.isArray(this.requestedBy)) {
      throw new BadRequestError("errMsg_requestedByMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_requestedBy(this.requestedBy)) {
      throw new BadRequestError("errMsg_requestedByTypeIsNotValid");
    }
  }

  checkParameterType_completedAt(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_completedAt() {
    if (this.completedAt == null) return;

    if (Array.isArray(this.completedAt)) {
      throw new BadRequestError("errMsg_completedAtMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_completedAt(this.completedAt)) {
      throw new BadRequestError("errMsg_completedAtTypeIsNotValid");
    }
  }

  checkParameter_downloadUrl() {
    if (this.downloadUrl == null) return;

    if (Array.isArray(this.downloadUrl)) {
      throw new BadRequestError("errMsg_downloadUrlMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.exportJobId) this.checkParameter_exportJobId();

    if (this.exportType) this.checkParameter_exportType();

    if (this.status) this.checkParameter_status();

    if (this.requestedBy) this.checkParameter_requestedBy();

    if (this.completedAt) this.checkParameter_completedAt();

    if (this.downloadUrl) this.checkParameter_downloadUrl();
  }

  async doBusiness() {
    const exportjob = await dbScriptCreateExportjob(this);
    return exportjob;
  }

  async addToOutput() {}

  async raiseEvent() {
    ExportjobCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreateExportJobManager;
