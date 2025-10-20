const UserNotificationPreferencesManager = require("./UserNotificationPreferencesManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  UsernotificationpreferencesCreatedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateUsernotificationpreferences } = require("dbLayer");

class CreateUserNotificationPreferencesManager extends UserNotificationPreferencesManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createUserNotificationPreferences",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "userNotificationPreferences";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.userNotificationPreferencesId = this.userNotificationPreferencesId;
    jsonObj.userId = this.userId;
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
      request.body?.userNotificationPreferencesId;
    this.userId = request.session?.userId;
    this.orderUpdates = request.body?.orderUpdates;
    this.shippingUpdates = request.body?.shippingUpdates;
    this.promoOptIn = request.body?.promoOptIn;
    this.paymentEvents = request.body?.paymentEvents;
    this.systemEvents = request.body?.systemEvents;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.userNotificationPreferencesId =
      request.mcpParams.userNotificationPreferencesId;
    this.userId = request.session.userId;
    this.orderUpdates = request.mcpParams.orderUpdates;
    this.shippingUpdates = request.mcpParams.shippingUpdates;
    this.promoOptIn = request.mcpParams.promoOptIn;
    this.paymentEvents = request.mcpParams.paymentEvents;
    this.systemEvents = request.mcpParams.systemEvents;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.userNotificationPreferencesId = this.id;
    if (!this.userNotificationPreferencesId)
      this.userNotificationPreferencesId = newUUID(false);

    const dataClause = {
      id: this.userNotificationPreferencesId,
      userId: this.userId,
      orderUpdates: this.orderUpdates,
      shippingUpdates: this.shippingUpdates,
      promoOptIn: this.promoOptIn,
      paymentEvents: this.paymentEvents,
      systemEvents: this.systemEvents,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_userNotificationPreferencesId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_userNotificationPreferencesId() {
    if (this.userNotificationPreferencesId == null) return;

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

  checkParameterType_userId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_userId() {
    if (this.userId == null) {
      throw new BadRequestError("errMsg_userIdisRequired");
    }

    if (Array.isArray(this.userId)) {
      throw new BadRequestError("errMsg_userIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_userId(this.userId)) {
      throw new BadRequestError("errMsg_userIdTypeIsNotValid");
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
    if (this.orderUpdates == null) {
      throw new BadRequestError("errMsg_orderUpdatesisRequired");
    }

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
    if (this.shippingUpdates == null) {
      throw new BadRequestError("errMsg_shippingUpdatesisRequired");
    }

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
    if (this.promoOptIn == null) {
      throw new BadRequestError("errMsg_promoOptInisRequired");
    }

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
    if (this.paymentEvents == null) {
      throw new BadRequestError("errMsg_paymentEventsisRequired");
    }

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

    if (this.userId) this.checkParameter_userId();

    if (this.orderUpdates) this.checkParameter_orderUpdates();

    if (this.shippingUpdates) this.checkParameter_shippingUpdates();

    if (this.promoOptIn) this.checkParameter_promoOptIn();

    if (this.paymentEvents) this.checkParameter_paymentEvents();

    if (this.systemEvents) this.checkParameter_systemEvents();
  }

  async doBusiness() {
    const usernotificationpreferences =
      await dbScriptCreateUsernotificationpreferences(this);
    return usernotificationpreferences;
  }

  async addToOutput() {}

  async raiseEvent() {
    UsernotificationpreferencesCreatedPublisher.Publish(
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

module.exports = CreateUserNotificationPreferencesManager;
