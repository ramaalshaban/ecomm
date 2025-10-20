const { GetOrderPayment2Manager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class GetOrderPayment2RestController extends OrderManagementRestController {
  constructor(req, res) {
    super("getOrderPayment2", "getorderpayment2", req, res);
    this.dataName = "sys_orderPayment";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetOrderPayment2Manager(this._req, "rest");
  }
}

const getOrderPayment2 = async (req, res, next) => {
  const controller = new GetOrderPayment2RestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getOrderPayment2;
