const UserNotificationPreferencesManager = require("./UserNotificationPreferencesManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  UsernotificationpreferencesUpdatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateUsernotificationpreferences } = require("dbLayer");

class UpdateUserNotificationPreferencesManager extends UserNotificationPreferencesManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateUserNotificationPreferences",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "userNotificationPreferences";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.userNotificationPreferencesId = this.userNotificationPreferencesId;
    jsonObj.orderUpdates = this.orderUpdates;
    jsonObj.shippingUpdates = this.shippingUpdates;
    jsonObj.promoOptIn = this.promoOptIn;
    jsonObj.paymentEvents = this.paymentEvents;
    jsonObj.systemEvents = this.systemEvents;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.userNotificationPreferencesId =
      request.params?.userNotificationPreferencesId;
    this.orderUpdates = request.body?.orderUpdates;
    this.shippingUpdates = request.body?.shippingUpdates;
    this.promoOptIn = request.body?.promoOptIn;
    this.paymentEvents = request.body?.paymentEvents;
    this.systemEvents = request.body?.systemEvents;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.userNotificationPreferencesId =
      request.mcpParams.userNotificationPreferencesId;
    this.orderUpdates = request.mcpParams.orderUpdates;
    this.shippingUpdates = request.mcpParams.shippingUpdates;
    this.promoOptIn = request.mcpParams.promoOptIn;
    this.paymentEvents = request.mcpParams.paymentEvents;
    this.systemEvents = request.mcpParams.systemEvents;
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

  // data clause methods

  async buildDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      orderUpdates: this.orderUpdates,
      shippingUpdates: this.shippingUpdates,
      promoOptIn: this.promoOptIn,
      paymentEvents: this.paymentEvents,
      systemEvents: this.systemEvents,
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
    const { getUserNotificationPreferencesByQuery } = require("dbLayer");
    this.userNotificationPreferences =
      await getUserNotificationPreferencesByQuery(this.whereClause);
    if (!this.userNotificationPreferences) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.userNotificationPreferences;
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

  checkParameterType_orderUpdates(paramValue) {
    const isBoolean = (n) => !!n === n;
    if (!isBoolean(paramValue)) {
      throw new BadRequestError("errMsg_orderUpdatesisNotAValidBoolean");
    }

    return true;
  }

  checkParameter_orderUpdates() {
    if (this.orderUpdates == null) return;

    if (Array.isArray(this.orderUpdates)) {
      throw new BadRequestError("errMsg_orderUpdatesMustNotBeAnArray");
    }

    // Parameter Type: Boolean

    if (!this.checkParameterType_orderUpdates(this.orderUpdates)) {
      throw new BadRequestError("errMsg_orderUpdatesTypeIsNotValid");
    }
  }

  checkParameterType_shippingUpdates(paramValue) {
    const isBoolean = (n) => !!n === n;
    if (!isBoolean(paramValue)) {
      throw new BadRequestError("errMsg_shippingUpdatesisNotAValidBoolean");
    }

    return true;
  }

  checkParameter_shippingUpdates() {
    if (this.shippingUpdates == null) return;

    if (Array.isArray(this.shippingUpdates)) {
      throw new BadRequestError("errMsg_shippingUpdatesMustNotBeAnArray");
    }

    // Parameter Type: Boolean

    if (!this.checkParameterType_shippingUpdates(this.shippingUpdates)) {
      throw new BadRequestError("errMsg_shippingUpdatesTypeIsNotValid");
    }
  }

  checkParameterType_promoOptIn(paramValue) {
    const isBoolean = (n) => !!n === n;
    if (!isBoolean(paramValue)) {
      throw new BadRequestError("errMsg_promoOptInisNotAValidBoolean");
    }

    return true;
  }

  checkParameter_promoOptIn() {
    if (this.promoOptIn == null) return;

    if (Array.isArray(this.promoOptIn)) {
      throw new BadRequestError("errMsg_promoOptInMustNotBeAnArray");
    }

    // Parameter Type: Boolean

    if (!this.checkParameterType_promoOptIn(this.promoOptIn)) {
      throw new BadRequestError("errMsg_promoOptInTypeIsNotValid");
    }
  }

  checkParameterType_paymentEvents(paramValue) {
    const isBoolean = (n) => !!n === n;
    if (!isBoolean(paramValue)) {
      throw new BadRequestError("errMsg_paymentEventsisNotAValidBoolean");
    }

    return true;
  }

  checkParameter_paymentEvents() {
    if (this.paymentEvents == null) return;

    if (Array.isArray(this.paymentEvents)) {
      throw new BadRequestError("errMsg_paymentEventsMustNotBeAnArray");
    }

    // Parameter Type: Boolean

    if (!this.checkParameterType_paymentEvents(this.paymentEvents)) {
      throw new BadRequestError("errMsg_paymentEventsTypeIsNotValid");
    }
  }

  checkParameterType_systemEvents(paramValue) {
    const isBoolean = (n) => !!n === n;
    if (!isBoolean(paramValue)) {
      throw new BadRequestError("errMsg_systemEventsisNotAValidBoolean");
    }

    return true;
  }

  checkParameter_systemEvents() {
    if (this.systemEvents == null) return;

    if (Array.isArray(this.systemEvents)) {
      throw new BadRequestError("errMsg_systemEventsMustNotBeAnArray");
    }

    // Parameter Type: Boolean

    if (!this.checkParameterType_systemEvents(this.systemEvents)) {
      throw new BadRequestError("errMsg_systemEventsTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.userNotificationPreferencesId)
      this.checkParameter_userNotificationPreferencesId();

    if (this.orderUpdates) this.checkParameter_orderUpdates();

    if (this.shippingUpdates) this.checkParameter_shippingUpdates();

    if (this.promoOptIn) this.checkParameter_promoOptIn();

    if (this.paymentEvents) this.checkParameter_paymentEvents();

    if (this.systemEvents) this.checkParameter_systemEvents();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner =
      this.userNotificationPreferences?.userId === this.session.userId;
  }

  async doBusiness() {
    const usernotificationpreferences =
      await dbScriptUpdateUsernotificationpreferences(this);
    return usernotificationpreferences;
  }

  async addToOutput() {}

  async raiseEvent() {
    UsernotificationpreferencesUpdatedPublisher.Publish(
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

module.exports = UpdateUserNotificationPreferencesManager;
