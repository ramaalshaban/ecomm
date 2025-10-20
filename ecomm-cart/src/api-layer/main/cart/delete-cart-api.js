const CartManager = require("./CartManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { CartDeletedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeleteCart } = require("dbLayer");

class DeleteCartManager extends CartManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteCart",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "cart";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.cartId = this.cartId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.cartId = request.params?.cartId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.cartId = request.mcpParams.cartId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { $and: [{ id: this.cartId }, { isActive: true }] };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async fetchInstance() {
    const { getCartByQuery } = require("dbLayer");
    this.cart = await getCartByQuery(this.whereClause);
    if (!this.cart) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.cart;
  }

  async checkInstance() {
    if (!this.cart) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_cartId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_cartId() {
    if (this.cartId == null) {
      throw new BadRequestError("errMsg_cartIdisRequired");
    }

    if (Array.isArray(this.cartId)) {
      throw new BadRequestError("errMsg_cartIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_cartId(this.cartId)) {
      throw new BadRequestError("errMsg_cartIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.cartId) this.checkParameter_cartId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.cart?.userId === this.session.userId;
  }

  async doBusiness() {
    const cart = await dbScriptDeleteCart(this);
    return cart;
  }

  async addToOutput() {}

  async raiseEvent() {
    CartDeletedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = DeleteCartManager;
