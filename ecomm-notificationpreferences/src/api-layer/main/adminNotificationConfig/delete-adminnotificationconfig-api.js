const AdminNotificationConfigManager = require("./AdminNotificationConfigManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  AdminnotificationconfigDeletedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeleteAdminnotificationconfig } = require("dbLayer");

class DeleteAdminNotificationConfigManager extends AdminNotificationConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteAdminNotificationConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "adminNotificationConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.adminNotificationConfigId = this.adminNotificationConfigId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.adminNotificationConfigId = request.params?.adminNotificationConfigId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.adminNotificationConfigId =
      request.mcpParams.adminNotificationConfigId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return {
      $and: [{ id: this.adminNotificationConfigId }, { isActive: true }],
    };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async fetchInstance() {
    const { getAdminNotificationConfigByQuery } = require("dbLayer");
    this.adminNotificationConfig = await getAdminNotificationConfigByQuery(
      this.whereClause,
    );
    if (!this.adminNotificationConfig) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.adminNotificationConfig;
  }

  async checkInstance() {
    if (!this.adminNotificationConfig) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_adminNotificationConfigId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_adminNotificationConfigId() {
    if (this.adminNotificationConfigId == null) {
      throw new BadRequestError("errMsg_adminNotificationConfigIdisRequired");
    }

    if (Array.isArray(this.adminNotificationConfigId)) {
      throw new BadRequestError(
        "errMsg_adminNotificationConfigIdMustNotBeAnArray",
      );
    }

    // Parameter Type: ID

    if (
      !this.checkParameterType_adminNotificationConfigId(
        this.adminNotificationConfigId,
      )
    ) {
      throw new BadRequestError(
        "errMsg_adminNotificationConfigIdTypeIsNotValid",
      );
    }
  }

  checkParameters() {
    if (this.adminNotificationConfigId)
      this.checkParameter_adminNotificationConfigId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner =
      this.adminNotificationConfig?.adminId === this.session.userId;
  }

  async doBusiness() {
    const adminnotificationconfig =
      await dbScriptDeleteAdminnotificationconfig(this);
    return adminnotificationconfig;
  }

  async addToOutput() {}

  async raiseEvent() {
    AdminnotificationconfigDeletedPublisher.Publish(
      this.output,
      this.session,
    ).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = DeleteAdminNotificationConfigManager;
