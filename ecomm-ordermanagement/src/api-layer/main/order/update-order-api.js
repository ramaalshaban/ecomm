const OrderManager = require("./OrderManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { OrderUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateOrder } = require("dbLayer");

class UpdateOrderManager extends OrderManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateOrder",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "order";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.orderId = this.orderId;
    jsonObj.status = this.status;
    jsonObj.paymentStatus = this.paymentStatus;
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
    this.orderId = request.params?.orderId;
    this.status = request.body?.status;
    this.paymentStatus = request.body?.paymentStatus;
    this.stripePaymentIntentId = request.body?.stripePaymentIntentId;
    this.refundRequested = request.body?.refundRequested;
    this.refundAmount = request.body?.refundAmount;
    this.adminNotes = request.body?.adminNotes;
    this.orderHistory = request.body?.orderHistory;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.orderId = request.mcpParams.orderId;
    this.status = request.mcpParams.status;
    this.paymentStatus = request.mcpParams.paymentStatus;
    this.stripePaymentIntentId = request.mcpParams.stripePaymentIntentId;
    this.refundRequested = request.mcpParams.refundRequested;
    this.refundAmount = request.mcpParams.refundAmount;
    this.adminNotes = request.mcpParams.adminNotes;
    this.orderHistory = request.mcpParams.orderHistory;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.orderId }, { isActive: true }] };

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
      status: this.status,
      paymentStatus: this.paymentStatus,
      stripePaymentIntentId: this.stripePaymentIntentId,
      refundRequested: this.refundRequested,
      refundAmount: this.refundAmount,
      adminNotes: this.adminNotes,
      orderHistory: this.orderHistory
        ? typeof this.orderHistory == "string"
          ? JSON.parse(this.orderHistory)
          : this.orderHistory
        : null,
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
    const { getOrderByQuery } = require("dbLayer");
    this.order = await getOrderByQuery(this.whereClause);
    if (!this.order) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.order;
  }

  async checkInstance() {
    if (!this.order) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_orderId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_orderId() {
    if (this.orderId == null) {
      throw new BadRequestError("errMsg_orderIdisRequired");
    }

    if (Array.isArray(this.orderId)) {
      throw new BadRequestError("errMsg_orderIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_orderId(this.orderId)) {
      throw new BadRequestError("errMsg_orderIdTypeIsNotValid");
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

    const enumOptions = [
      "pending",
      "paid",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ];
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

  checkParameterType_paymentStatus(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["unpaid", "paid", "refunded", "failed"];
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

  checkParameter_paymentStatus() {
    if (this.paymentStatus == null) {
      throw new BadRequestError("errMsg_paymentStatusisRequired");
    }

    if (Array.isArray(this.paymentStatus)) {
      throw new BadRequestError("errMsg_paymentStatusMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_paymentStatus(
      this.paymentStatus,
    );
    if (enumResult === false) {
      throw new BadRequestError("errMsg_paymentStatusTypeIsNotValid");
    } else if (enumResult !== true) {
      this.paymentStatus = enumResult;
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

    if (this.status) this.checkParameter_status();

    if (this.paymentStatus) this.checkParameter_paymentStatus();

    if (this.stripePaymentIntentId) this.checkParameter_stripePaymentIntentId();

    if (this.refundRequested) this.checkParameter_refundRequested();

    if (this.refundAmount) this.checkParameter_refundAmount();

    if (this.adminNotes) this.checkParameter_adminNotes();

    if (this.orderHistory) this.checkParameter_orderHistory();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.order?.userId === this.session.userId;
  }

  async doBusiness() {
    const order = await dbScriptUpdateOrder(this);
    return order;
  }

  async addToOutput() {}

  async raiseEvent() {
    OrderUpdatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateOrderManager;
