const ProductManager = require("./ProductManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { getRedisData } = require("common");
const { ProductCreatedPublisher } = require("../../api-events/publishers");

const getIntegrationClient = require("../../integrations");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { dbScriptCreateProduct } = require("dbLayer");

class CreateProductManager extends ProductManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createProduct",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
    });

    this.dataName = "product";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.productId = this.productId;
    jsonObj.name = this.name;
    jsonObj.description = this.description;
    jsonObj.category = this.category;
    jsonObj.price = this.price;
    jsonObj.images = this.images;
    jsonObj.availability = this.availability;
    jsonObj.status = this.status;
    jsonObj.inventoryCount = this.inventoryCount;
    jsonObj.sku = this.sku;
    jsonObj.tags = this.tags;
    jsonObj.weight = this.weight;
    jsonObj.dimensions = this.dimensions;
    jsonObj.attributes = this.attributes;
  }

  async checkBasicAuth() {
    if (this.checkAbsolute()) return true;
  }

  readRestParameters(request) {
    this.productId = request.body?.productId;
    this.name = request.body?.name;
    this.description = request.body?.description;
    this.category = request.body?.category;
    this.price = request.body?.price;
    this.images = request.body?.images;
    this.availability = request.body?.availability;
    this.status = request.body?.status;
    this.inventoryCount = request.body?.inventoryCount;
    this.sku = request.body?.sku;
    this.tags = request.body?.tags;
    this.weight = request.body?.weight;
    this.dimensions = request.body?.dimensions;
    this.attributes = request.body?.attributes;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.productId = request.mcpParams.productId;
    this.name = request.mcpParams.name;
    this.description = request.mcpParams.description;
    this.category = request.mcpParams.category;
    this.price = request.mcpParams.price;
    this.images = request.mcpParams.images;
    this.availability = request.mcpParams.availability;
    this.status = request.mcpParams.status;
    this.inventoryCount = request.mcpParams.inventoryCount;
    this.sku = request.mcpParams.sku;
    this.tags = request.mcpParams.tags;
    this.weight = request.mcpParams.weight;
    this.dimensions = request.mcpParams.dimensions;
    this.attributes = request.mcpParams.attributes;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  // data clause methods

  async buildDataClause() {
    const { newUUID } = require("common");

    const { hashString } = require("common");

    if (this.id) this.productId = this.id;
    if (!this.productId) this.productId = newUUID(false);

    const dataClause = {
      id: this.productId,
      name: this.name,
      description: this.description,
      category: this.category,
      price: this.price,
      images: this.images,
      availability: this.availability,
      status: this.status,
      inventoryCount: this.inventoryCount,
      sku: this.sku,
      tags: this.tags,
      weight: this.weight,
      dimensions: this.dimensions
        ? typeof this.dimensions == "string"
          ? JSON.parse(this.dimensions)
          : this.dimensions
        : null,
      attributes: this.attributes
        ? typeof this.attributes == "string"
          ? JSON.parse(this.attributes)
          : this.attributes
        : null,
    };

    dataClause.availability = this.status === 0 && this.inventoryCount > 0;
    this.availability = dataClause.availability;

    return dataClause;
  }

  checkParameterType_productId(paramValue) {
    if (!isValidUUID(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_productId() {
    if (this.productId == null) return;

    if (Array.isArray(this.productId)) {
      throw new BadRequestError("errMsg_productIdMustNotBeAnArray");
    }

    // Parameter Type: ID

    if (!this.checkParameterType_productId(this.productId)) {
      throw new BadRequestError("errMsg_productIdTypeIsNotValid");
    }
  }

  checkParameter_name() {
    if (this.name == null) {
      throw new BadRequestError("errMsg_nameisRequired");
    }

    if (Array.isArray(this.name)) {
      throw new BadRequestError("errMsg_nameMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_description() {
    if (this.description == null) return;

    if (Array.isArray(this.description)) {
      throw new BadRequestError("errMsg_descriptionMustNotBeAnArray");
    }

    // Parameter Type: Text
  }

  checkParameter_category() {
    if (this.category == null) {
      throw new BadRequestError("errMsg_categoryisRequired");
    }

    if (Array.isArray(this.category)) {
      throw new BadRequestError("errMsg_categoryMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_price(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_price() {
    if (this.price == null) {
      throw new BadRequestError("errMsg_priceisRequired");
    }

    if (Array.isArray(this.price)) {
      throw new BadRequestError("errMsg_priceMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_price(this.price)) {
      throw new BadRequestError("errMsg_priceTypeIsNotValid");
    }
  }

  checkParameter_images() {
    if (this.images == null) {
      throw new BadRequestError("errMsg_imagesisRequired");
    }

    if (!Array.isArray(this.images)) {
      throw new BadRequestError("errMsg_imagesMustBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_status(paramValue) {
    function isInt(value) {
      return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
      );
    }

    const enumOptions = ["active", "discontinued"];
    if (typeof paramValue !== "string") {
      if (isInt(paramValue)) {
        paramValue = Number(paramValue);
        if (paramValue >= 0 && paramValue <= enumOptions.length - 1) {
          paramValue = enumOptions[paramValue];
          return paramValue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    if (!enumOptions.includes(paramValue.toLowerCase())) {
      return false;
    }

    return true;
  }

  checkParameter_status() {
    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    if (Array.isArray(this.status)) {
      throw new BadRequestError("errMsg_statusMustNotBeAnArray");
    }

    // Parameter Type: Enum

    const enumResult = this.checkParameterType_status(this.status);
    if (enumResult === false) {
      throw new BadRequestError("errMsg_statusTypeIsNotValid");
    } else if (enumResult !== true) {
      this.status = enumResult;
    }
  }

  checkParameterType_inventoryCount(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_inventoryCount() {
    if (this.inventoryCount == null) {
      throw new BadRequestError("errMsg_inventoryCountisRequired");
    }

    if (Array.isArray(this.inventoryCount)) {
      throw new BadRequestError("errMsg_inventoryCountMustNotBeAnArray");
    }

    // Parameter Type: Integer

    if (!this.checkParameterType_inventoryCount(this.inventoryCount)) {
      throw new BadRequestError("errMsg_inventoryCountTypeIsNotValid");
    }
  }

  checkParameter_sku() {
    if (this.sku == null) {
      throw new BadRequestError("errMsg_skuisRequired");
    }

    if (Array.isArray(this.sku)) {
      throw new BadRequestError("errMsg_skuMustNotBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameter_tags() {
    if (this.tags == null) return;

    if (!Array.isArray(this.tags)) {
      throw new BadRequestError("errMsg_tagsMustBeAnArray");
    }

    // Parameter Type: String
  }

  checkParameterType_weight(paramValue) {
    if (isNaN(paramValue)) {
      return false;
    }

    return true;
  }

  checkParameter_weight() {
    if (this.weight == null) return;

    if (Array.isArray(this.weight)) {
      throw new BadRequestError("errMsg_weightMustNotBeAnArray");
    }

    // Parameter Type: Float

    if (!this.checkParameterType_weight(this.weight)) {
      throw new BadRequestError("errMsg_weightTypeIsNotValid");
    }
  }

  checkParameterType_dimensions(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_dimensions() {
    if (this.dimensions == null) return;

    if (Array.isArray(this.dimensions)) {
      throw new BadRequestError("errMsg_dimensionsMustNotBeAnArray");
    }

    // Parameter Type: Object

    if (!this.checkParameterType_dimensions(this.dimensions)) {
      throw new BadRequestError("errMsg_dimensionsTypeIsNotValid");
    }
  }

  checkParameterType_attributes(paramValue) {
    if (typeof paramValue !== "object") {
      return false;
    }

    return true;
  }

  checkParameter_attributes() {
    if (this.attributes == null) return;

    if (Array.isArray(this.attributes)) {
      throw new BadRequestError("errMsg_attributesMustNotBeAnArray");
    }

    // Parameter Type: Object

    if (!this.checkParameterType_attributes(this.attributes)) {
      throw new BadRequestError("errMsg_attributesTypeIsNotValid");
    }
  }

  checkParameters() {
    if (this.productId) this.checkParameter_productId();

    if (this.name) this.checkParameter_name();

    if (this.description) this.checkParameter_description();

    if (this.category) this.checkParameter_category();

    if (this.price) this.checkParameter_price();

    if (this.images) this.checkParameter_images();

    if (this.status) this.checkParameter_status();

    if (this.inventoryCount) this.checkParameter_inventoryCount();

    if (this.sku) this.checkParameter_sku();

    if (this.tags) this.checkParameter_tags();

    if (this.weight) this.checkParameter_weight();

    if (this.dimensions) this.checkParameter_dimensions();

    if (this.attributes) this.checkParameter_attributes();
  }

  async doBusiness() {
    const product = await dbScriptCreateProduct(this);
    return product;
  }

  async addToOutput() {}

  async raiseEvent() {
    ProductCreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
      //**errorLog
    });
  }

  // Work Flow

  // Action Store
}

module.exports = CreateProductManager;
