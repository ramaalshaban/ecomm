const AdminNotificationConfigManager = require("./AdminNotificationConfigManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  AdminnotificationconfigUpdatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateAdminnotificationconfig } = require("dbLayer");

class UpdateAdminNotificationConfigManager extends AdminNotificationConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateAdminNotificationConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "adminNotificationConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.adminNotificationConfigId = this.adminNotificationConfigId;
    jsonObj.triggerEvents = this.triggerEvents;
    jsonObj.notifyBy = this.notifyBy;
    jsonObj.enabled = this.enabled;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.adminNotificationConfigId = request.params?.adminNotificationConfigId;
    this.triggerEvents = request.body?.triggerEvents;
    this.notifyBy = request.body?.notifyBy;
    this.enabled = request.body?.enabled;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.adminNotificationConfigId =
      request.mcpParams.adminNotificationConfigId;
    this.triggerEvents = request.mcpParams.triggerEvents;
    this.notifyBy = request.mcpParams.notifyBy;
    this.enabled = request.mcpParams.enabled;
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

  // data clause methods

  async buildDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      triggerEvents: this.triggerEvents
        ? this.triggerEvents
        : this.triggerEvents_remove
          ? sequelize.fn(
              "array_remove",
              sequelize.col("triggerEvents"),
              this.triggerEvents_remove,
            )
          : this.triggerEvents_append
            ? sequelize.fn(
                "array_append",
                sequelize.col("triggerEvents"),
                this.triggerEvents_append,
              )
            : undefined,
      notifyBy: this.notifyBy
        ? this.notifyBy
        : this.notifyBy_remove
          ? sequelize.fn(
              "array_remove",
              sequelize.col("notifyBy"),
              this.notifyBy_remove,
            )
          : this.notifyBy_append
            ? sequelize.fn(
                "array_append",
                sequelize.col("notifyBy"),
                this.notifyBy_append,
              )
            : undefined,
      enabled: this.enabled,
    };

    let isEmpty = true;
    for (const key of Object.keys(dataClause)) {
      if (dataClause[key] !== undefined) {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      throw new BadRequestError("errMsg_UpdateDataClauseCanNotBeEmpty");
    }

    return dataClause;
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

  checkParameter_triggerEvents() {
    if (this.triggerEvents == null) return;

    if (!Array.isArray(this.triggerEvents)) {
      throw new BadRequestError("errMsg_triggerEventsMustBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_notifyBy() {
    if (this.notifyBy == null) return;

    if (!Array.isArray(this.notifyBy)) {
      throw new BadRequestError("errMsg_notifyByMustBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_enabled(paramValue) {
    const isBoolean = (n) => !!n === n;
    if (!isBoolean(paramValue)) {
      throw new BadRequestError("errMsg_enabledisNotAValidBoolean");
    }

    return true;
  }

  checkParameter_enabled() {
    if (this.enabled == null) return;

    if (Array.isArray(this.enabled)) {
      throw new BadRequestError("errMsg_enabledMustNotBeAnArray");
    }

    // Parameter Type: Boolean

    if (!this.checkParameterType_enabled(this.enabled)) {
      throw new BadRequestError("errMsg_enabledTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.adminNotificationConfigId)
      this.checkParameter_adminNotificationConfigId();

    if (this.triggerEvents) this.checkParameter_triggerEvents();

    if (this.notifyBy) this.checkParameter_notifyBy();

    if (this.enabled) this.checkParameter_enabled();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner =
      this.adminNotificationConfig?.adminId === this.session.userId;
  }

  async doBusiness() {
    const adminnotificationconfig =
      await dbScriptUpdateAdminnotificationconfig(this);
    return adminnotificationconfig;
  }

  async addToOutput() {}

  async raiseEvent() {
    AdminnotificationconfigUpdatedPublisher.Publish(
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

module.exports = UpdateAdminNotificationConfigManager;
