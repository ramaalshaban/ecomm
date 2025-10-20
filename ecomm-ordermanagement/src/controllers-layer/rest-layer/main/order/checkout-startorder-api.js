const { CheckoutStartOrderManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class CheckoutStartOrderRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("checkoutStartOrder", "checkoutstartorder", req, res);
    this.dataName = "order";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new CheckoutStartOrderManager(this._req, "rest");
  }
}

const checkoutStartOrder = async (req, res, next) => {
  const controller = new CheckoutStartOrderRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = checkoutStartOrder;
