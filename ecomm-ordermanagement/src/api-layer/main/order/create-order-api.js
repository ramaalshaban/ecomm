const OrderManager = require("./OrderManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { OrderCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateOrder } = require("dbLayer");

class CreateOrderManager extends OrderManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createOrder",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "order";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.orderId = this.orderId;
    jsonObj.userId = this.userId;
    jsonObj.items = this.items;
    jsonObj.shippingAddress = this.shippingAddress;
    jsonObj.totalAmount = this.totalAmount;
    jsonObj.currency = this.currency;
    jsonObj.placedAt = this.placedAt;
    jsonObj.stripePaymentIntentId = this.stripePaymentIntentId;
    jsonObj.refundRequested = this.refundRequested;
    jsonObj.refundAmount = this.refundAmount;
    jsonObj.adminNotes = this.adminNotes;
    jsonObj.orderHistory = this.orderHistory;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.orderId = request.body?.orderId;
    this.userId = request.session?.userId;
    this.items = request.body?.items;
    this.shippingAddress = request.body?.shippingAddress;
    this.totalAmount = request.body?.totalAmount;
    this.currency = request.body?.currency;
    this.placedAt = request.body?.placedAt;
    this.stripePaymentIntentId = request.body?.stripePaymentIntentId;
    this.refundRequested = request.body?.refundRequested;
    this.refundAmount = request.body?.refundAmount;
    this.adminNotes = request.body?.adminNotes;
    this.orderHistory = request.body?.orderHistory;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.orderId = request.mcpParams.orderId;
    this.userId = request.session.userId;
    this.items = request.mcpParams.items;
    this.shippingAddress = request.mcpParams.shippingAddress;
    this.totalAmount = request.mcpParams.totalAmount;
    this.currency = request.mcpParams.currency;
    this.placedAt = request.mcpParams.placedAt;
    this.stripePaymentIntentId = request.mcpParams.stripePaymentIntentId;
    this.refundRequested = request.mcpParams.refundRequested;
    this.refundAmount = request.mcpParams.refundAmount;
    this.adminNotes = request.mcpParams.adminNotes;
    this.orderHistory = request.mcpParams.orderHistory;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.orderId = this.id;
    if (!this.orderId) this.orderId = newUUID(false);

    const dataClause = {
      id: this.orderId,
      userId: this.userId,
      items: this.items
        ? typeof this.items == "string"
          ? JSON.parse(this.items)
          : this.items
        : null,
      shippingAddress: this.shippingAddress
        ? typeof this.shippingAddress == "string"
          ? JSON.parse(this.shippingAddress)
          : this.shippingAddress
        : null,
      totalAmount: this.totalAmount,
      currency: this.currency,
      placedAt: this.placedAt,
      stripePaymentIntentId: this.stripePaymentIntentId,
      refundRequested: this.refundRequested,
      refundAmount: this.refundAmount,
      adminNotes: this.adminNotes,
      orderHistory: this.orderHistory
        ? typeof this.orderHistory == "string"
          ? JSON.parse(this.orderHistory)
          : this.orderHistory
        : null,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_orderId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_orderId() {
    if (this.orderId == null) return;

    if (Array.isArray(this.orderId)) {
      throw new BadRequestError("errMsg_orderIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_orderId(this.orderId)) {
      throw new BadRequestError("errMsg_orderIdTypeIsNotValid");
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

  checkParameterType_items(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_items() {
    if (this.items == null) {
      throw new BadRequestError("errMsg_itemsisRequired");
    }

    if (!Array.isArray(this.items)) {
      throw new BadRequestError("errMsg_itemsMustBeAnArray");
    }

    // Parameter Type: Object

    this.items.forEach((item) => {
      if (!this.checkParameterType_items(item)) {
        throw new BadRequestError("errMsg_itemsArrayHasAnInvalidItem");
      }
    });
  }

  checkParameterType_shippingAddress(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_shippingAddress() {
    if (this.shippingAddress == null) {
      throw new BadRequestError("errMsg_shippingAddressisRequired");
    }

    if (Array.isArray(this.shippingAddress)) {
      throw new BadRequestError("errMsg_shippingAddressMustNotBeAnArray");
    }

    // Parameter Type: Object

    if (!this.checkParameterType_shippingAddress(this.shippingAddress)) {
      throw new BadRequestError("errMsg_shippingAddressTypeIsNotValid");
    }
  }

  checkParameterType_totalAmount(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_totalAmount() {
    if (this.totalAmount == null) {
      throw new BadRequestError("errMsg_totalAmountisRequired");
    }

    if (Array.isArray(this.totalAmount)) {
      throw new BadRequestError("errMsg_totalAmountMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_totalAmount(this.totalAmount)) {
      throw new BadRequestError("errMsg_totalAmountTypeIsNotValid");
    }
  }

  checkParameter_currency() {
    if (this.currency == null) {
      throw new BadRequestError("errMsg_currencyisRequired");
    }

    if (Array.isArray(this.currency)) {
      throw new BadRequestError("errMsg_currencyMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_placedAt(paramValue) {
    const isDate = (timestamp) => new Date(timestamp).getTime() > 0;
    if (!isDate(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_placedAt() {
    if (this.placedAt == null) {
      throw new BadRequestError("errMsg_placedAtisRequired");
    }

    if (Array.isArray(this.placedAt)) {
      throw new BadRequestError("errMsg_placedAtMustNotBeAnArray");
    }

    // Parameter Type: Date

    if (!this.checkParameterType_placedAt(this.placedAt)) {
      throw new BadRequestError("errMsg_placedAtTypeIsNotValid");
    }
  }

  checkParameter_stripePaymentIntentId() {
    if (this.stripePaymentIntentId == null) return;

    if (Array.isArray(this.stripePaymentIntentId)) {
      throw new BadRequestError("errMsg_stripePaymentIntentIdMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_refundRequested(paramValue) {
    const isBoolean = (n) => !!n === n;
    if (!isBoolean(paramValue)) {
      throw new BadRequestError("errMsg_refundRequestedisNotAValidBoolean");
    }

    return true;
  }

  checkParameter_refundRequested() {
    if (this.refundRequested == null) return;

    if (Array.isArray(this.refundRequested)) {
      throw new BadRequestError("errMsg_refundRequestedMustNotBeAnArray");
    }

    // Parameter Type: Boolean

    if (!this.checkParameterType_refundRequested(this.refundRequested)) {
      throw new BadRequestError("errMsg_refundRequestedTypeIsNotValid");
    }
  }

  checkParameterType_refundAmount(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_refundAmount() {
    if (this.refundAmount == null) return;

    if (Array.isArray(this.refundAmount)) {
      throw new BadRequestError("errMsg_refundAmountMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_refundAmount(this.refundAmount)) {
      throw new BadRequestError("errMsg_refundAmountTypeIsNotValid");
    }
  }

  checkParameter_adminNotes() {
    if (this.adminNotes == null) return;

    if (Array.isArray(this.adminNotes)) {
      throw new BadRequestError("errMsg_adminNotesMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_orderHistory(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_orderHistory() {
    if (this.orderHistory == null) return;

    if (!Array.isArray(this.orderHistory)) {
      throw new BadRequestError("errMsg_orderHistoryMustBeAnArray");
    }

    // Parameter Type: Object

    this.orderHistory.forEach((item) => {
      if (!this.checkParameterType_orderHistory(item)) {
        throw new BadRequestError("errMsg_orderHistoryArrayHasAnInvalidItem");
      }
    });
  }

  checkParameters() {
    if (this.orderId) this.checkParameter_orderId();

    if (this.userId) this.checkParameter_userId();

    if (this.items) this.checkParameter_items();

    if (this.shippingAddress) this.checkParameter_shippingAddress();

    if (this.totalAmount) this.checkParameter_totalAmount();

    if (this.currency) this.checkParameter_currency();

    if (this.placedAt) this.checkParameter_placedAt();

    if (this.stripePaymentIntentId) this.checkParameter_stripePaymentIntentId();

    if (this.refundRequested) this.checkParameter_refundRequested();

    if (this.refundAmount) this.checkParameter_refundAmount();

    if (this.adminNotes) this.checkParameter_adminNotes();

    if (this.orderHistory) this.checkParameter_orderHistory();
  }

  async doBusiness() {
    const order = await dbScriptCreateOrder(this);
    return order;
  }

  async addToOutput() {}

  async raiseEvent() {
    OrderCreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreateOrderManager;
