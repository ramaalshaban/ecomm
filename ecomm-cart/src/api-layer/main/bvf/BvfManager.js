const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const CartServiceManager = require("../../service-manager/CartServiceManager");

/* Base Class For the Crud Routes Of DbObject Bvf */
class BvfManager extends CartServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "bvf";
    this.modelName = "Bvf";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = BvfManager;
