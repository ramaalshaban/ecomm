const { ListOrderPayments2Manager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class ListOrderPayments2RestController extends OrderManagementRestController {
  constructor(req, res) {
    super("listOrderPayments2", "listorderpayments2", req, res);
    this.dataName = "sys_orderPayments";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListOrderPayments2Manager(this._req, "rest");
  }
}

const listOrderPayments2 = async (req, res, next) => {
  const controller = new ListOrderPayments2RestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listOrderPayments2;
