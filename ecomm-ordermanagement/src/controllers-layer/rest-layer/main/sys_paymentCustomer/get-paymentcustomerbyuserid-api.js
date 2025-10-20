const { GetPaymentCustomerByUserIdManager } = require("apiLayer");

const OrderManagementRestController = require("../../OrderManagementServiceRestController");

class GetPaymentCustomerByUserIdRestController extends OrderManagementRestController {
  constructor(req, res) {
    super("getPaymentCustomerByUserId", "getpaymentcustomerbyuserid", req, res);
    this.dataName = "sys_paymentCustomer";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetPaymentCustomerByUserIdManager(this._req, "rest");
  }
}

const getPaymentCustomerByUserId = async (req, res, next) => {
  const controller = new GetPaymentCustomerByUserIdRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getPaymentCustomerByUserId;
