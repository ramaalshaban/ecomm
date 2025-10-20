const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const OrderManagementServiceManager = require("../../service-manager/OrderManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Sys_paymentMethod */
class Sys_paymentMethodManager extends OrderManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "sys_paymentMethod";
    this.modelName = "Sys_paymentMethod";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = Sys_paymentMethodManager;
