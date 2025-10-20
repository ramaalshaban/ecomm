const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const OrderManagementServiceManager = require("../../service-manager/OrderManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject OrderItem */
class OrderItemManager extends OrderManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "orderItem";
    this.modelName = "OrderItem";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = OrderItemManager;
