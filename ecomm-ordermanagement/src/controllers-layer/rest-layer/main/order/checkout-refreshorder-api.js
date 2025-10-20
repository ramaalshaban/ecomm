const { CheckoutRefreshOrderManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class CheckoutRefreshOrderRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("checkoutRefreshOrder", "checkoutrefreshorder", req, res);
    this.dataName = "order";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new CheckoutRefreshOrderManager(this._req, "rest");
  }
}

const checkoutRefreshOrder = async (req, res, next) => {
  const controller = new CheckoutRefreshOrderRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = checkoutRefreshOrder;
