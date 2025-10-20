const ProductManager = require("./ProductManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { ProductDeletedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptDeleteProduct } = require("dbLayer");

class DeleteProductManager extends ProductManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteProduct",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
    });

    this.dataName = "product";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.productId = this.productId;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.productId = request.params?.productId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.productId = request.mcpParams.productId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // where clause methods

  async getRouteQuery() {
    return { id: this.productId };

    // handle permission filter later
  }

  async buildWhereClause() {
    const { convertUserQueryToSequelizeQuery } = require("common");

    const routeQuery = await this.getRouteQuery();

    return convertUserQueryToSequelizeQuery(routeQuery);
  }

  async fetchInstance() {
    const { getProductByQuery } = require("dbLayer");
    this.product = await getProductByQuery(this.whereClause);
    if (!this.product) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
    this._instance = this.product;
  }

  async checkInstance() {
    if (!this.product) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameterType_productId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_productId() {
    if (this.productId == null) {
      throw new BadRequestError("errMsg_productIdisRequired");
    }

    if (Array.isArray(this.productId)) {
      throw new BadRequestError("errMsg_productIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_productId(this.productId)) {
      throw new BadRequestError("errMsg_productIdTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.productId) this.checkParameter_productId();
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.product?._owner === this.session.userId;
  }

  async doBusiness() {
    const product = await dbScriptDeleteProduct(this);
    return product;
  }

  async addToOutput() {}

  async raiseEvent() {
    ProductDeletedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = DeleteProductManager;
