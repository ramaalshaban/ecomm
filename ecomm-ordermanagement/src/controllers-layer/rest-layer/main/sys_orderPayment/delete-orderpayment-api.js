const { DeleteOrderPaymentManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class DeleteOrderPaymentRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("deleteOrderPayment", "deleteorderpayment", req, res);
    this.dataName = "sys_orderPayment";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteOrderPaymentManager(this._req, "rest");
  }
}

const deleteOrderPayment = async (req, res, next) => {
  const controller = new DeleteOrderPaymentRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteOrderPayment;
