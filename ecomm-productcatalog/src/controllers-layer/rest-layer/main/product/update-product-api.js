const { UpdateProductManager } = require("apiLayer");

const ProductCatalogRestController = require("../../ProductCatalogServiceRestController");

class UpdateProductRestController extends ProductCatalogRestController {
  constructor(req, res) {
    super("updateProduct", "updateproduct", req, res);
    this.dataName = "product";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateProductManager(this._req, "rest");
  }
}

const updateProduct = async (req, res, next) => {
  const controller = new UpdateProductRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateProduct;
