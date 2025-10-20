const { CreateOrderManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class CreateOrderRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("createOrder", "createorder", req, res);
    this.dataName = "order";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateOrderManager(this._req, "rest");
  }
}

const createOrder = async (req, res, next) => {
  const controller = new CreateOrderRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createOrder;
