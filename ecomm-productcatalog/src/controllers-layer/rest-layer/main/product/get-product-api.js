const { GetProductManager } = require("apiLayer");

const ProductCatalogRestController = require("../../ProductCatalogServiceRestController");

class GetProductRestController extends ProductCatalogRestController {
  constructor(req, res) {
    super("getProduct", "getproduct", req, res);
    this.dataName = "product";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetProductManager(this._req, "rest");
  }
}

const getProduct = async (req, res, next) => {
  const controller = new GetProductRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getProduct;
