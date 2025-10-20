const { GetCartManager } = require("apiLayer");

const CartRestController = require("../../CartServiceRestController");

class GetCartRestController extends CartRestController {
  constructor(req, res) {
    super("getCart", "getcart", req, res);
    this.dataName = "cart";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetCartManager(this._req, "rest");
  }
}

const getCart = async (req, res, next) => {
  const controller = new GetCartRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getCart;
