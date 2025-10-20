const { CreateCartManager } = require("apiLayer");

const CartRestController = require("../../CartServiceRestController");

class CreateCartRestController extends CartRestController {
  constructor(req, res) {
    super("createCart", "createcart", req, res);
    this.dataName = "cart";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateCartManager(this._req, "rest");
  }
}

const createCart = async (req, res, next) => {
  const controller = new CreateCartRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createCart;
