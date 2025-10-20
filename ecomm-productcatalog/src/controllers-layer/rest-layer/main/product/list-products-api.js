const { ListProductsManager } = require("apiLayer");

const ProductCatalogRestController = require("../../ProductCatalogServiceRestController");

class ListProductsRestController extends ProductCatalogRestController {
  constructor(req, res) {
    super("listProducts", "listproducts", req, res);
    this.dataName = "products";
    this.crudType = "list";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListProductsManager(this._req, "rest");
  }
}

const listProducts = async (req, res, next) => {
  const controller = new ListProductsRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listProducts;
