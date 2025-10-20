const CartManager = require("./CartManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { CartUpdatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptUpdateCart } = require("dbLayer");

class UpdateCartManager extends CartManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateCart",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
    });

    this.dataName = "cart";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.cartId = this.cartId;
    jsonObj.items = this.items;
    jsonObj.lastModified = this.lastModified;
    jsonObj.yuy = this.yuy;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.cartId = request.params?.cartId;
    this.items = request.body?.items;
    this.lastModified = request.body?.lastModified;
    this.yuy = request.body?.yuy;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.cartId = request.mcpParams.cartId;
    this.items = request.mcpParams.items;
    this.lastModified = request.mcpParams.lastModified;
    this.yuy = request.mcpParams.yuy;
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

  // data clause methods

  async buildDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      items: this.items
        ? typeof this.items == "string"
          ? JSON.parse(this.items)
          : this.items
        : null,
      lastModified: this.lastModified,
      yuy: this.yuy
        ? typeof this.yuy == "string"
          ? JSON.parse(this.yuy)
          : this.yuy
        : null,
    };

    dataClause.lastModified = LIB.nowISO();
    this.lastModified = dataClause.lastModified;

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

  checkParameterType_items(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_items() {
    if (this.items == null) return;

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

  checkParameterType_yuy(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_yuy() {
    if (this.yuy == null) return;

    if (Array.isArray(this.yuy)) {
      throw new BadRequestError("errMsg_yuyMustNotBeAnArray");
    }

    // Parameter Type: Object

    if (!this.checkParameterType_yuy(this.yuy)) {
      throw new BadRequestError("errMsg_yuyTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.cartId) this.checkParameter_cartId();

    if (this.items) this.checkParameter_items();

    if (this.yuy) this.checkParameter_yuy();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.cart?.userId === this.session.userId;
  }

  async doBusiness() {
    const cart = await dbScriptUpdateCart(this);
    return cart;
  }

  async addToOutput() {}

  async raiseEvent() {
    CartUpdatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = UpdateCartManager;
