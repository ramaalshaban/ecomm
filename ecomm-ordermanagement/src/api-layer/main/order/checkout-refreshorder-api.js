const OrderManager = require("./OrderManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const {
  RefreshorderCheckoutedPublisher,
} = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCheckoutRefreshorder } = require("dbLayer");

class CheckoutRefreshOrderManager extends OrderManager {
  constructor(request, controllerType) {
    super(request, {
      name: "checkoutRefreshOrder",
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
    jsonObj.paymentUserParams = this.paymentUserParams;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.orderId = request.params?.orderId;
    this.paymentUserParams = request.body?.paymentUserParams;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.orderId = request.mcpParams.orderId;
    this.paymentUserParams = request.mcpParams.paymentUserParams;
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
      updatedAt: new Date(),
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

    if (!this.checkAbsolute() && !this.isOwner) {
      throw new ForbiddenError("errMsg_UserShouldBeTheOnwerOfTheObject");
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

  checkParameterType_paymentUserParams(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_paymentUserParams() {
    if (this.paymentUserParams == null) return;

    if (Array.isArray(this.paymentUserParams)) {
      throw new BadRequestError("errMsg_paymentUserParamsMustNotBeAnArray");
    }

    // Parameter Type: Object

    if (!this.checkParameterType_paymentUserParams(this.paymentUserParams)) {
      throw new BadRequestError("errMsg_paymentUserParamsTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.orderId) this.checkParameter_orderId();

    if (this.paymentUserParams) this.checkParameter_paymentUserParams();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.order?.userId === this.session.userId;
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
    const refreshorder = await dbScriptCheckoutRefreshorder(this);
    return refreshorder;
  }

  async addToOutput() {}

  async raiseEvent() {
    RefreshorderCheckoutedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
        //**errorLog
      },
    );
  }

  // Work Flow

  async afterCheckInstance() {
    try {
      this.checkoutResult = await this.doCheckoutRefresh();
    } catch (err) {
      console.log("doCheckoutRefresh Action Error:", err.message);
      //**errorLog
      throw err;
    }
  }

  // Action Store

  /***********************************************************************
   ** Refresh checkout on Stripe platform, the payment operation data in the
   ** gateway server will be fetched and the application payment tickets and
   ** order status will be refreshed according to the server. This api used
   ** if you dont want to use a webhook.
   ***********************************************************************/

  getOrderId() {
    return this.orderId;
  }

  async checkoutUpdated(statusLiteral) {
    switch (statusLiteral) {
      case "started":
        await this.checkoutStarted();
        break;
      case "canceled":
        await this.checkoutCanceled();
        break;
      case "failed":
        await this.checkoutFailed();
        break;
      case "success":
        await this.checkoutDone();
        break;
      default:
        await this.checkoutFailed();
        break;
    }
  }

  async checkoutStarted() {
    this.status = 0;
  }

  async checkoutCanceled() {
    this.status = 5;
  }

  async checkoutFailed() {
    this.status = 6;
  }

  async checkoutDone() {
    this.status = 1;
  }

  getCheckoutParameters(userParams) {
    const description = `Order #${this.order.id} by user ${this.order.userId}`;

    return {
      userId: this.session._USERID,
      fullname: this.session.fullname,
      email: this.session.email,
      description,
      amount: this.order.totalAmount,
      currency: this.order.currency,
      orderId: this.order.id,
      metadata: {
        order: "OrderManagement-Order-order",
        orderId: this.order.id,
        checkoutName: "order",
      },
      storeCard: userParams?.storeCard,
      paymentUserParams: userParams,
      bodyParams: this.bodyParams,
    };
  }

  async doCheckoutRefresh() {
    // Handle Checkout Action

    try {
      if (!this.checkoutManager) {
        throw new Error(
          "This dboject is not an order object. So auto-checkout process can not be started.",
        );
      }

      this.checkoutResult = await this.checkoutManager.refreshCheckout(
        this.paymentUserParams,
      );
    } catch (err) {
      if (err instanceof PaymentGateError) {
        this.checkoutResult = err.serializeError();
        //**errorLog
      } else throw err;
    }
    return this.checkoutResult;
  }
}

module.exports = CheckoutRefreshOrderManager;
