const { GetOrderPaymentByOrderIdManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class GetOrderPaymentByOrderIdRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("getOrderPaymentByOrderId", "getorderpaymentbyorderid", req, res);
    this.dataName = "sys_orderPayment";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetOrderPaymentByOrderIdManager(this._req, "rest");
  }
}

const getOrderPaymentByOrderId = async (req, res, next) => {
  const controller = new GetOrderPaymentByOrderIdRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getOrderPaymentByOrderId;
