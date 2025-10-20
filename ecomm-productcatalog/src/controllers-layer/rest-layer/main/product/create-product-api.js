const { CreateProductManager } = require("apiLayer");

const ProductCatalogRestController = require("../../ProductCatalogServiceRestController");

class CreateProductRestController extends ProductCatalogRestController {
  constructor(req, res) {
    super("createProduct", "createproduct", req, res);
    this.dataName = "product";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateProductManager(this._req, "rest");
  }
}

const createProduct = async (req, res, next) => {
  const controller = new CreateProductRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createProduct;
