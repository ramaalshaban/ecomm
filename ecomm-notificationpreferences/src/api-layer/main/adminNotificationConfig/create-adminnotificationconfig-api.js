const AdminNotificationConfigManager = require("./AdminNotificationConfigManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  AdminnotificationconfigCreatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateAdminnotificationconfig } = require("dbLayer");

class CreateAdminNotificationConfigManager extends AdminNotificationConfigManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createAdminNotificationConfig",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "adminNotificationConfig";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.adminNotificationConfigId = this.adminNotificationConfigId;
    jsonObj.adminId = this.adminId;
    jsonObj.triggerEvents = this.triggerEvents;
    jsonObj.notifyBy = this.notifyBy;
    jsonObj.enabled = this.enabled;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.adminNotificationConfigId = request.body?.adminNotificationConfigId;
    this.adminId = request.session?.userId;
    this.triggerEvents = request.body?.triggerEvents;
    this.notifyBy = request.body?.notifyBy;
    this.enabled = request.body?.enabled;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.adminNotificationConfigId =
      request.mcpParams.adminNotificationConfigId;
    this.adminId = request.session.userId;
    this.triggerEvents = request.mcpParams.triggerEvents;
    this.notifyBy = request.mcpParams.notifyBy;
    this.enabled = request.mcpParams.enabled;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.adminNotificationConfigId = this.id;
    if (!this.adminNotificationConfigId)
      this.adminNotificationConfigId = newUUID(false);

    const dataClause = {
      id: this.adminNotificationConfigId,
      adminId: this.adminId,
      triggerEvents: this.triggerEvents,
      notifyBy: this.notifyBy,
      enabled: this.enabled,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_adminNotificationConfigId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_adminNotificationConfigId() {
    if (this.adminNotificationConfigId == null) return;

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

  checkParameterType_adminId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_adminId() {
    if (this.adminId == null) {
      throw new BadRequestError("errMsg_adminIdisRequired");
    }

    if (Array.isArray(this.adminId)) {
      throw new BadRequestError("errMsg_adminIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_adminId(this.adminId)) {
      throw new BadRequestError("errMsg_adminIdTypeIsNotValid");
    }
  }

  checkParameter_triggerEvents() {
    if (this.triggerEvents == null) {
      throw new BadRequestError("errMsg_triggerEventsisRequired");
    }

    if (!Array.isArray(this.triggerEvents)) {
      throw new BadRequestError("errMsg_triggerEventsMustBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_notifyBy() {
    if (this.notifyBy == null) {
      throw new BadRequestError("errMsg_notifyByisRequired");
    }

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
    if (this.enabled == null) {
      throw new BadRequestError("errMsg_enabledisRequired");
    }

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

    if (this.adminId) this.checkParameter_adminId();

    if (this.triggerEvents) this.checkParameter_triggerEvents();

    if (this.notifyBy) this.checkParameter_notifyBy();

    if (this.enabled) this.checkParameter_enabled();
  }

  async doBusiness() {
    const adminnotificationconfig =
      await dbScriptCreateAdminnotificationconfig(this);
    return adminnotificationconfig;
  }

  async addToOutput() {}

  async raiseEvent() {
    AdminnotificationconfigCreatedPublisher.Publish(
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

module.exports = CreateAdminNotificationConfigManager;
