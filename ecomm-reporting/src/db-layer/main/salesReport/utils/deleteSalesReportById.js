//ask about this no other option other than softdelete
const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { SalesReport } = require("models");
const { ElasticIndexer } = require("serviceCommon");

const deleteSalesReportById = async (id) => {
  try {
    if (typeof id === "object") {
      id = id.id;
    }
    if (!id)
      throw new BadRequestError("ID is required in utility delete function");

    const existingDoc = await SalesReport.findByPk(id);
    if (!existingDoc) {
      throw new NotFoundError(`Record with ID ${id} not found.`);
    }

    await existingDoc.destroy();

    const elasticIndexer = new ElasticIndexer("salesReport");
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

module.exports = deleteSalesReportById;
