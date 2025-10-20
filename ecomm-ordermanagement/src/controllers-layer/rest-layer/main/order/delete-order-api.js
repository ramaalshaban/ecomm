const { DeleteOrderManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class DeleteOrderRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("deleteOrder", "deleteorder", req, res);
    this.dataName = "order";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteOrderManager(this._req, "rest");
  }
}

const deleteOrder = async (req, res, next) => {
  const controller = new DeleteOrderRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteOrder;
