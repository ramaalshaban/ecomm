const { UpdateOrderManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class UpdateOrderRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("updateOrder", "updateorder", req, res);
    this.dataName = "order";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateOrderManager(this._req, "rest");
  }
}

const updateOrder = async (req, res, next) => {
  const controller = new UpdateOrderRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateOrder;
