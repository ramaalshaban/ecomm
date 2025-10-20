const Sys_orderPaymentManager = require("./Sys_orderPaymentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { OrderpaymentCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateOrderpayment } = require("dbLayer");

class CreateOrderPaymentManager extends Sys_orderPaymentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createOrderPayment",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "sys_orderPayment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.sys_orderPaymentId = this.sys_orderPaymentId;
    jsonObj.ownerId = this.ownerId;
    jsonObj.orderId = this.orderId;
    jsonObj.paymentId = this.paymentId;
    jsonObj.paymentStatus = this.paymentStatus;
    jsonObj.statusLiteral = this.statusLiteral;
    jsonObj.redirectUrl = this.redirectUrl;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.sys_orderPaymentId = request.body?.sys_orderPaymentId;
    this.ownerId = request.session?.userId;
    this.orderId = request.body?.orderId;
    this.paymentId = request.body?.paymentId;
    this.paymentStatus = request.body?.paymentStatus;
    this.statusLiteral = request.body?.statusLiteral;
    this.redirectUrl = request.body?.redirectUrl;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.sys_orderPaymentId = request.mcpParams.sys_orderPaymentId;
    this.ownerId = request.session.userId;
    this.orderId = request.mcpParams.orderId;
    this.paymentId = request.mcpParams.paymentId;
    this.paymentStatus = request.mcpParams.paymentStatus;
    this.statusLiteral = request.mcpParams.statusLiteral;
    this.redirectUrl = request.mcpParams.redirectUrl;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.sys_orderPaymentId = this.id;
    if (!this.sys_orderPaymentId) this.sys_orderPaymentId = newUUID(false);

    const dataClause = {
      id: this.sys_orderPaymentId,
      ownerId: this.ownerId,
      orderId: this.orderId,
      paymentId: this.paymentId,
      paymentStatus: this.paymentStatus,
      statusLiteral: this.statusLiteral,
      redirectUrl: this.redirectUrl,
      isActive: true,
    };

    return dataClause;
  }

  checkParameterType_sys_orderPaymentId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_sys_orderPaymentId() {
    if (this.sys_orderPaymentId == null) return;

    if (Array.isArray(this.sys_orderPaymentId)) {
      throw new BadRequestError("errMsg_sys_orderPaymentIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_sys_orderPaymentId(this.sys_orderPaymentId)) {
      throw new BadRequestError("errMsg_sys_orderPaymentIdTypeIsNotValid");
    }
  }

  checkParameterType_ownerId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_ownerId() {
    if (this.ownerId == null) return;

    if (Array.isArray(this.ownerId)) {
      throw new BadRequestError("errMsg_ownerIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_ownerId(this.ownerId)) {
      throw new BadRequestError("errMsg_ownerIdTypeIsNotValid");
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

  checkParameter_paymentId() {
    if (this.paymentId == null) {
      throw new BadRequestError("errMsg_paymentIdisRequired");
    }

    if (Array.isArray(this.paymentId)) {
      throw new BadRequestError("errMsg_paymentIdMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_paymentStatus() {
    if (this.paymentStatus == null) {
      throw new BadRequestError("errMsg_paymentStatusisRequired");
    }

    if (Array.isArray(this.paymentStatus)) {
      throw new BadRequestError("errMsg_paymentStatusMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_statusLiteral() {
    if (this.statusLiteral == null) {
      throw new BadRequestError("errMsg_statusLiteralisRequired");
    }

    if (Array.isArray(this.statusLiteral)) {
      throw new BadRequestError("errMsg_statusLiteralMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_redirectUrl() {
    if (this.redirectUrl == null) return;

    if (Array.isArray(this.redirectUrl)) {
      throw new BadRequestError("errMsg_redirectUrlMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameters() {
    if (this.sys_orderPaymentId) this.checkParameter_sys_orderPaymentId();

    if (this.ownerId) this.checkParameter_ownerId();

    if (this.orderId) this.checkParameter_orderId();

    if (this.paymentId) this.checkParameter_paymentId();

    if (this.paymentStatus) this.checkParameter_paymentStatus();

    if (this.statusLiteral) this.checkParameter_statusLiteral();

    if (this.redirectUrl) this.checkParameter_redirectUrl();
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
    const orderpayment = await dbScriptCreateOrderpayment(this);
    return orderpayment;
  }

  async addToOutput() {}

  async raiseEvent() {
    OrderpaymentCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = CreateOrderPaymentManager;
