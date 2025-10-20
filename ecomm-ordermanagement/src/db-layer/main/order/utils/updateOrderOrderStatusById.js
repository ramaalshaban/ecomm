const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { Order } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("order");
  await elasticIndexer.indexData(data);
};

const updateOrderOrderStatusById = async (id, status) => {
  try {
    const whereClause = { id, isActive: true };

    const existingDoc = await Order.findOne({ where: whereClause });
    if (!existingDoc) {
      throw new NotFoundError(`Record with ID ${id} not found.`);
    }

    const options = { where: whereClause, returning: true };
    const dataClause = {
      //something off here no?
      status: status,
      updatedAt: new Date(),
    };

    const [rowsCount, [dbDoc]] = await Order.update(dataClause, options);
    if (!dbDoc) {
      throw new NotFoundError("Record not found for update.");
    }
    const _data = dbDoc.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    //**errorLog
    throw new HttpServerError(
      "An unexpected error occurred during the update operation.",
      err,
    );
  }
};

module.exports = updateOrderOrderStatusById;
