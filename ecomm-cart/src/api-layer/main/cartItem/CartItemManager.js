const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const CartServiceManager = require("../../service-manager/CartServiceManager");

/* Base Class For the Crud Routes Of DbObject CartItem */
class CartItemManager extends CartServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "cartItem";
    this.modelName = "CartItem";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = CartItemManager;
