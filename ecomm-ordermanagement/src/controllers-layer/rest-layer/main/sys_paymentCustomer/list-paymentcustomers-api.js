const { ListPaymentCustomersManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class ListPaymentCustomersRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("listPaymentCustomers", "listpaymentcustomers", req, res);
    this.dataName = "sys_paymentCustomers";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListPaymentCustomersManager(this._req, "rest");
  }
}

const listPaymentCustomers = async (req, res, next) => {
  const controller = new ListPaymentCustomersRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listPaymentCustomers;
