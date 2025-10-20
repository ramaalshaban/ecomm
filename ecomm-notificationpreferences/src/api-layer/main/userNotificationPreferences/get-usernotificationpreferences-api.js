const UserNotificationPreferencesManager = require("./UserNotificationPreferencesManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  UsernotificationpreferencesRetrivedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptGetUsernotificationpreferences } = require("dbLayer");

class GetUserNotificationPreferencesManager extends UserNotificationPreferencesManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getUserNotificationPreferences",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
    });

    this.dataName = "userNotificationPreferences";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.userNotificationPreferencesId = this.userNotificationPreferencesId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.userNotificationPreferencesId =
      request.params?.userNotificationPreferencesId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.userNotificationPreferencesId =
      request.mcpParams.userNotificationPreferencesId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return {
      $and: [{ id: this.userNotificationPreferencesId }, { isActive: true }],
    };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async checkInstance() {
    if (!this.userNotificationPreferences) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_userNotificationPreferencesId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_userNotificationPreferencesId() {
    if (this.userNotificationPreferencesId == null) {
      throw new BadRequestError(
        "errMsg_userNotificationPreferencesIdisRequired",
      );
    }

    if (Array.isArray(this.userNotificationPreferencesId)) {
      throw new BadRequestError(
        "errMsg_userNotificationPreferencesIdMustNotBeAnArray",
      );
    }

    // Parameter Type: ID

    if (
      !this.checkParameterType_userNotificationPreferencesId(
        this.userNotificationPreferencesId,
      )
    ) {
      throw new BadRequestError(
        "errMsg_userNotificationPreferencesIdTypeIsNotValid",
      );
    }
  }

  checkParameters() {
    if (this.userNotificationPreferencesId)
      this.checkParameter_userNotificationPreferencesId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner =
      this.userNotificationPreferences?.userId === this.session.userId;
  }

  async doBusiness() {
    const usernotificationpreferences =
      await dbScriptGetUsernotificationpreferences(this);
    return usernotificationpreferences;
  }

  async addToOutput() {}

  async raiseEvent() {
    UsernotificationpreferencesRetrivedPublisher.Publish(
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

module.exports = GetUserNotificationPreferencesManager;
