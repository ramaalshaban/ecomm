const { DeleteCartManager } = require("apiLayer");

const CartRestController = require("../../CartServiceRestController");

class DeleteCartRestController extends CartRestController {
  constructor(req, res) {
    super("deleteCart", "deletecart", req, res);
    this.dataName = "cart";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteCartManager(this._req, "rest");
  }
}

const deleteCart = async (req, res, next) => {
  const controller = new DeleteCartRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteCart;
