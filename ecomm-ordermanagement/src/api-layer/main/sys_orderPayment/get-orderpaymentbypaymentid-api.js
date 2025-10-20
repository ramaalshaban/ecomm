const Sys_orderPaymentManager = require("./Sys_orderPaymentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  OrderpaymentbypaymentidRetrivedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptGetOrderpaymentbypaymentid } = require("dbLayer");

class GetOrderPaymentByPaymentIdManager extends Sys_orderPaymentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getOrderPaymentByPaymentId",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
    });

    this.dataName = "sys_orderPayment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.sys_orderPaymentId = this.sys_orderPaymentId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.sys_orderPaymentId = request.params?.sys_orderPaymentId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.sys_orderPaymentId = request.mcpParams.sys_orderPaymentId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return {
      $and: [{ paymentId: { $eq: this.paymentId } }, { isActive: true }],
    };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async checkInstance() {
    if (!this.sys_orderPayment) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_sys_orderPaymentId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_sys_orderPaymentId() {
    if (this.sys_orderPaymentId == null) {
      throw new BadRequestError("errMsg_sys_orderPaymentIdisRequired");
    }

    if (Array.isArray(this.sys_orderPaymentId)) {
      throw new BadRequestError("errMsg_sys_orderPaymentIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_sys_orderPaymentId(this.sys_orderPaymentId)) {
      throw new BadRequestError("errMsg_sys_orderPaymentIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.sys_orderPaymentId) this.checkParameter_sys_orderPaymentId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.sys_orderPayment?.ownerId === this.session.userId;
  }

  checkAbsolute() {
    if (this.absoluteAuth !== null) return this.absoluteAuth;

    // Check if user has an absolute role to ignore all authorization validations and return
    if (this.userHasRole(this.ROLES.superAdmin)) {
      this.absoluteAuth = true;
      return true;
    }
    this.absoluteAuth = false;
    return false;
  }

  async doBusiness() {
    const orderpaymentbypaymentid =
      await dbScriptGetOrderpaymentbypaymentid(this);
    return orderpaymentbypaymentid;
  }

  async addToOutput() {}

  async raiseEvent() {
    OrderpaymentbypaymentidRetrivedPublisher.Publish(
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

module.exports = GetOrderPaymentByPaymentIdManager;
