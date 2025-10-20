//ask about this no other option other than softdelete
const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { CartItem } = require("models");
const { ElasticIndexer } = require("serviceCommon");

const deleteCartItemById = async (id) => {
  try {
    if (typeof id === "object") {
      id = id.id;
    }
    if (!id)
      throw new BadRequestError("ID is required in utility delete function");

    const existingDoc = await CartItem.findByPk(id);
    if (!existingDoc) {
      throw new NotFoundError(`Record with ID ${id} not found.`);
    }

    await existingDoc.destroy();

    const elasticIndexer = new ElasticIndexer("cartItem");
    await elasticIndexer.deleteData(id);

    return existingDoc.getData();
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "An unexpected error occurred during the delete operation.",
      err,
    );
  }
};

module.exports = deleteCartItemById;
