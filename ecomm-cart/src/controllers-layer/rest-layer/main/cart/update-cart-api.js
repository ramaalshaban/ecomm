const { UpdateCartManager } = require("apiLayer");

const CartRestController = require("../../CartServiceRestController");

class UpdateCartRestController extends CartRestController {
  constructor(req, res) {
    super("updateCart", "updatecart", req, res);
    this.dataName = "cart";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateCartManager(this._req, "rest");
  }
}

const updateCart = async (req, res, next) => {
  const controller = new UpdateCartRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateCart;
