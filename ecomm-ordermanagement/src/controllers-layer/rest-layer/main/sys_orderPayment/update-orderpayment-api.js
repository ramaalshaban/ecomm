const { UpdateOrderPaymentManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class UpdateOrderPaymentRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("updateOrderPayment", "updateorderpayment", req, res);
    this.dataName = "sys_orderPayment";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateOrderPaymentManager(this._req, "rest");
  }
}

const updateOrderPayment = async (req, res, next) => {
  const controller = new UpdateOrderPaymentRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateOrderPayment;
