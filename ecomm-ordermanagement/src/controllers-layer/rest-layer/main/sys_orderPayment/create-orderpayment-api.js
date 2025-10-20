const { CreateOrderPaymentManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class CreateOrderPaymentRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("createOrderPayment", "createorderpayment", req, res);
    this.dataName = "sys_orderPayment";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateOrderPaymentManager(this._req, "rest");
  }
}

const createOrderPayment = async (req, res, next) => {
  const controller = new CreateOrderPaymentRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createOrderPayment;
