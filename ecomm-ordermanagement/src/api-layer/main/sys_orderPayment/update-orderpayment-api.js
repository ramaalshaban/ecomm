const Sys_orderPaymentManager = require("./Sys_orderPaymentManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { OrderpaymentUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateOrderpayment } = require("dbLayer");

class UpdateOrderPaymentManager extends Sys_orderPaymentManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateOrderPayment",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "sys_orderPayment";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.sys_orderPaymentId = this.sys_orderPaymentId;
    jsonObj.ownerId = this.ownerId;
    jsonObj.paymentId = this.paymentId;
    jsonObj.paymentStatus = this.paymentStatus;
    jsonObj.statusLiteral = this.statusLiteral;
    jsonObj.redirectUrl = this.redirectUrl;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.sys_orderPaymentId = request.params?.sys_orderPaymentId;
    this.ownerId = request.session?.userId;
    this.paymentId = request.body?.paymentId;
    this.paymentStatus = request.body?.paymentStatus;
    this.statusLiteral = request.body?.statusLiteral;
    this.redirectUrl = request.body?.redirectUrl;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.sys_orderPaymentId = request.mcpParams.sys_orderPaymentId;
    this.ownerId = request.session.userId;
    this.paymentId = request.mcpParams.paymentId;
    this.paymentStatus = request.mcpParams.paymentStatus;
    this.statusLiteral = request.mcpParams.statusLiteral;
    this.redirectUrl = request.mcpParams.redirectUrl;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.sys_orderPaymentId }, { isActive: true }] };

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
      ownerId: this.ownerId,
      paymentId: this.paymentId,
      paymentStatus: this.paymentStatus,
      statusLiteral: this.statusLiteral,
      redirectUrl: this.redirectUrl,
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
    const { getSys_orderPaymentByQuery } = require("dbLayer");
    this.sys_orderPayment = await getSys_orderPaymentByQuery(this.whereClause);
    if (!this.sys_orderPayment) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.sys_orderPayment;
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

  checkParameter_paymentId() {
    if (this.paymentId == null) return;

    if (Array.isArray(this.paymentId)) {
      throw new BadRequestError("errMsg_paymentIdMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_paymentStatus() {
    if (this.paymentStatus == null) return;

    if (Array.isArray(this.paymentStatus)) {
      throw new BadRequestError("errMsg_paymentStatusMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_statusLiteral() {
    if (this.statusLiteral == null) return;

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

    if (this.paymentId) this.checkParameter_paymentId();

    if (this.paymentStatus) this.checkParameter_paymentStatus();

    if (this.statusLiteral) this.checkParameter_statusLiteral();

    if (this.redirectUrl) this.checkParameter_redirectUrl();
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
    const orderpayment = await dbScriptUpdateOrderpayment(this);
    return orderpayment;
  }

  async addToOutput() {}

  async raiseEvent() {
    OrderpaymentUpdatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateOrderPaymentManager;
