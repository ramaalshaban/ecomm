const OrderManager = require("./OrderManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { OrderRetrivedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptGetOrder } = require("dbLayer");

class GetOrderManager extends OrderManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getOrder",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
    });

    this.dataName = "order";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.orderId = this.orderId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.orderId = request.params?.orderId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.orderId = request.mcpParams.orderId;
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

  checkParameters() {
    if (this.orderId) this.checkParameter_orderId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.order?.userId === this.session.userId;
  }

  async doBusiness() {
    const order = await dbScriptGetOrder(this);
    return order;
  }

  async addToOutput() {}

  async raiseEvent() {
    OrderRetrivedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = GetOrderManager;
