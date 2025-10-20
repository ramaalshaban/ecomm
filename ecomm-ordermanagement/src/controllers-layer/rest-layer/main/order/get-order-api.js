const { GetOrderManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class GetOrderRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("getOrder", "getorder", req, res);
    this.dataName = "order";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetOrderManager(this._req, "rest");
  }
}

const getOrder = async (req, res, next) => {
  const controller = new GetOrderRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getOrder;
