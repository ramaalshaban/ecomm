const { ListCartsManager } = require("apiLayer");

const CartRestController = require("../../CartServiceRestController");

class ListCartsRestController extends CartRestController {
  constructor(req, res) {
    super("listCarts", "listcarts", req, res);
    this.dataName = "carts";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListCartsManager(this._req, "rest");
  }
}

const listCarts = async (req, res, next) => {
  const controller = new ListCartsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listCarts;
