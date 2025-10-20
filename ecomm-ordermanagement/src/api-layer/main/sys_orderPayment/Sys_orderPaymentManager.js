const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const OrderManagementServiceManager = require("../../service-manager/OrderManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Sys_orderPayment */
class Sys_orderPaymentManager extends OrderManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "sys_orderPayment";
    this.modelName = "Sys_orderPayment";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = Sys_orderPaymentManager;
