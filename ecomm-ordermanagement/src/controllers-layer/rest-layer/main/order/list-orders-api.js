const { ListOrdersManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class ListOrdersRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("listOrders", "listorders", req, res);
    this.dataName = "orders";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListOrdersManager(this._req, "rest");
  }
}

const listOrders = async (req, res, next) => {
  const controller = new ListOrdersRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listOrders;
