const { ListPaymentCustomerMethodsManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class ListPaymentCustomerMethodsRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("listPaymentCustomerMethods", "listpaymentcustomermethods", req, res);
    this.dataName = "sys_paymentMethods";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListPaymentCustomerMethodsManager(this._req, "rest");
  }
}

const listPaymentCustomerMethods = async (req, res, next) => {
  const controller = new ListPaymentCustomerMethodsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listPaymentCustomerMethods;
