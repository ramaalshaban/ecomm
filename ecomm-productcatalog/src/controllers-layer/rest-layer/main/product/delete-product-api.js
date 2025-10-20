const { DeleteProductManager } = require("apiLayer");

const ProductCatalogRestController = require("../../ProductCatalogServiceRestController");

class DeleteProductRestController extends ProductCatalogRestController {
  constructor(req, res) {
    super("deleteProduct", "deleteproduct", req, res);
    this.dataName = "product";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteProductManager(this._req, "rest");
  }
}

const deleteProduct = async (req, res, next) => {
  const controller = new DeleteProductRestController(req, res);
  try {
    await controller.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteProduct;
