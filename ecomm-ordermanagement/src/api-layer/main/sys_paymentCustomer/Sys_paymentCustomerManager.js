const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const OrderManagementServiceManager = require("../../service-manager/OrderManagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Sys_paymentCustomer */
class Sys_paymentCustomerManager extends OrderManagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "sys_paymentCustomer";
    this.modelName = "Sys_paymentCustomer";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = Sys_paymentCustomerManager;
