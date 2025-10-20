const Sys_paymentCustomerManager = require("./Sys_paymentCustomerManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  PaymentcustomerbyuseridRetrivedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptGetPaymentcustomerbyuserid } = require("dbLayer");

class GetPaymentCustomerByUserIdManager extends Sys_paymentCustomerManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getPaymentCustomerByUserId",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
    });

    this.dataName = "sys_paymentCustomer";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.sys_paymentCustomerId = this.sys_paymentCustomerId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.sys_paymentCustomerId = request.params?.sys_paymentCustomerId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.sys_paymentCustomerId = request.mcpParams.sys_paymentCustomerId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ userId: { $eq: this.userId } }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async checkInstance() {
    if (!this.sys_paymentCustomer) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_sys_paymentCustomerId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_sys_paymentCustomerId() {
    if (this.sys_paymentCustomerId == null) {
      throw new BadRequestError("errMsg_sys_paymentCustomerIdisRequired");
    }

    if (Array.isArray(this.sys_paymentCustomerId)) {
      throw new BadRequestError("errMsg_sys_paymentCustomerIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (
      !this.checkParameterType_sys_paymentCustomerId(this.sys_paymentCustomerId)
    ) {
      throw new BadRequestError("errMsg_sys_paymentCustomerIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.sys_paymentCustomerId) this.checkParameter_sys_paymentCustomerId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.sys_paymentCustomer?.userId === this.session.userId;
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
    const paymentcustomerbyuserid =
      await dbScriptGetPaymentcustomerbyuserid(this);
    return paymentcustomerbyuserid;
  }

  async addToOutput() {}

  async raiseEvent() {
    PaymentcustomerbyuseridRetrivedPublisher.Publish(
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

module.exports = GetPaymentCustomerByUserIdManager;
