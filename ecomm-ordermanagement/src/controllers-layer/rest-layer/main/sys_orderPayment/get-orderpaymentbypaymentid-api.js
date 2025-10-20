const { GetOrderPaymentByPaymentIdManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class GetOrderPaymentByPaymentIdRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("getOrderPaymentByPaymentId", "getorderpaymentbypaymentid", req, res);
    this.dataName = "sys_orderPayment";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetOrderPaymentByPaymentIdManager(this._req, "rest");
  }
}

const getOrderPaymentByPaymentId = async (req, res, next) => {
  const controller = new GetOrderPaymentByPaymentIdRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getOrderPaymentByPaymentId;
