const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const ProductCatalogServiceManager = require("../../service-manager/ProductCatalogServiceManager");

/* Base Class For the Crud Routes Of DbObject Product */
class ProductManager extends ProductCatalogServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "product";
    this.modelName = "Product";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = ProductManager;
