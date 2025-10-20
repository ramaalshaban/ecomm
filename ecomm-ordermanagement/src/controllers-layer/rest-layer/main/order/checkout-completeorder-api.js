const { CheckoutCompleteOrderManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class CheckoutCompleteOrderRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("checkoutCompleteOrder", "checkoutcompleteorder", req, res);
    this.dataName = "order";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new CheckoutCompleteOrderManager(this._req, "rest");
  }
}

const checkoutCompleteOrder = async (req, res, next) => {
  const controller = new CheckoutCompleteOrderRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = checkoutCompleteOrder;
