const CartManager = require("./CartManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { CartCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateCart } = require("dbLayer");

class CreateCartManager extends CartManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createCart",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "cart";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.cartId = this.cartId;
    jsonObj.userId = this.userId;
    jsonObj.items = this.items;
    jsonObj.lastModified = this.lastModified;
    jsonObj.yuy = this.yuy;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.cartId = request.body?.cartId;
    this.userId = request.session?.userId;
    this.items = request.body?.items;
    this.lastModified = request.body?.lastModified;
    this.yuy = request.body?.yuy;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.cartId = request.mcpParams.cartId;
    this.userId = request.session.userId;
    this.items = request.mcpParams.items;
    this.lastModified = request.mcpParams.lastModified;
    this.yuy = request.mcpParams.yuy;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.cartId = this.id;
    if (!this.cartId) this.cartId = newUUID(false);

    const dataClause = {
      id: this.cartId,
      userId: this.userId,
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
      isActive: true,
    };

    dataClause.lastModified = LIB.nowISO();
    this.lastModified = dataClause.lastModified;

    return dataClause;
  }

  checkParameterType_cartId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_cartId() {
    if (this.cartId == null) return;

    if (Array.isArray(this.cartId)) {
      throw new BadRequestError("errMsg_cartIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_cartId(this.cartId)) {
      throw new BadRequestError("errMsg_cartIdTypeIsNotValid");
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

  checkParameterType_yuy(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_yuy() {
    if (this.yuy == null) {
      throw new BadRequestError("errMsg_yuyisRequired");
    }

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

    if (this.userId) this.checkParameter_userId();

    if (this.items) this.checkParameter_items();

    if (this.yuy) this.checkParameter_yuy();
  }

  async doBusiness() {
    const cart = await dbScriptCreateCart(this);
    return cart;
  }

  async addToOutput() {}

  async raiseEvent() {
    CartCreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreateCartManager;
